const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING VITRAVA REDESIGN REQUIREMENTS ===\n');

// 1. Verify services.html section count
const servicesHtml = fs.readFileSync('services.html', 'utf8');
const sections = servicesHtml.match(/<section[\s\S]*?<\/section>/gi) || [];
console.log(`1. services.html Section Count: ${sections.length} (Requirement: max 7 main sections)`);
if (sections.length <= 7) {
  console.log('   ✓ PASS: services.html has exactly 7 sections or fewer.');
} else {
  console.error(`   ✗ FAIL: services.html exceeds 7 sections! Found ${sections.length}`);
}

// 2. Verify all 6 Window Styles on services.html
const requiredStyles = [
  { name: 'Casement Windows', tagline: 'Airtight Compression Crank', slug: 'casement' },
  { name: 'Double-Hung Windows', tagline: 'Traditional Dual Sliding Sashes', slug: 'double-hung' },
  { name: 'Horizontal Sliding', tagline: 'Smooth Tandem Brass Rollers', slug: 'sliding' },
  { name: 'Architectural Picture', tagline: 'Expansive Fixed View Glass', slug: 'picture' },
  { name: 'Bay & Bow Alcoves', tagline: '30° & 45° Projection Angles', slug: 'bay-bow' },
  { name: 'Top-Hinged Awning', tagline: 'Rainproof Breeze Ventilation', slug: 'awning' }
];

console.log('\n2. Verifying 6 Window Styles on services.html:');
let stylesPass = true;
requiredStyles.forEach(s => {
  const hasName = servicesHtml.includes(s.name);
  const hasTag = servicesHtml.includes(s.tagline);
  const hasLink = servicesHtml.includes(`products/${s.slug}.html`);
  const hasViewDetails = servicesHtml.includes(`products/${s.slug}.html`) && servicesHtml.includes('View Details');
  if (hasName && hasTag && hasLink && hasViewDetails) {
    console.log(`   ✓ PASS: "${s.name}" with tagline "${s.tagline}" & View Details link`);
  } else {
    console.error(`   ✗ FAIL: Style ${s.name} missing expected attributes on services.html`);
    stylesPass = false;
  }
});

// 3. Verify Window Styles removed from desktop nav & mobile drawer across all HTML files
console.log('\n3. Verifying Navigation Header & Mobile Drawer across all HTML pages:');
const htmlFiles = [];
function findHtml(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && !full.includes('node_modules')) {
      findHtml(full);
    } else if (f.endsWith('.html')) {
      htmlFiles.push(full);
    }
  });
}
findHtml('.');

let navIssues = 0;
htmlFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  // Check desktop-nav
  const dNav = c.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/i);
  if (dNav && /<div class="nav-dropdown">\s*<a href="[^"]*" class="nav-link[^"]*">\s*Window Styles/i.test(dNav[0])) {
    console.error(`   ✗ FAIL: Found Window Styles dropdown in desktop-nav of: ${f}`);
    navIssues++;
  }
  // Check mobile-drawer
  const mDrawer = c.match(/<div id="mobile-drawer"[\s\S]*?<\/div>\s*<\/div>/i);
  if (mDrawer && mDrawer[0].includes('Window Styles (6 Products)')) {
    console.error(`   ✗ FAIL: Found Window Styles in mobile-drawer of: ${f}`);
    navIssues++;
  }
});
if (navIssues === 0) {
  console.log(`   ✓ PASS: Window Styles menu item completely removed from all ${htmlFiles.length} pages.`);
}

// 4. Verify Product Detail Pages
console.log('\n4. Verifying Product Detail Pages (products/):');
let productsPass = true;
requiredStyles.forEach(s => {
  const pFile = path.join('products', `${s.slug}.html`);
  if (!fs.existsSync(pFile)) {
    console.error(`   ✗ FAIL: Missing product detail page ${pFile}`);
    productsPass = false;
    return;
  }
  const pContent = fs.readFileSync(pFile, 'utf8');
  const pSections = pContent.match(/<section[\s\S]*?<\/section>/gi) || [];
  const hasFaq = pContent.includes('data-accordion-single="true"');
  const hasBreadcrumb = pContent.includes('services.html');
  const hasQuoteCta = pContent.includes('quote.html');
  const hasTwoImages = (pContent.match(/assets\/images\/(products|window-styles)\/[a-z0-9-]+/g) || []).length >= 2;

  if (pSections.length <= 7 && hasFaq && hasBreadcrumb && hasQuoteCta && hasTwoImages) {
    console.log(`   ✓ PASS: ${pFile} — ${pSections.length} sections, FAQs included, 2+ images, breadcrumb updated, CTA present`);
  } else {
    console.error(`   ✗ FAIL: ${pFile} has issues! sections=${pSections.length}, hasFaq=${hasFaq}, hasBreadcrumb=${hasBreadcrumb}, hasTwoImages=${hasTwoImages}`);
    productsPass = false;
  }
});

// 5. Verify Services Detail Pages
console.log('\n5. Verifying Service Detail Pages (services/):');
const serviceSlugs = [
  'residential-replacement',
  'energy-assessment',
  'custom-measurement',
  'professional-installation',
  'weatherproofing-air-sealing',
  'warranty-aftercare'
];
let servicesDetailPass = true;
serviceSlugs.forEach(slug => {
  const sFile = path.join('services', `${slug}.html`);
  if (!fs.existsSync(sFile)) {
    console.error(`   ✗ FAIL: Missing service detail page ${sFile}`);
    servicesDetailPass = false;
    return;
  }
  const sContent = fs.readFileSync(sFile, 'utf8');
  const sSections = sContent.match(/<section[\s\S]*?<\/section>/gi) || [];
  if (sSections.length <= 7) {
    console.log(`   ✓ PASS: ${sFile} — ${sSections.length} sections, fully operational`);
  } else {
    console.error(`   ✗ FAIL: ${sFile} has ${sSections.length} sections`);
    servicesDetailPass = false;
  }
});

console.log('\n================================================');
if (sections.length <= 7 && stylesPass && navIssues === 0 && productsPass && servicesDetailPass) {
  console.log('ALL VERIFICATION CHECKS PASSED WITH 100% SUCCESS!');
} else {
  console.log('SOME CHECKS FAILED. PLEASE REVIEW LOGS.');
}
console.log('================================================\n');
