const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.resolve(__dirname, '..');

// All 15 required breakpoints
const ALL_BREAKPOINTS = [320, 360, 375, 390, 425, 480, 600, 768, 820, 912, 1024, 1280, 1366, 1440, 1920];

// Key viewports for deep scanning
const KEY_BREAKPOINTS = [320, 375, 425, 768, 820, 1024, 1440];

// Pages to audit
const PAGES = [
  'index.html',
  'home-02.html',
  'about.html',
  'services.html',
  'services/residential-replacement.html',
  'services/energy-assessment.html',
  'services/custom-measurement.html',
  'services/professional-installation.html',
  'services/weatherproofing-air-sealing.html',
  'services/warranty-aftercare.html',
  'products.html',
  'products/casement.html',
  'products/double-hung.html',
  'products/sliding.html',
  'products/picture.html',
  'products/bay-bow.html',
  'products/awning.html',
  'projects.html',
  'projects/casement-transformation.html',
  'projects/coastal-residence.html',
  'projects/family-renovation.html',
  'projects/historic-modernization.html',
  'projects/modern-suburban.html',
  'projects/panoramic-installation.html',
  'blog.html',
  'blog/casement-vs-double-hung.html',
  'blog/double-vs-triple-glazing.html',
  'blog/how-windows-reduce-heat-transfer.html',
  'blog/prepare-for-window-installation.html',
  'blog/reduce-drafts-improve-comfort.html',
  'blog/signs-home-needs-window-replacement.html',
  'blog/understanding-u-factor-shgc.html',
  'blog/window-frame-materials-compared.html',
  'blog/window-replacement-costs-guide.html',
  'calculator.html',
  'pricing.html',
  'contact.html',
  'quote.html',
  'booking.html',
  'login.html',
  'register.html',
  'forgot-password.html',
  '404.html',
  'coming-soon.html',
  'dashboard/overview.html',
  'dashboard/project.html',
  'dashboard/appointments.html',
  'dashboard/quotes.html',
  'dashboard/documents.html',
  'dashboard/profile.html'
];

/**
 * Generate a harness HTML that loads a target page inside an iframe of exact width
 * and measures overflow and layout elements.
 */
function runAuditForPage(pageRelPath, viewports, theme = 'light', dir = 'ltr') {
  const harnessPath = path.join(__dirname, 'audit-harness.html');
  const targetAbsPath = path.join(ROOT, pageRelPath).replace(/\\/g, '/');

  const harnessHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Audit Harness</title></head>
<body style="margin:0;padding:0;background:#333;">
  <div id="results">RUNNING</div>
  <iframe id="frame" style="border:none;display:block;" src="file:///${targetAbsPath}"></iframe>
  <script>
    const viewports = ${JSON.stringify(viewports)};
    const theme = "${theme}";
    const dir = "${dir}";
    const iframe = document.getElementById('frame');
    const results = [];

    async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    async function run() {
      // Wait for initial load
      await sleep(150);
      const doc = iframe.contentDocument;
      if (!doc) {
        document.getElementById('results').textContent = JSON.stringify({ error: 'Cannot access iframe contentDocument' });
        return;
      }

      for (const w of viewports) {
        iframe.style.width = w + 'px';
        iframe.style.height = '900px';

        // Apply theme and direction
        doc.documentElement.setAttribute('data-theme', theme);
        doc.documentElement.setAttribute('dir', dir);

        // Allow layout to settle
        await sleep(100);

        const scrollW = doc.documentElement.scrollWidth;
        const clientW = doc.documentElement.clientWidth;
        const hasOverflow = scrollW > (w + 1); // allow 1px rounding

        let overElements = [];
        if (hasOverflow) {
          const all = doc.querySelectorAll('*');
          for (let el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > (w + 2) && rect.width > 0) {
              const tag = el.tagName.toLowerCase();
              const cls = el.className ? (typeof el.className === 'string' ? el.className.trim() : '') : '';
              const id = el.id || '';
              const right = Math.round(rect.right);
              const width = Math.round(rect.width);
              overElements.push({ tag, cls, id, right, width, overflowPx: right - w });
            }
          }
        }

        // Limit overflow elements reported
        overElements = overElements.slice(0, 5);

        // Check broken images
        const brokenImgs = [];
        const imgs = doc.querySelectorAll('img');
        for (let img of imgs) {
          if (!img.src || img.naturalWidth === 0) {
            brokenImgs.push(img.getAttribute('src') || 'no-src');
          }
        }

        results.push({
          viewport: w,
          hasOverflow,
          scrollW,
          clientW,
          delta: scrollW - w,
          overflowElements: overElements,
          brokenImagesCount: brokenImgs.length
        });
      }

      document.getElementById('results').textContent = 'AUDIT_RESULT:' + JSON.stringify(results) + ':END_AUDIT_RESULT';
    }

    iframe.onload = () => { setTimeout(run, 50); };
  </script>
</body>
</html>`;

  fs.writeFileSync(harnessPath, harnessHtml);

  try {
    const out = execFileSync(
      CHROME,
      [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-web-security',
        '--window-size=2000,1200',
        '--virtual-time-budget=4000',
        '--dump-dom',
        'file:///' + harnessPath.replace(/\\/g, '/')
      ],
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
    );

    const match = out.match(/AUDIT_RESULT:(\[[\s\S]*?\]):END_AUDIT_RESULT/);
    if (match) {
      return JSON.parse(match[1]);
    } else {
      return { error: 'No audit result found in output', rawOut: out.slice(-500) };
    }
  } catch (err) {
    return { error: err.message };
  } finally {
    if (fs.existsSync(harnessPath)) fs.unlinkSync(harnessPath);
  }
}

async function main() {
  console.log('====================================================');
  console.log('VITRAVA FULL RESPONSIVE & LAYOUT AUTOMATED AUDIT');
  console.log(`Auditing ${PAGES.length} pages across 15 breakpoints...`);
  console.log('====================================================\n');

  const failures = [];
  let totalTests = 0;
  let passCount = 0;
  let failCount = 0;

  for (let i = 0; i < PAGES.length; i++) {
    const page = PAGES[i];
    process.stdout.write(`[${i + 1}/${PAGES.length}] ${page.padEnd(45, ' ')}: `);
    const results = runAuditForPage(page, ALL_BREAKPOINTS);

    if (!Array.isArray(results)) {
      console.log('ERROR: ' + (results.error || 'Unknown error'));
      continue;
    }

    let pageFails = [];
    results.forEach((r) => {
      totalTests++;
      if (r.hasOverflow) {
        failCount++;
        pageFails.push(r);
        failures.push({ page, ...r });
      } else {
        passCount++;
      }
    });

    if (pageFails.length === 0) {
      console.log('✓ PASS (all 15 viewports clean)');
    } else {
      console.log(`✗ FAIL (${pageFails.length} viewports overflow)`);
      pageFails.forEach((f) => {
        console.log(`     - [${f.viewport}px]: +${f.delta}px overflow (scrollW=${f.scrollW})`);
        if (f.overflowElements.length) {
          console.log(`       Culprits: ${f.overflowElements.map(e => `${e.tag}.${e.cls.split(' ').slice(0, 2).join('.')}#${e.id} (+${e.overflowPx}px)`).join('; ')}`);
        }
      });
    }
  }

  console.log('\n====================================================');
  console.log(`SUMMARY: Total Checks: ${totalTests} | Passed: ${passCount} | Failed: ${failCount}`);
  console.log('====================================================');

  if (failures.length > 0) {
    console.log(`\nPages with overflow issues (${new Set(failures.map(f => f.page)).size} pages):`);
    const byPage = {};
    failures.forEach(f => {
      byPage[f.page] = byPage[f.page] || [];
      byPage[f.page].push(f.viewport + 'px');
    });
    for (const [p, vps] of Object.entries(byPage)) {
      console.log(`  - ${p}: failing at ${vps.join(', ')}`);
    }
  }
}

main();

