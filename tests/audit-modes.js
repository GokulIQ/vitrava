const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.resolve(__dirname, '..');

const KEY_BREAKPOINTS = [320, 375, 425, 768, 820, 1024, 1440];

const SAMPLE_PAGES = [
  'index.html',
  'home-02.html',
  'services.html',
  'services/residential-replacement.html',
  'products/casement.html',
  'projects.html',
  'projects/historic-modernization.html',
  'blog.html',
  'blog/understanding-u-factor-shgc.html',
  'calculator.html',
  'pricing.html',
  'contact.html',
  'booking.html',
  'quote.html',
  'login.html',
  'dashboard/overview.html',
  'dashboard/project.html'
];

function runModeAudit(pageRelPath, viewports, theme, dir) {
  const harnessPath = path.join(__dirname, 'mode-harness.html');
  const targetAbsPath = path.join(ROOT, pageRelPath).replace(/\\/g, '/');

  const harnessHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;">
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
      await sleep(150);
      const doc = iframe.contentDocument;
      if (!doc) {
        document.getElementById('results').textContent = JSON.stringify({ error: 'No contentDocument' });
        return;
      }

      for (const w of viewports) {
        iframe.style.width = w + 'px';
        iframe.style.height = '850px';

        doc.documentElement.setAttribute('data-theme', theme);
        doc.documentElement.setAttribute('dir', dir);

        await sleep(80);

        const scrollW = doc.documentElement.scrollWidth;
        const hasOverflow = scrollW > (w + 1);

        results.push({
          viewport: w,
          hasOverflow,
          scrollW,
          delta: scrollW - w
        });
      }

      document.getElementById('results').textContent = 'MODE_RESULT:' + JSON.stringify(results) + ':END_MODE_RESULT';
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
        '--virtual-time-budget=3500',
        '--dump-dom',
        'file:///' + harnessPath.replace(/\\/g, '/')
      ],
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
    );

    const match = out.match(/MODE_RESULT:(\[[\s\S]*?\]):END_MODE_RESULT/);
    return match ? JSON.parse(match[1]) : { error: 'No output' };
  } catch (err) {
    return { error: err.message };
  } finally {
    if (fs.existsSync(harnessPath)) fs.unlinkSync(harnessPath);
  }
}

const MODES = [
  { theme: 'dark', dir: 'ltr', name: 'Dark Mode (LTR)' },
  { theme: 'light', dir: 'rtl', name: 'Light Mode (RTL)' },
  { theme: 'dark', dir: 'rtl', name: 'Dark Mode (RTL)' }
];

console.log('=== MULTI-MODE RESPONSIVE & LAYOUT AUDIT ===\n');

MODES.forEach(mode => {
  console.log(`\n--- Testing ${mode.name} ---`);
  let modeFails = 0;
  SAMPLE_PAGES.forEach(page => {
    const res = runModeAudit(page, KEY_BREAKPOINTS, mode.theme, mode.dir);
    if (Array.isArray(res)) {
      const fails = res.filter(r => r.hasOverflow);
      if (fails.length > 0) {
        modeFails += fails.length;
        console.log(`  ✗ ${page}: overflow at ${fails.map(f => `${f.viewport}px (+${f.delta}px)`).join(', ')}`);
      } else {
        console.log(`  ✓ ${page.padEnd(40, ' ')} [PASS]`);
      }
    } else {
      console.log(`  ! ${page}: ${res.error}`);
    }
  });
  console.log(`Mode Result: ${modeFails === 0 ? 'ALL CLEAN' : `${modeFails} failures`}`);
});
