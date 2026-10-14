const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

// Collect all HTML files
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'tests') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(ROOT_DIR);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

let totalLinksChecked = 0;
let totalImagesChecked = 0;
let errors = [];

htmlFiles.forEach((filePath) => {
  const relPath = path.relative(ROOT_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const fileDir = path.dirname(filePath);

  // 1. Check Section Count Rule (max 7 main content sections)
  // Extract content inside <main>...</main>
  const mainMatch = content.match(/<main id="main-content">([\s\S]*?)<\/main>/);
  if (mainMatch) {
    const mainContent = mainMatch[1];
    // Count direct <section> tags
    const sections = mainContent.match(/<section[\s>]/g) || [];
    if (sections.length > 7) {
      errors.push(`[RULE VIOLATION] ${relPath} contains ${sections.length} content sections (Maximum is 7).`);
    }
  }

  // 2. Check all <img src="...">
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    const src = imgMatch[1];
    if (src.startsWith('data:') || src.startsWith('http')) continue;
    totalImagesChecked++;

    const resolvedPath = path.resolve(fileDir, src);
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`[BROKEN IMAGE] In ${relPath}: Image "${src}" resolved to "${resolvedPath}" does not exist.`);
    }
  }

  // 3. Check all <a href="...">
  const linkRegex = /<a[^>]+href=["']([^"']+)["']/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(content)) !== null) {
    const href = linkMatch[1];
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) continue;
    totalLinksChecked++;

    // Strip hash or query string
    const cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref) continue;

    const resolvedPath = path.resolve(fileDir, cleanHref);
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`[BROKEN LINK] In ${relPath}: Link "${href}" resolved to "${resolvedPath}" does not exist.`);
    }
  }

  // 4. Check CSS & JS references
  const assetRegex = /<(?:link|script)[^>]+(?:href|src)=["']([^"']+)["']/g;
  let assetMatch;
  while ((assetMatch = assetRegex.exec(content)) !== null) {
    const src = assetMatch[1];
    if (src.startsWith('http') || src.startsWith('//')) continue;
    const resolvedPath = path.resolve(fileDir, src);
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`[BROKEN ASSET] In ${relPath}: Asset "${src}" resolved to "${resolvedPath}" does not exist.`);
    }
  }
});

console.log(`\n================ QA TEST REPORT ================`);
console.log(`Total HTML Pages Audited: ${htmlFiles.length}`);
console.log(`Total Internal Links Verified: ${totalLinksChecked}`);
console.log(`Total Image Assets Verified: ${totalImagesChecked}`);
console.log(`Total Errors Detected: ${errors.length}`);

if (errors.length > 0) {
  console.error('\nErrors:');
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('\nALL QUALITY ASSURANCE AUDITS PASSED WITH ZERO ERRORS!');
  process.exit(0);
}
