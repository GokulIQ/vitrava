const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const blogHtmlPath = path.join(ROOT_DIR, 'blog.html');

console.log('--- AUDITING BLOG LISTING & 9 DETAIL PAGES IMAGE INTEGRITY ---');

const errors = [];
const checkedImages = new Set();

// 1. Audit blog.html
if (!fs.existsSync(blogHtmlPath)) {
  errors.push(`Missing blog.html`);
}

const blogHtml = fs.readFileSync(blogHtmlPath, 'utf8');

// Check Section count on blog.html (max 7)
const mainMatch = blogHtml.match(/<main id="main-content">([\s\S]*?)<\/main>/);
if (mainMatch) {
  const sections = mainMatch[1].match(/<section[\s>]/g) || [];
  if (sections.length > 7) {
    errors.push(`blog.html exceeds 7 sections: has ${sections.length}`);
  } else {
    console.log(`PASS: blog.html has ${sections.length} content sections (<= 7).`);
  }
}

// 9 Blog articles
const articleSlugs = [
  'how-windows-reduce-heat-transfer',
  'double-vs-triple-glazing',
  'signs-home-needs-window-replacement',
  'understanding-u-factor-shgc',
  'casement-vs-double-hung',
  'prepare-for-window-installation',
  'window-frame-materials-compared',
  'reduce-drafts-improve-comfort',
  'window-replacement-costs-guide'
];

articleSlugs.forEach((slug, idx) => {
  const detailPath = path.join(ROOT_DIR, 'blog', `${slug}.html`);
  if (!fs.existsSync(detailPath)) {
    errors.push(`Missing detail page: blog/${slug}.html`);
    return;
  }

  const detailContent = fs.readFileSync(detailPath, 'utf8');

  // Check section count (max 7)
  const detailMain = detailContent.match(/<main id="main-content">([\s\S]*?)<\/main>/);
  if (detailMain) {
    const secCount = (detailMain[1].match(/<section[\s>]/g) || []).length;
    if (secCount > 7) {
      errors.push(`blog/${slug}.html exceeds 7 sections: has ${secCount}`);
    } else {
      console.log(`PASS: [${slug}] has ${secCount} content sections (<= 7).`);
    }
  }

  // Extract Hero image from detail page
  const heroMatch = detailContent.match(/<!-- Section 1:[\s\S]*?<img\s+src=["']([^"']+)["']/);
  const heroImgSrc = heroMatch ? heroMatch[1].replace('../', '') : null;

  // Extract Secondary image from detail page
  const secondaryMatch = detailContent.match(/<!-- Section 3:[\s\S]*?<img\s+src=["']([^"']+)["']/);
  const secondaryImgSrc = secondaryMatch ? secondaryMatch[1].replace('../', '') : null;

  if (!heroImgSrc) {
    errors.push(`Failed to extract hero image in blog/${slug}.html`);
  }
  if (!secondaryImgSrc) {
    errors.push(`Failed to extract secondary image in blog/${slug}.html`);
  }

  // Check that neither is an SVG
  if (heroImgSrc && heroImgSrc.endsWith('.svg')) {
    errors.push(`Hero image in blog/${slug}.html is SVG, expected photorealistic JPG: ${heroImgSrc}`);
  }
  if (secondaryImgSrc && secondaryImgSrc.endsWith('.svg')) {
    errors.push(`Secondary image in blog/${slug}.html is SVG, expected photorealistic JPG: ${secondaryImgSrc}`);
  }

  // Check that hero and secondary are different
  if (heroImgSrc === secondaryImgSrc) {
    errors.push(`Duplicate image in blog/${slug}.html: hero and secondary are identical (${heroImgSrc})`);
  }

  // Check existence on disk & file size
  if (heroImgSrc) {
    const absPath = path.join(ROOT_DIR, heroImgSrc);
    if (!fs.existsSync(absPath)) {
      errors.push(`Hero image not found on disk: ${absPath}`);
    } else {
      const stats = fs.statSync(absPath);
      if (stats.size < 50000) {
        errors.push(`Hero image file too small (<50KB): ${heroImgSrc}`);
      }
      console.log(`PASS: [${slug}] Primary Image: ${heroImgSrc} (${(stats.size / 1024).toFixed(0)} KB)`);
    }
    checkedImages.add(heroImgSrc);
  }

  if (secondaryImgSrc) {
    const absPath = path.join(ROOT_DIR, secondaryImgSrc);
    if (!fs.existsSync(absPath)) {
      errors.push(`Secondary image not found on disk: ${absPath}`);
    } else {
      const stats = fs.statSync(absPath);
      if (stats.size < 50000) {
        errors.push(`Secondary image file too small (<50KB): ${secondaryImgSrc}`);
      }
      console.log(`PASS: [${slug}] Secondary Image: ${secondaryImgSrc} (${(stats.size / 1024).toFixed(0)} KB)`);
    }
    checkedImages.add(secondaryImgSrc);
  }

  // Check that the listing card in blog.html matches heroImgSrc
  const cardMatches = [...blogHtml.matchAll(/<article class="card-arch"[\s\S]*?<\/article>/g)];
  let foundCardImg = null;
  for (const cm of cardMatches) {
    if (cm[0].includes(`blog/${slug}.html`)) {
      const imgMatch = cm[0].match(/<img\s+src=["']([^"']+)["']/);
      if (imgMatch) foundCardImg = imgMatch[1];
      break;
    }
  }

  if (foundCardImg !== heroImgSrc) {
    errors.push(`Image mismatch for ${slug}: blog.html card uses "${foundCardImg}" but detail page hero uses "${heroImgSrc}"`);
  } else {
    console.log(`PASS: [${slug}] Listing card image matches detail page hero image (${foundCardImg}).`);
  }
});

// Verify 18 distinct images across 9 articles
if (checkedImages.size !== 18) {
  errors.push(`Expected 18 unique blog images, found ${checkedImages.size}`);
} else {
  console.log(`\nPASS: Exactly 18 unique, distinct photographic images used across all 9 blog articles.`);
}

console.log('\n================ RESULTS ================');
if (errors.length > 0) {
  console.error(`FAIL: Found ${errors.length} errors:`);
  errors.forEach(e => console.error(` - ${e}`));
  process.exit(1);
} else {
  console.log(`SUCCESS: All 18 blog images and 9 detail pages verified with 0 errors!`);
}
