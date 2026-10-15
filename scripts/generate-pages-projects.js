const fs = require('fs');
const path = require('path');
const { wrapHtml, ICONS, getRelRoot } = require('./builder-core');

const projects = require('./project-data');
// 1. Generate Projects Directory Page (projects.html)
function generateProjectsDirectory() {
  const bodyContent = `
  <div class="project-content">
  <!-- Section 1: Portfolio Hero -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 820px; margin-inline: auto; text-align: center;">
        <span class="badge badge-teal" style="margin-bottom: 1rem;">COMPLETED INSTALLATIONS</span>
        <h1 class="text-h1" style="margin-bottom: 1rem;">Architectural Window Transformations</h1>
        <p class="text-lead">
          Explore real-world case studies showcasing how Vitrava high-performance windows eliminate drafts, cut energy bills, and elevate residential aesthetics.
        </p>
      </div>
    </div>
  </section>

  <!-- Section 2: Filterable Projects Grid -->
  <section class="section-spacing">
    <div class="container-custom">
      <!-- Filter Tabs -->
      <div class="project-filters-wrapper" role="tablist" aria-label="Project Categories">
        <button type="button" data-project-filter="all" class="btn btn-secondary btn-sm active" aria-pressed="true">All Projects (6)</button>
        <button type="button" data-project-filter="residential" class="btn btn-secondary btn-sm" aria-pressed="false">Suburban &amp; Craftsman</button>
        <button type="button" data-project-filter="coastal" class="btn btn-secondary btn-sm" aria-pressed="false">Coastal Storm-Rated</button>
        <button type="button" data-project-filter="historic" class="btn btn-secondary btn-sm" aria-pressed="false">Historic Restorations</button>
        <button type="button" data-project-filter="panoramic" class="btn btn-secondary btn-sm" aria-pressed="false">Panoramic Contemporary</button>
        <button type="button" data-project-filter="modern" class="btn btn-secondary btn-sm" aria-pressed="false">Modern Casement</button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        ${projects.map((p) => `
        <article class="project-card" data-project-category="${p.category}">
          <a class="project-card__image-link" href="projects/${p.slug}.html" aria-label="View case study for ${p.title}">
            <div class="project-card__image-wrapper">
              <img src="${p.heroImg}" alt="${p.title}" class="project-card__image" loading="lazy" decoding="async">
            </div>
          </a>
          <div class="project-card__content">
            <div class="project-card__meta">
              <span class="badge badge-accent">${p.categoryLabel}</span>
              <span class="project-card__location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${p.location}
              </span>
            </div>
            <h2 class="project-card__title">
              <a href="projects/${p.slug}.html">${p.title}</a>
            </h2>
            <p class="project-card__description">${p.shortDesc}</p>
            <div class="project-card__specs">
              <div class="project-card__spec-item">
                <span class="project-card__spec-label">Scope:</span>
                <span class="project-card__spec-val">${p.scope}</span>
              </div>
              <div class="project-card__spec-item">
                <span class="project-card__spec-label">Windows:</span>
                <span class="project-card__spec-val">${p.windowsSelected}</span>
              </div>
            </div>
            <div class="project-card__footer">
              <a href="projects/${p.slug}.html" class="btn btn-primary btn-sm project-card__cta">
                View Full Case Study &rarr;
              </a>
              <div class="project-card__metric" title="${p.results[0].metric} ${p.results[0].label}">
                <span class="project-card__metric-val">${p.results[0].metric}</span>
                <span class="project-card__metric-lbl">${p.results[0].label}</span>
              </div>
            </div>
          </div>
        </article>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section 3: Interactive Before & After Showcase -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 760px; margin-inline: auto; text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-citron" style="margin-bottom: 0.75rem;">INTERACTIVE SLIDER</span>
        <h2 class="text-h2">See the Immediate Visual &amp; Thermal Transformation</h2>
        <p style="color: var(--color-text-muted);">Drag the slider to compare an old drafty aluminum installation against a newly completed Vitrava triple-pane upgrade.</p>
      </div>

      <div style="max-width: 1100px; margin-inline: auto;">
        <div class="compare-container projects-reveal" dir="ltr">
          <img src="assets/images/projects/project-suburban-1.jpg" alt="Home exterior with clear replacement windows" class="compare-image" width="1200" height="896" loading="lazy" decoding="async" draggable="false">
          <div class="compare-overlay">
            <img src="assets/images/projects/projects.png" alt="Home exterior with cloudy, weathered windows before replacement" class="compare-image" width="1672" height="941" loading="lazy" decoding="async" draggable="false">
          </div>
          <div class="thermal-reveal__divider" aria-hidden="true"></div>
          <div class="compare-handle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
          <input type="range" min="0" max="100" value="50" class="compare-slider-input" aria-label="Before and after window comparison" aria-describedby="projects-swipe-help">
          <span class="compare-badge compare-badge-before">Before</span>
          <span class="compare-badge compare-badge-after">After</span>
        </div>
        <p id="projects-swipe-help" class="thermal-reveal-help">Swipe left to reveal the new windows, or right to see the old windows. You can also use the arrow keys.</p>
      </div>
    </div>
  </section>

  <!-- Section 4: Homeowner Consultation CTA -->
  <section class="section-spacing" style="text-align: center;">
    <div class="container-custom" style="max-width: 900px;">
      <h2 class="text-h2" style="margin-bottom: 1rem;">Ready for Your Own Home Transformation?</h2>
      <p class="text-lead" style="margin-bottom: 2rem;">
        Schedule a complimentary in-home laser measurement and design consultation. Every installation includes our 25-Year non-prorated warranty.
      </p>
      <div class="mobile-cta-stack" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="booking.html" class="btn btn-primary btn-lg btn-no-wrap">Schedule Free Measurement</a>
        <a href="calculator.html" class="btn btn-secondary btn-lg">Estimate Your Energy Savings</a>
      </div>
    </div>
  </section>
  </div>
    `;

    const html = wrapHtml(
    'Completed Window Replacement Case Studies & Projects',
    'Explore completed residential window installation projects by Vitrava: suburban upgrades, coastal homes, historic restorations, and modern transformations.',
    bodyContent,
    0,
    'projects'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'projects.html'), html, 'utf8');
}

// 2. Generate 6 Individual Project Detail Pages
function generateProjectDetailPages() {
  projects.forEach((p, idx) => {
    const depth = 1;
    const root = getRelRoot(depth);
    const nextProj = projects[(idx + 1) % projects.length];
    const prevProj = projects[(idx - 1 + projects.length) % projects.length];

    const bodyContent = `
  <div class="project-content">
    <!-- Section 1: Project Hero with Breadcrumbs -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
      <div class="container-custom">
        <div class="project-detail-grid">
          <div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
              <span class="badge badge-teal">${p.categoryLabel}</span>
              <span class="badge badge-citron">${p.location}</span>
            </div>
            <h1 class="text-h1" style="margin-bottom: 1rem;">${p.title}</h1>
            <p class="text-lead" style="margin-bottom: 1.75rem;">${p.lead}</p>
            <div style="background-color: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.25rem;">Installation Scope:</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-main);">${p.scope}</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.25rem;">${p.windowsSelected}</div>
            </div>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="${root}booking.html" class="btn btn-primary btn-lg">Book Measurement</a>
              <a href="${root}quote.html" class="btn btn-secondary btn-lg">Request Similar Quote</a>
            </div>
          </div>
          <div class="project-detail-photo">
            <img src="${root}${p.heroImg}" alt="${p.title} primary project photograph" decoding="async" fetchpriority="high">
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Challenge & Existing Deficiencies -->
    <section class="section-spacing">
      <div class="container-custom">
        <div class="grid-2-col">
          <div>
            <span class="badge badge-accent" style="margin-bottom: 1rem;">EXISTING CONDITIONS</span>
            <h2 class="text-h2" style="margin-bottom: 1.25rem;">The Challenge &amp; Thermal Deficit</h2>
            <p style="color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem;">
              ${p.challenge}
            </p>
            <div class="card-flat" style="border-inline-start: 4px solid var(--color-danger);">
              <h4 style="font-weight: 700; color: var(--color-text-main); margin-bottom: 0.5rem;">Pre-Installation Audit Findings:</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; color: var(--color-text-muted);">
                <li>&bull; Extreme temperature differential between center-glass and frame edges</li>
                <li>&bull; Severe convective drafts near seating areas and bedroom beds</li>
                <li>&bull; Deteriorated exterior perimeter caulk allowing moisture into wall cavity</li>
              </ul>
            </div>
          </div>

          <!-- Solution Overview -->
          <div>
            <span class="badge badge-teal" style="margin-bottom: 1rem;">VITRAVA ENGINEERING</span>
            <h2 class="text-h2" style="margin-bottom: 1.25rem;">The Architectural Solution</h2>
            <p style="color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem;">
              ${p.solution}
            </p>
            <div class="card-flat" style="border-inline-start: 4px solid var(--color-success);">
              <h4 style="font-weight: 700; color: var(--color-text-main); margin-bottom: 0.5rem;">Engineered Installation Highlights:</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; color: var(--color-text-muted);">
                <li>&bull; AAMA 2400 certified continuous low-expansion micro-foam air seal</li>
                <li>&bull; Rot-proof synthetic composite shims preventing settlement</li>
                <li>&bull; 25-Year non-prorated transferable warranty issued upon signoff</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Second Distinct Project Photo & Architectural Gallery -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom">
        <div class="grid-2-col">
          <div class="project-detail-photo">
            <img src="${root}${p.detailImg}" alt="${p.title} secondary project photograph" loading="lazy" decoding="async">
          </div>
          <div>
            <span class="badge badge-citron" style="margin-bottom: 1rem;">LIVING EXPERIENCE</span>
            <h2 class="text-h2" style="margin-bottom: 1.25rem;">Sunlight, Silence, and Comfort</h2>
            <p style="color: var(--color-text-muted); line-height: 1.65; margin-bottom: 2rem;">
              The interior outcome achieved by ${p.windowsSelected} demonstrates how next-generation glazing elevates daily domestic wellbeing. Natural daylight floods interior rooms without annoying glare or solar heat spikes.
            </p>
            <div class="card-flat" style="background-color: var(--color-card-muted); border-inline-start: 4px solid var(--color-primary);">
              <p style="font-style: italic; color: var(--color-text-main); margin-bottom: 1rem; line-height: 1.6;">
                "${p.testimonial.quote}"
              </p>
              <div style="font-weight: 700; color: var(--color-text-main);">${p.testimonial.author}</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">${p.testimonial.role} &bull; ${p.location}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Verified Performance Results Matrix -->
    <section class="section-spacing">
      <div class="container-custom">
        <div style="text-align: center; max-width: 700px; margin-inline: auto; margin-bottom: 3rem;">
          <span class="badge badge-teal" style="margin-bottom: 0.75rem;">VERIFIED OUTCOMES</span>
          <h2 class="text-h2">Empirical Project Performance</h2>
          <p style="color: var(--color-text-muted);">Measured building envelope improvements post-installation.</p>
        </div>
        <div class="grid-4-col">
          ${p.results.map((r) => `
          <div class="metric-box" style="text-align: center; padding: 2rem 1.5rem;">
            <div class="metric-number" style="margin-bottom: 0.5rem;">${r.metric}</div>
            <div class="metric-label" style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-main);">${r.label}</div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 5: Case Study Project Navigation -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom">
        <div class="project-pagination-nav">
          <a href="${root}projects/${prevProj.slug}.html" class="btn btn-outline" style="font-weight: 600;">
            <span class="icon-flip-rtl" aria-hidden="true">&larr;</span> Previous Case Study: ${prevProj.title.split(' ')[0]}
          </a>
          <a href="${root}projects.html" class="btn btn-secondary">
            View All 6 Installations
          </a>
          <a href="${root}projects/${nextProj.slug}.html" class="btn btn-outline" style="font-weight: 600;">
            Next Case Study: ${nextProj.title.split(' ')[0]} <span class="icon-flip-rtl" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Section 6: Consultation & Measurement Booking CTA -->
    <section class="section-spacing" style="text-align: center;">
      <div class="container-custom" style="max-width: 900px;">
        <h2 class="text-h2" style="margin-bottom: 1rem;">Upgrade Your Home with Vitrava Windows</h2>
        <p class="text-lead" style="margin-bottom: 2rem;">
          Every home deserves architectural precision, draft-free thermal comfort, and lower heating costs. Book your free in-home measurement today.
        </p>
        <div class="mobile-cta-stack" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="${root}booking.html" class="btn btn-primary btn-lg btn-no-wrap">Schedule Free Measurement</a>
          <a href="${root}quote.html" class="btn btn-secondary btn-lg">Request Project Estimate</a>
        </div>
      </div>
    </section>
  </div>
    `;

    const html = wrapHtml(
      `${p.title} — Vitrava Window Case Study`,
      `${p.shortDesc} Verified results: ${p.results[0].metric} ${p.results[0].label}. 25-Year non-prorated warranty.`,
      bodyContent,
      depth,
      'projects'
    );

    fs.writeFileSync(path.join(__dirname, '..', 'projects', `${p.slug}.html`), html, 'utf8');
  });
}

generateProjectsDirectory();
generateProjectDetailPages();
console.log('Projects directory and 6 unique case study detail pages generated successfully.');
