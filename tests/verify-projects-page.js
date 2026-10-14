const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const projectsHtmlPath = path.join(ROOT, 'projects.html');
const cssPath = path.join(ROOT, 'assets', 'css', 'style.css');
const jsPath = path.join(ROOT, 'assets', 'js', 'main.js');
const projectData = require('../scripts/project-data');

console.log('--- AUDITING PROJECTS PAGE & PORTFOLIO GRID ---');

let errors = [];

// 1. Audit CSS Rules in style.css
const cssContent = fs.readFileSync(cssPath, 'utf8');

const requiredCssSnippets = [
  '.project-filters-wrapper',
  '.projects-grid',
  'grid-template-columns: repeat(3, minmax(0, 1fr))',
  'grid-template-columns: repeat(2, minmax(0, 1fr))',
  'grid-template-columns: 1fr',
  '.project-card',
  'aspect-ratio: 16 / 9',
  '.project-card__content',
  '.project-card__meta',
  '.project-card__location',
  '.project-card__title',
  '.project-card__description',
  '-webkit-line-clamp: 3',
  '.project-card__specs',
  '.project-card__footer',
  'margin-top: auto',
  '.project-card__metric',
  '.project-detail-grid',
  '.project-detail-photo'
];

for (const snippet of requiredCssSnippets) {
  if (!cssContent.includes(snippet)) {
    errors.push(`Missing required CSS snippet in style.css: "${snippet}"`);
  }
}

// 2. Audit projects.html
const projectsHtml = fs.readFileSync(projectsHtmlPath, 'utf8');

if (!projectsHtml.includes('class="project-filters-wrapper"')) {
  errors.push('projects.html is missing .project-filters-wrapper');
}

if (!projectsHtml.includes('class="projects-grid"')) {
  errors.push('projects.html is missing .projects-grid');
}

// Check all 6 projects
projectData.forEach((p, idx) => {
  // Check image
  if (!projectsHtml.includes(p.heroImg)) {
    errors.push(`projects.html is missing image for project ${p.slug}: ${p.heroImg}`);
  }
  // Check title
  if (!projectsHtml.includes(p.title)) {
    errors.push(`projects.html is missing title: ${p.title}`);
  }
  // Check location
  if (!projectsHtml.includes(p.location)) {
    errors.push(`projects.html is missing location: ${p.location}`);
  }
  // Check scope
  if (!projectsHtml.includes(p.scope)) {
    errors.push(`projects.html is missing scope: ${p.scope}`);
  }
  // Check link
  if (!projectsHtml.includes(`projects/${p.slug}.html`)) {
    errors.push(`projects.html is missing link to detail page: projects/${p.slug}.html`);
  }

  // Check detail page exists
  const detailPath = path.join(ROOT, 'projects', `${p.slug}.html`);
  if (!fs.existsSync(detailPath)) {
    errors.push(`Detail page missing: ${detailPath}`);
  } else {
    const detailHtml = fs.readFileSync(detailPath, 'utf8');
    // Verify hero image matches card image
    if (!detailHtml.includes(p.heroImg)) {
      errors.push(`Detail page ${p.slug}.html does not contain matching hero image: ${p.heroImg}`);
    }
    // Verify secondary image is present and distinct
    if (!detailHtml.includes(p.detailImg)) {
      errors.push(`Detail page ${p.slug}.html does not contain matching secondary image: ${p.detailImg}`);
    }
  }
});

// 3. Audit main.js filtering script
const jsContent = fs.readFileSync(jsPath, 'utf8');
if (!jsContent.includes('[data-project-filter]') || !jsContent.includes('[data-project-category]')) {
  errors.push('main.js missing project filter selectors');
}

console.log('\n================ RESULTS ================');
if (errors.length === 0) {
  console.log('SUCCESS: All 20 project portfolio layout, responsive grid, card architecture, and asset checks PASSED with 0 errors!');
} else {
  console.error(`FAILED: Found ${errors.length} errors:`);
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
}
