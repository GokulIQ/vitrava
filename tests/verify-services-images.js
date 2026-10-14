const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const servicesHtmlPath = path.join(ROOT_DIR, 'services.html');

console.log('--- AUDITING SERVICES & SERVICE DETAIL PAGES IMAGE INTEGRITY ---');

const errors = [];
const checkedImages = new Set();

// 1. Audit services.html
if (!fs.existsSync(servicesHtmlPath)) {
  errors.push(`Missing services.html`);
}

const servicesHtml = fs.readFileSync(servicesHtmlPath, 'utf8');

// Check Section count on services.html
const mainMatch = servicesHtml.match(/<main id="main-content">([\s\S]*?)<\/main>/);
if (mainMatch) {
  const sections = mainMatch[1].match(/<section[\s>]/g) || [];
  if (sections.length > 7) {
    errors.push(`services.html exceeds 7 sections: has ${sections.length}`);
  } else {
    console.log(`PASS: services.html has ${sections.length} content sections (<= 7).`);
  }
}

// Service detail pages list
const serviceSlugs = [
  'residential-replacement',
  'energy-assessment',
  'custom-measurement',
  'professional-installation',
  'weatherproofing-air-sealing',
  'warranty-aftercare'
];

const serviceMappings = [];

serviceSlugs.forEach((slug) => {
  const detailPath = path.join(ROOT_DIR, 'services', `${slug}.html`);
  if (!fs.existsSync(detailPath)) {
    errors.push(`Missing detail page: services/${slug}.html`);
    return;
  }

  const detailContent = fs.readFileSync(detailPath, 'utf8');

  // Check section count
  const detailMain = detailContent.match(/<main id="main-content">([\s\S]*?)<\/main>/);
  if (detailMain) {
    const secCount = (detailMain[1].match(/<section[\s>]/g) || []).length;
    if (secCount > 7) {
      errors.push(`services/${slug}.html exceeds 7 sections: has ${secCount}`);
    } else {
      console.log(`PASS: services/${slug}.html has ${secCount} content sections (<= 7).`);
    }
  }

  // Extract Hero image from detail page
  const heroMatch = detailContent.match(/<!-- Section 1:[\s\S]*?<img\s+src=["']([^"']+)["']/);
  const heroImgSrc = heroMatch ? heroMatch[1].replace('../', '') : null;

  // Extract Secondary image from detail page
  const secondaryMatch = detailContent.match(/<!-- Section 3:[\s\S]*?<img\s+src=["']([^"']+)["']/);
  const secondaryImgSrc = secondaryMatch ? secondaryMatch[1].replace('../', '') : null;

  if (!heroImgSrc) {
    errors.push(`Failed to extract hero image in services/${slug}.html`);
  }
  if (!secondaryImgSrc) {
    errors.push(`Failed to extract secondary image in services/${slug}.html`);
  }

  // Check that neither is an SVG
  if (heroImgSrc && heroImgSrc.endsWith('.svg')) {
    errors.push(`Hero image in services/${slug}.html is SVG, expected photorealistic JPG: ${heroImgSrc}`);
  }
  if (secondaryImgSrc && secondaryImgSrc.endsWith('.svg')) {
    errors.push(`Secondary image in services/${slug}.html is SVG, expected photorealistic JPG: ${secondaryImgSrc}`);
  }

  // Check that hero and secondary are different
  if (heroImgSrc === secondaryImgSrc) {
    errors.push(`Duplicate image in services/${slug}.html: hero and secondary are identical (${heroImgSrc})`);
  }

  // Check existence on disk
  if (heroImgSrc) {
    const absPath = path.join(ROOT_DIR, heroImgSrc);
    if (!fs.existsSync(absPath)) {
      errors.push(`Hero image not found on disk: ${absPath}`);
    } else {
      const stats = fs.statSync(absPath);
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
      console.log(`PASS: [${slug}] Secondary Image: ${secondaryImgSrc} (${(stats.size / 1024).toFixed(0)} KB)`);
    }
    checkedImages.add(secondaryImgSrc);
  }

  // Check that the listing card in services.html matches heroImgSrc
  const cardImgRegex = new RegExp(`<a href="services/${slug}\\.html"[\\s\\S]*?<img\\s+src=["']([^"']+)["']|<img\\s+src=["']([^"']+)["'][\\s\\S]*?<a href="services/${slug}\\.html"`);
  // Let's find card for this slug in services.html:
  const cardRegex = new RegExp(`<div class="card-arch"[\\s\\S]*?href="services/${slug}\\.html"[\\s\\S]*?</div>\\s*</div>`, 'g');
  const cardMatches = [...servicesHtml.matchAll(/<div class="card-arch"[\s\S]*?<\/div>\s*<\/div>/g)];
  let foundCardImg = null;
  for (const cm of cardMatches) {
    if (cm[0].includes(`services/${slug}.html`)) {
      const imgMatch = cm[0].match(/<img\s+src=["']([^"']+)["']/);
      if (imgMatch) foundCardImg = imgMatch[1];
      break;
    }
  }

  if (foundCardImg !== heroImgSrc) {
    errors.push(`Image mismatch for ${slug}: services.html card uses "${foundCardImg}" but detail page hero uses "${heroImgSrc}"`);
  } else {
    console.log(`PASS: [${slug}] Listing card image matches detail page hero image (${foundCardImg}).`);
  }

  serviceMappings.push({
    slug,
    hero: heroImgSrc,
    secondary: secondaryImgSrc
  });
});

// Verify 12 distinct images
if (checkedImages.size !== 12) {
  errors.push(`Expected 12 unique service images, found ${checkedImages.size}`);
} else {
  console.log(`PASS: Exactly 12 unique, distinct images used across all 6 services.`);
}

console.log('\n================ RESULTS ================');
if (errors.length > 0) {
  console.error(`FAIL: Found ${errors.length} errors:`);
  errors.forEach(e => console.error(` - ${e}`));
  process.exit(1);
} else {
  console.log(`SUCCESS: All 12 service images and detail pages verified with 0 errors!`);
}
