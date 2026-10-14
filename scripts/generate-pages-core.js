const fs = require('fs');
const path = require('path');
const { wrapHtml, ICONS, getRelRoot } = require('./builder-core');

const projectData = require('./project-data');

const depth = 0;
const root = getRelRoot(depth);

// 1. HOME 01 — Energy Savings & Conversion Focus (Max 7 Sections)
function generateHome01() {
  const bodyContent = `
  <!-- Section 1: Premium Architectural Full-Width Background Hero -->
  <section class="hero-bg-section">
    <div class="container-custom" style="width: 100%;">
      <div class="hero-bg-content">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
          <span class="badge badge-citron">Comfort, by design</span>
        </div>
        <h1 class="text-display hero-bg-title">
          Smarter Windows.<br>
          <span class="hero-bg-accent">Lower Energy Waste.</span><br>
          Better Living.
        </h1>
        <p class="text-lead hero-bg-desc">
          Eliminate winter drafts, damp chill, and expensive heat loss with Vitrava high-performance triple-glazed architectural replacement windows. Custom engineered for lifetime peace of mind.
        </p>
        <div class="hero-bg-actions" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.25rem;">
          <a href="booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement &rarr;</a>
          <a href="calculator.html" class="btn btn-hero-secondary btn-lg btn-savings">Calculate My Savings</a>
        </div>

        <!-- Illustrative Energy Performance Panel -->
        <p class="hero-metrics-note">Sample specifications &mdash; actual performance varies by product and installation.</p>
        <div class="hero-metrics-panel">
          <div>
            <div class="hero-metric-label">U-Factor Rating</div>
            <div class="hero-metric-val is-accent">0.16</div>
            <div class="hero-metric-sub">Northern Climate Spec</div>
          </div>
          <div>
            <div class="hero-metric-label">Heat Loss Cut</div>
            <div class="hero-metric-val">-74%</div>
            <div class="hero-metric-sub">vs Single-Pane</div>
          </div>
          <div>
            <div class="hero-metric-label">Sound Dampening</div>
            <div class="hero-metric-val">-14 dB</div>
            <div class="hero-metric-sub">Acoustic Laminate</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: Benefits & Credibility -->
  <section class="section-spacing">
    <div class="container-custom">
      <div style="text-align: center; max-width: 760px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-accent" style="margin-bottom: 0.75rem;">MEASURABLE DIFFERENCE</span>
        <h2 class="text-h2">Why Replacing Inefficient Windows Changes Everything</h2>
        <p style="color: var(--color-text-muted);">Windows account for over 30% of residential heating and cooling energy loss. Here is how Vitrava engineering transforms your home.</p>
      </div>
      <div class="grid-4-col">
        <div class="card-flat">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.thermometer}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">Zero Convective Drafts</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            Interior glass surfaces stay at room temperature even during freezing winter storms, ending the phantom chill across your floors.
          </p>
        </div>
        <div class="card-flat">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-accent); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.leaf}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">Up to 42% Lower Energy Bills</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            Triple-pane krypton and warm-edge composite spacers keep furnace and heat pump running times significantly lower each season.
          </p>
        </div>
        <div class="card-flat">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-card-muted); color: var(--color-text-main); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.shield}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">70% Noise Reduction</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            Asymmetric acoustic laminate glass blocks high and low sound frequencies from morning traffic, lawnmowers, and neighborhood noise.
          </p>
        </div>
        <div class="card-flat">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.check}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">25-Year Non-Prorated Bond</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            100% parts and master certified labor coverage. Transferable to the next homeowner at zero charge to increase property value.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: Explore Window Styles (6 Distinct Products) -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem;">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.5rem;">WINDOW STYLES</span>
          <h2 class="text-h2">Engineered For Every Architectural Opening</h2>
        </div>
        <a href="services.html#window-styles" class="btn btn-secondary btn-sm">View All 6 Styles &rarr;</a>
      </div>

      <div class="grid-3-col">
        <!-- Product 1 -->
        <div class="card-arch">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="assets/images/window-styles/casement-main.jpg" alt="Casement Window" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge-accent">CASEMENT</span>
            <span style="font-size: 0.8125rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">U-0.16</span>
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="products/casement.html" style="color: inherit;">Airtight Casement Windows</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.25rem;">90-degree fold-away crank with continuous compression bulb seals for maximum airtightness.</p>
          <a href="products/casement.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">Explore Casement Details &rarr;</a>
        </div>

        <!-- Product 2 -->
        <div class="card-arch">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="assets/images/window-styles/double-hung-main.jpg" alt="Double-Hung Window" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge-accent">DOUBLE-HUNG</span>
            <span style="font-size: 0.8125rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">U-0.18</span>
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="products/double-hung.html" style="color: inherit;">Modern Double-Hung</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.25rem;">Classic American sliding profile with dual tilt-in sashes for effortless indoor cleaning.</p>
          <a href="products/double-hung.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">Explore Double-Hung Details &rarr;</a>
        </div>

        <!-- Product 3 -->
        <div class="card-arch">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="assets/images/window-styles/sliding-main.jpg" alt="Sliding Window" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge-accent">SLIDING</span>
            <span style="font-size: 0.8125rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">U-0.19</span>
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="products/sliding.html" style="color: inherit;">Horizontal Sliding Gliders</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.25rem;">Effortless tandem brass rollers on an extruded aluminum runway for wide panoramic openings.</p>
          <a href="products/sliding.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">Explore Sliding Details &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: Energy Efficiency Explained (Interactive Before & After Slider) -->
  <section class="section-spacing">
    <div class="container-custom">
      <div class="grid-2-col-split">
        <div>
          <span class="badge badge-citron" style="margin-bottom: 1rem;">THERMAL SCIENCE</span>
          <h2 class="text-h2" style="margin-bottom: 1.25rem;">Thermal Comfort Comparison</h2>
          <p style="color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem;">
            Drag the slider to see how Vitrava triple-pane thermal glazing eliminates infrared heat radiation and keeps interior glass at a comfortable 68°F during deep winter freezes.
          </p>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              ${ICONS.check}
              <div><strong>Triple Low-E Micro-Silver Coating:</strong> Reflects 85% of interior heating back inside.</div>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              ${ICONS.check}
              <div><strong>90% Krypton Gas Chambers:</strong> Heavy noble gas preventing internal air convection.</div>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              ${ICONS.check}
              <div><strong>Warm-Edge Structural Spacer:</strong> Stops perimeter condensation and frost buildup.</div>
            </div>
          </div>
          <a href="calculator.html" class="btn btn-primary">Calculate Your Home's Savings &rarr;</a>
        </div>

        <div>
          <div class="compare-container thermal-reveal" dir="ltr">
            <div class="thermal-reveal__scene thermal-reveal__scene--new">
              <img src="assets/images/home/home2.png" alt="New replacement window in a warm room" width="1672" height="941" loading="lazy" decoding="async" draggable="false">
            </div>
            <div class="compare-overlay thermal-reveal__scene thermal-reveal__scene--old">
              <img src="assets/images/home/home2.png" alt="Old damaged window in a cold room" width="1672" height="941" loading="lazy" decoding="async" draggable="false">
            </div>
            <div class="thermal-reveal__divider" aria-hidden="true"></div>
            <div class="compare-handle" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m8 7-5 5 5 5m8-10 5 5-5 5"/></svg>
            </div>
            <input type="range" min="0" max="100" value="50" class="compare-slider-input" aria-label="Reveal old versus new window" aria-valuetext="50% old window, 50% new window" aria-describedby="thermal-reveal-help">
            <span class="compare-badge compare-badge-before">Old window</span>
            <span class="compare-badge compare-badge-after">New window</span>
          </div>
          <p id="thermal-reveal-help" class="thermal-reveal-help">Swipe or drag to compare. Use arrow keys when the slider is focused.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5: Simple 5-Step Replacement Process -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="text-align: center; max-width: 760px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">ZERO-STRESS JOURNEY</span>
        <h2 class="text-h2">The 5-Step Vitrava Replacement Experience</h2>
        <p style="color: var(--color-text-muted);">From preliminary laser measurements to final 25-Year warranty deed issuance.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
        <div class="card-flat" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">01</div>
          <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Consultation</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem;">In-home energy evaluation and design selection with zero sales pressure.</p>
        </div>
        <div class="card-flat" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">02</div>
          <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Laser Sizing</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem;">Sub-millimeter 3-point digital measurement of all openings for custom fit.</p>
        </div>
        <div class="card-flat" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">03</div>
          <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Fabrication</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem;">Robotic custom assembly with low-E glass and noble krypton gas chambering.</p>
        </div>
        <div class="card-flat" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">04</div>
          <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Master Install</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem;">AAMA 2400 certified crew, continuous micro-foam seal, and spotless cleanup.</p>
        </div>
        <div class="card-flat" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">05</div>
          <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Warranty Deed</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem;">Multipoint inspection and transfer of your 25-Year transferable warranty deed.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 6: Featured Installations -->
  <section class="section-spacing">
    <div class="container-custom">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem;">
        <div>
          <span class="badge badge-accent" style="margin-bottom: 0.5rem;">CASE STUDIES</span>
          <h2 class="text-h2">Recent Home Transformations</h2>
        </div>
        <a href="projects.html" class="btn btn-secondary btn-sm">View All Case Studies &rarr;</a>
      </div>

      <div class="grid-3-col">
        <div class="card-arch case-study-card">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="${projectData.find((project) => project.slug === 'modern-suburban').heroImg}" alt="Suburban Home Window Replacement" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="case-study-card__meta" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span class="badge badge-citron">SUBURBAN RETROFIT</span>
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary);">-42% HEATING BILL</span>
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="projects/modern-suburban.html" style="color: inherit;">Oakridge Heights 22-Window Upgrade</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Replaced drafty aluminum windows with Matte Obsidian triple-pane casements.</p>
          <a href="projects/modern-suburban.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">Read Full Case Study &rarr;</a>
        </div>

        <div class="card-arch case-study-card">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="${projectData.find((project) => project.slug === 'coastal-residence').heroImg}" alt="Coastal Residence Window Upgrade" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="case-study-card__meta" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span class="badge badge-citron">COASTAL STORM-RATED</span>
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary);">DP-70 RATING</span>
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="projects/coastal-residence.html" style="color: inherit;">Cannon Beach Oceanfront Villa</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Marine-grade stainless hardware tested against 70 MPH ocean winds and salt mist.</p>
          <a href="projects/coastal-residence.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">Read Full Case Study &rarr;</a>
        </div>

        <div class="card-arch case-study-card">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="${projectData.find((project) => project.slug === 'historic-modernization').heroImg}" alt="Historic Brownstone Window Restoration" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="case-study-card__meta" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span class="badge badge-citron">HISTORIC PRESERVATION</span>
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary);">0.18 U-FACTOR</span>
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="projects/historic-modernization.html" style="color: inherit;">Nob Hill Historic Brownstone</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Preserved 1912 municipal exterior sightlines with mahogany interior double-hung units.</p>
          <a href="projects/historic-modernization.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">Read Full Case Study &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 7: Demo Testimonials & Conversion CTA -->
  <section class="home-testimonials section-spacing-sm" aria-labelledby="home-testimonials-heading">
    <div class="container-custom">
      <header class="home-testimonials__heading">
        <span class="badge badge-teal">Demo testimonials</span>
        <h2 class="text-h2" id="home-testimonials-heading">Happy Customers, More Comfortable Homes</h2>
        <p>Sample feedback showing the care and comfort Vitrava aims to deliver.</p>
      </header>

      <div class="home-testimonials__grid">
        <article class="testimonial-card">
          <div class="testimonial-card__rating" aria-label="5 out of 5 stars"><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
          <blockquote>&ldquo;The rooms feel so much more comfortable, and the street noise is noticeably lower. The crew explained each step and left the home spotless.&rdquo;</blockquote>
          <footer class="testimonial-card__author">
            <span class="testimonial-avatar" aria-hidden="true">MB</span>
            <span><strong>Maya Brooks</strong><small>Whole-home replacement</small></span>
          </footer>
        </article>

        <article class="testimonial-card">
          <div class="testimonial-card__rating" aria-label="5 out of 5 stars"><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
          <blockquote>&ldquo;From the first measurement to the final walkthrough, everything felt organized. The new windows look right at home with our older house.&rdquo;</blockquote>
          <footer class="testimonial-card__author">
            <span class="testimonial-avatar testimonial-avatar--second" aria-hidden="true">PS</span>
            <span><strong>Priya Shah</strong><small>Historic home upgrade</small></span>
          </footer>
        </article>

        <article class="testimonial-card">
          <div class="testimonial-card__rating" aria-label="5 out of 5 stars"><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
          <blockquote>&ldquo;The estimate was clear, the schedule stayed on track, and every window opens smoothly. We appreciated how carefully the team treated our home.&rdquo;</blockquote>
          <footer class="testimonial-card__author">
            <span class="testimonial-avatar testimonial-avatar--third" aria-hidden="true">JC</span>
            <span><strong>Jordan Carter</strong><small>Window and patio upgrade</small></span>
          </footer>
        </article>
      </div>
      <p class="home-testimonials__disclaimer">These fictional testimonials are for demonstration only.</p>

      <div class="home-testimonials__cta">
        <div>
          <h3 class="text-h3">Ready to make your home more comfortable?</h3>
          <p>Book a complimentary measurement and get a clear, tailored quote.</p>
        </div>
        <a href="booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement &rarr;</a>
      </div>
    </div>
  </section>


  `;

  const html = wrapHtml(
    'Vitrava — Smarter Windows. Better Living.',
    'Energy-efficient architectural replacement windows. Triple-pane low-E glass, U-factor 0.16, zero drafts, and a 25-year non-prorated transferable warranty.',
    bodyContent,
    depth,
    'home',
    '<link rel="preload" as="image" href="assets/images/hero/home1.png">'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'index.html'), html, 'utf8');
}

// 2. HOME 02 — Modern Architectural Windows & Premium Home Transformation (Max 7 Sections, Completely Distinct)
function generateHome02() {
  const bodyContent = `
  <!-- Section 1: Full-Width Cinematic Architectural Product Hero -->
  <section class="hero-arch-section">
    <div class="container-custom hero-arch-container">
      <div class="hero-arch-grid">
        <!-- Left: Hero Messaging & CTAs -->
        <div class="hero-arch-content">
          <div class="hero-arch-eyebrow">
            <span class="hero-arch-dot" aria-hidden="true"></span>
            <span>Architectural Collection 2026</span>
          </div>

          <h1 class="hero-arch-title">
            Architectural Precision.<br>
            <span class="hero-arch-accent">Uncompromising Thermal Performance.</span>
          </h1>

          <p class="hero-arch-desc">
            Discover premium energy-efficient window systems designed for modern residences &mdash; maximizing daylight, comfort, insulation, and clean architectural aesthetics.
          </p>

          <div class="hero-arch-actions">
            <a href="booking.html" class="btn btn-primary btn-lg hero-arch-btn-primary">
              <span>Book Free Measurement</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="icon-flip-rtl" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <a href="products.html" class="btn btn-outline btn-lg hero-arch-btn-secondary" style="color: #FFFFFF; border-color: rgba(255, 255, 255, 0.45); background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);">
              <span>Explore Window Collection</span>
            </a>
          </div>

          <!-- Trust Badges -->
          <div class="hero-arch-trust">
            <span class="hero-trust-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>AAMA 2400 Certified</span>
            </span>
            <span class="hero-trust-dot" aria-hidden="true">&bull;</span>
            <span class="hero-trust-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>NFRC Thermal Verified</span>
            </span>
            <span class="hero-trust-dot" aria-hidden="true">&bull;</span>
            <span class="hero-trust-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>25-Year Non-Prorated Deed</span>
            </span>
          </div>

          <!-- Quick Feature Strip -->
          <div class="hero-quick-features">
            <div class="hero-quick-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Advanced Low-E Glazing</span>
            </div>
            <div class="hero-quick-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Multi-Point Compression Sealing</span>
            </div>
            <div class="hero-quick-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Precision Composite Frames</span>
            </div>
          </div>
        </div>

        <!-- Right: Floating Architectural Thermal Specifications Card -->
        <aside class="hero-arch-specs-card" aria-label="Architectural Window Performance Benchmarks">
          <div class="hero-specs-header">
            <div>
              <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.7); font-weight: 600;">Architectural Benchmarks</div>
              <div style="font-size: 1.05rem; font-weight: 800; color: #FFFFFF; letter-spacing: -0.01em;">Engineering Specifications</div>
            </div>
            <span class="hero-specs-badge">Series 2026</span>
          </div>

          <div class="hero-specs-grid">
            <div class="hero-spec-item">
              <div class="hero-spec-num is-accent">0.16</div>
              <div class="hero-spec-title">U-Factor Rating</div>
              <div class="hero-spec-sub">Triple-Pane Krypton Fill</div>
            </div>
            <div class="hero-spec-item">
              <div class="hero-spec-num">&lt; 0.01</div>
              <div class="hero-spec-title">Air Infiltration</div>
              <div class="hero-spec-sub">CFM/ft² Draft Elimination</div>
            </div>
            <div class="hero-spec-item">
              <div class="hero-spec-num is-accent">42 STC</div>
              <div class="hero-spec-title">Acoustic Isolation</div>
              <div class="hero-spec-sub">Dissimilar Glass Thickness</div>
            </div>
            <div class="hero-spec-item">
              <div class="hero-spec-num">DP-70</div>
              <div class="hero-spec-title">Design Pressure</div>
              <div class="hero-spec-sub">Commercial Structural Grade</div>
            </div>
          </div>

          <div class="hero-specs-list">
            <div class="hero-spec-check">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Triple Silver Spectral-Selective Low-E</span>
            </div>
            <div class="hero-spec-check">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Concealed Multi-Point Cam-Lock Hardware</span>
            </div>
            <div class="hero-spec-check">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Thermally Broken Aerogel Composite Frame</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- Section 2: Comfort & Natural Light Experience Showcase -->
  <section class="section-spacing">
    <div class="container-custom">
      <div class="grid-2-col-split">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 1rem;">LIGHT &amp; WELLBEING</span>
          <h2 class="text-h2" style="margin-bottom: 1.25rem;">Flood Your Home with Clean Natural Light Without Thermal Penalty</h2>
          <p style="color: var(--color-text-muted); line-height: 1.7; margin-bottom: 1.5rem;">
            Traditional windows force a compromise: large glass areas mean cold winter drafts and oppressive summer heat. Vitrava architectural engineering breaks this compromise completely.
          </p>
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="card-flat">
              <h4 style="font-weight: 700; color: var(--color-primary); margin-bottom: 0.35rem;">Ultra-Slim Composite Sightlines</h4>
              <p style="color: var(--color-text-muted); font-size: 0.9rem;">2x stronger than hollow vinyl, allowing 22% narrower frames and expansive glass area.</p>
            </div>
            <div class="card-flat">
              <h4 style="font-weight: 700; color: var(--color-primary); margin-bottom: 0.35rem;">Spectral Selective Low-E Glazing</h4>
              <p style="color: var(--color-text-muted); font-size: 0.9rem;">Admits 65%+ visible sunlight while blocking 99.4% of ultraviolet bleaching rays.</p>
            </div>
          </div>
        </div>
        <div class="window-frame-wrapper" style="aspect-ratio: 4 / 3;">
          <img src="assets/images/about/about-hero.jpg" alt="Vitrava architectural installation" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: Advanced Window Material & Glazing Technology -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="text-align: center; max-width: 760px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-citron" style="margin-bottom: 0.75rem;">MATERIALS SCIENCE</span>
        <h2 class="text-h2">Next-Generation Frame Metallurgy &amp; Composites</h2>
        <p style="color: var(--color-text-muted);">See how Vitrava materials compare against conventional builder-grade alternatives.</p>
      </div>

      <div class="grid-3-col">
        <div class="card-arch">
          <span class="badge badge-accent" style="margin-bottom: 1rem;">STRUCTURAL COMPOSITE</span>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;">Thermoplastic Fibrex Core</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">
            Extruded polymer blended with reclaimed pine wood fibers. Matches thermal expansion of glass 1:1, preventing seal failure across -20°F to 110°F.
          </p>
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary);">Zero Maintenance &bull; Never Rots or Warps</div>
        </div>

        <div class="card-arch">
          <span class="badge badge-teal" style="margin-bottom: 1rem;">THERMAL BARRIER</span>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;">Polyamide Thermal Breaks</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">
            High-density glass-reinforced polyamide isolators severing exterior metal from interior surfaces to eliminate cold transfer and sweat condensation.
          </p>
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary);">R-5 Equivalent &bull; Architectural Finish</div>
        </div>

        <div class="card-arch">
          <span class="badge badge-citron" style="margin-bottom: 1rem;">INSULATED CORE</span>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;">Dual Krypton Chambers</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">
            Dense noble krypton gas with warm-edge non-metallic spacer bars reducing edge conduction and delivering exceptional U-0.16 center-glass values.
          </p>
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary);">90% Inert Gas Fill &bull; Hermetic Seal</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: Interactive Window-Style Discovery -->
  <section class="section-spacing">
    <div class="container-custom">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem;">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.5rem;">BESPOKE CURATION</span>
          <h2 class="text-h2">Explore Architectural Window Geometries</h2>
        </div>
        <a href="services.html#window-styles" class="btn btn-secondary btn-sm">Full Specifications &rarr;</a>
      </div>

      <div class="grid-3-col">
        <div class="card-arch home-style-card">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="assets/images/window-styles/picture-main.jpg" alt="Architectural Picture Window" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <span class="badge badge-accent" style="margin-bottom: 0.5rem;">PICTURE VISTA</span>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="products/picture.html" style="color: inherit;">Fixed Direct-Set Picture</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Oversized panoramic glass panes up to 60 sq ft with U-0.15 thermal resistance.</p>
          <a href="products/picture.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">View Picture Windows &rarr;</a>
        </div>

        <div class="card-arch home-style-card">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="assets/images/window-styles/bay-bow-main.jpg" alt="Bay and Bow Projection" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <span class="badge badge-accent" style="margin-bottom: 0.5rem;">BAY &amp; BOW</span>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="products/bay-bow.html" style="color: inherit;">Angled Projection Bay Windows</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Cantilevered 30° &amp; 45° projection assemblies with insulated reading seat boards.</p>
          <a href="products/bay-bow.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">View Bay &amp; Bow &rarr;</a>
        </div>

        <div class="card-arch home-style-card">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="assets/images/window-styles/awning-main.jpg" alt="Awning Window" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <span class="badge badge-accent" style="margin-bottom: 0.5rem;">AWNING</span>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;"><a href="products/awning.html" style="color: inherit;">Top-Hinged Rainproof Awning</a></h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Outward-cantilever sash providing gentle fresh air ventilation even during rainfall.</p>
          <a href="products/awning.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">View Awning Windows &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5: Energy-Saving Incentives & Financing -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div class="calc-stat-hero grid-2-col-split">
        <div>
          <span class="badge badge-citron" style="margin-bottom: 0.75rem;">FEDERAL 25C TAX CREDIT</span>
          <h2 class="text-h2" style="margin-bottom: 1rem;">Save Up to ₹1,200 via Clean Energy Tax Credits</h2>
          <p style="color: var(--color-text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem;">
            Because Vitrava windows meet Energy Star Most Efficient criteria, homeowners are eligible for a 30% direct federal tax credit up to ₹1,200 per year, plus local utility efficiency rebates.
          </p>
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
            <div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">₹1,200</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Direct Federal Tax Credit</div>
            </div>
            <div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-text-main); font-family: var(--font-mono);">0% APR</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">18-Month Flexible Financing</div>
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <a href="pricing.html" class="btn btn-primary btn-lg home2-cta" style="margin-bottom: 0.75rem; width: 100%;">View Pricing &amp; Financing Plans</a>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Instant soft credit check with zero credit score impact.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 6: Visual Installation Journey -->
  <section class="section-spacing">
    <div class="container-custom">
      <div style="text-align: center; max-width: 760px; margin-inline: auto; margin-bottom: 3rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">VISUAL TRANSFORMATION</span>
        <h2 class="text-h2">Architectural Before &amp; After Showcase</h2>
        <p style="color: var(--color-text-muted);">Explore the difference between cloudy, weathered windows and a bright, refreshed living space.</p>
      </div>

      <figure class="home2-transformation">
        <div class="compare-container home2-reveal" dir="ltr">
          <img src="assets/images/projects/project-suburban-2.jpg" alt="Clear replacement windows in a sunlit living room" class="compare-image" width="1200" height="896" loading="lazy" decoding="async" draggable="false">
          <div class="compare-overlay">
            <img src="assets/images/common/home2.png" alt="Cloudy, weathered window before replacement" class="compare-image" width="1672" height="941" loading="lazy" decoding="async" draggable="false">
          </div>
          <div class="thermal-reveal__divider" aria-hidden="true"></div>
          <div class="compare-handle" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m8 6-6 6 6 6m8-12 6 6-6 6"/></svg>
          </div>
          <input type="range" min="0" max="100" value="50" class="compare-slider-input" aria-label="Before and after window comparison" aria-describedby="home2-swipe-help">
          <span class="compare-badge compare-badge-before">Before</span>
          <span class="compare-badge compare-badge-after">After</span>
        </div>
        <figcaption id="home2-swipe-help">
          <span><strong>Swipe to compare</strong>Drag left to reveal the new windows; drag right to see the old window. You can also use the arrow keys.</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- Section 7: Premium Consultation Booking Section -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); text-align: center;">
    <div class="container-custom" style="max-width: 900px;">
      <span class="badge badge-citron" style="margin-bottom: 1rem;">BESPOKE APPOINTMENT</span>
      <h2 class="text-h2" style="margin-bottom: 1rem;">Schedule Your Architectural Measurement</h2>
      <p class="text-lead" style="margin-bottom: 2rem;">
        Meet with a senior Vitrava window architect. We bring custom frame finishes, triple-pane glass cross-sections, and laser sizing directly to your residence.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement</a>
        <a href="quote.html" class="btn btn-secondary btn-lg">Request Project Estimate</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Architectural Precision Windows — Vitrava Home 02',
    'Modern architectural window technology and home transformations. Ultra-slim composite sightlines, commercial DP-70 ratings, and triple-pane krypton glass.',
    bodyContent,
    depth,
    'home'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'home-02.html'), html, 'utf8');
}

// 3. ABOUT US (Max 6 Sections)
function generateAboutPage() {
  const bodyContent = `
  <!-- Section 1: About Hero -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div class="hero-grid-split">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 1rem;">WHO WE ARE</span>
          <h1 class="text-h1" style="margin-bottom: 1.25rem;">Architectural Window Precision &amp; Thermal Physics</h1>
          <p class="text-lead" style="margin-bottom: 1.75rem;">
            Founded by architects and building science engineers, Vitrava was created to solve a persistent home improvement problem: replacement windows that sacrifice aesthetic elegance for insulation, or beautiful windows that leak air.
          </p>
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
            <div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">25 YRS</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Non-Prorated Warranty</div>
            </div>
            <div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-text-main); font-family: var(--font-mono);">100%</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">In-House Certified Installers</div>
            </div>
            <div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">A+</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">BBB Accredited Rating</div>
            </div>
          </div>
        </div>
        <div class="window-frame-wrapper" style="aspect-ratio: 4 / 3;">
          <img src="assets/images/about/about-hero.jpg" alt="Vitrava Master Installation Team" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: Mission & Thermal Philosophy -->
  <section class="section-spacing">
    <div class="container-custom">
      <div style="text-align: center; max-width: 760px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-accent" style="margin-bottom: 0.75rem;">OUR CORE PRINCIPLES</span>
        <h2 class="text-h2">The Three Pillars of Vitrava Engineering</h2>
      </div>

      <div class="grid-3-col">
        <div class="card-arch">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.thermometer}
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;">Thermal Integrity</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6;">
            We do not sell single-pane or hollow vinyl windows. Every product in our catalog features multi-chambered composite cores, noble gas fills, and vacuum-sputtered silver low-E coatings.
          </p>
        </div>

        <div class="card-arch">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-accent); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.shield}
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;">Zero Subcontractors</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6;">
            We refuse to outsource our installations to transient third-party crews. Every Vitrava technician is a full-time, background-checked, AAMA 2400 certified master craftsman.
          </p>
        </div>

        <div class="card-arch">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-card-muted); color: var(--color-text-main); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.leaf}
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.5rem;">Environmental Stewardship</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6;">
            We responsibly divert 100% of old extracted glass, aluminum, and vinyl to licensed green recycling facilities, eliminating construction landfill waste.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: Engineering & Craftsmanship -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div class="grid-2-col-split">
        <div class="window-frame-wrapper" style="aspect-ratio: 4 / 3;">
          <img src="assets/images/about/about1.jpg" alt="Installer fitting a replacement window with a homeowner" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%;">
        </div>
        <div>
          <span class="badge badge-citron" style="margin-bottom: 1rem;">CRAFTSMANSHIP</span>
          <h2 class="text-h2" style="margin-bottom: 1.25rem;">Sub-Millimeter Tolerances on Every Rough Opening</h2>
          <p style="color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem;">
            A high-performance window will fail if it is jammed into an out-of-square opening or sealed with cheap hardware store caulk. Our certified installers ensure:
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem;">
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} <strong>Heavy GRK Fasteners:</strong> Anchored into framing studs for structural stability.</li>
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} <strong>Low-Expansion Foam:</strong> Micro-expanding polyurethane sealing without warping jambs.</li>
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} <strong>Sloped Sill Pans:</strong> Positive-slope moisture barrier directing water outside.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: Leadership & Thermal Specialists (Unique Portraits) -->
  <section class="section-spacing">
    <div class="container-custom">
      <div style="text-align: center; max-width: 760px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">OUR TEAM</span>
        <h2 class="text-h2">Led by Architects &amp; Certified Engineers</h2>
      </div>

      <div class="grid-3-col">
        <div class="card-arch" style="text-align: center;">
          <div class="about-team-portrait about-team-portrait--marcus">
            <img src="assets/images/about/Marcus Vance.jpg" alt="Marcus Vance" width="736" height="911" loading="lazy" decoding="async">
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.25rem;">Marcus Vance</h3>
          <div style="color: var(--color-primary); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.75rem;">Principal Window Architect &amp; Founder</div>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.5;">20+ years designing high-efficiency residential building envelopes and European fenestration systems.</p>
        </div>

        <div class="card-arch" style="text-align: center;">
          <div class="about-team-portrait about-team-portrait--elena">
            <img src="assets/images/about/Elena Rostova, PE.jpg" alt="Elena Rostova, PE" width="736" height="736" loading="lazy" decoding="async">
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.25rem;">Elena Rostova, PE</h3>
          <div style="color: var(--color-primary); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.75rem;">VP of Thermal Engineering</div>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.5;">Licensed professional engineer overseeing NFRC testing, FLIR diagnostics, and argon gas chamber optimization.</p>
        </div>

        <div class="card-arch" style="text-align: center;">
          <div class="about-team-portrait about-team-portrait--david">
            <img src="assets/images/about/David Chen.jpg" alt="David Chen" width="735" height="919" loading="lazy" decoding="async">
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.25rem;">David Chen</h3>
          <div style="color: var(--color-primary); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.75rem;">Master Installation Director</div>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.5;">AAMA 2400 certified master installer leading our in-house white-glove residential installation crews.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5: Accreditations & Standards -->
  <section class="accreditations-section section-spacing-sm" aria-labelledby="accreditations-heading">
    <div class="container-custom">
      <div class="accreditations-heading">
        <span class="badge badge-accent">Verified compliance</span>
        <h2 class="text-h2" id="accreditations-heading">Independent Certifications &amp; Accreditations</h2>
        <p>Standards and credentials behind every Vitrava installation.</p>
      </div>
      <ul class="accreditations-grid" aria-label="Certifications and accreditations">
        <li class="accreditation-card">
          <span class="accreditation-mark" aria-hidden="true">NFRC</span>
          <span class="accreditation-name">NFRC Certified</span>
        </li>
        <li class="accreditation-card accreditation-card--featured">
          <span class="accreditation-mark" aria-hidden="true">★</span>
          <span class="accreditation-name">ENERGY STAR Most Efficient 2026</span>
        </li>
        <li class="accreditation-card">
          <span class="accreditation-mark" aria-hidden="true">AAMA</span>
          <span class="accreditation-name">AAMA 2400 Master Protocol</span>
        </li>
        <li class="accreditation-card">
          <span class="accreditation-mark" aria-hidden="true">A+</span>
          <span class="accreditation-name">BBB Accredited</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- Section 6: Consultation CTA -->
  <section class="section-spacing" style="text-align: center;">
    <div class="container-custom" style="max-width: 900px;">
      <h2 class="text-h2" style="margin-bottom: 1rem;">Experience the Vitrava Difference Firsthand</h2>
      <p class="text-lead" style="margin-bottom: 2rem;">
        Schedule a complimentary in-home consultation. We inspect your existing windows, perform a laser measurement, and provide a guaranteed price quote.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement</a>
        <a href="calculator.html" class="btn btn-secondary btn-lg">Calculate Your Energy Savings</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'About Us — Vitrava Architectural Window Company',
    'Meet Vitrava: founded by window architects and thermal engineers dedicated to eliminating residential energy waste with certified master craftsmanship.',
    bodyContent,
    depth,
    'about'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'about.html'), html, 'utf8');
}

// 4. ENERGY SAVINGS CALCULATOR PAGE (calculator.html)
function generateCalculatorPage() {
  const bodyContent = `
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 820px; margin-inline: auto; text-align: center;">
        <span class="badge badge-teal" style="margin-bottom: 1rem;">INTERACTIVE MODELING</span>
        <h1 class="text-h1" style="margin-bottom: 1rem;">Energy Savings Calculator</h1>
        <p class="text-lead">
          Calculate your estimated reduction in window-related heat loss, annual utility bill savings, 5-year and 10-year return on investment, and simple payback period.
        </p>
      </div>
    </div>
  </section>

  <!-- Main Calculator Engine Section -->
  <section class="section-spacing">
    <div class="container-custom">
      <div data-widget="energy-calculator" class="calc-card" style="width: 100%; margin-inline: auto;">
        <div class="calc-grid-layout">
          
          <!-- Column 1: Interactive User Inputs -->
          <form id="energy-calculator-form" onsubmit="return false;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem;">
              <h3 class="text-h3">Input Your Home Parameters</h3>
              <button type="button" id="calc-reset-btn" class="btn btn-secondary btn-sm" style="font-size: 0.8rem;">Reset Defaults</button>
            </div>

            <!-- Number of Windows -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="calc-window-count" class="form-label">Number of Windows to Replace</label>
                <span id="calc-window-count-val" style="font-family: var(--font-mono); font-weight: 800; font-size: 1.15rem; color: var(--color-primary);">15</span>
              </div>
              <div class="calc-slider-wrapper">
                <input type="range" id="calc-window-count" class="calc-range-input" min="4" max="40" step="1" value="15">
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-text-muted);">
                <span>4 Windows</span>
                <span>40 Windows</span>
              </div>
            </div>

            <!-- Window Dimensions / Size -->
            <div class="form-group">
              <label for="calc-window-size" class="form-label">Average Window Size</label>
              <select id="calc-window-size" class="form-select">
                <option value="0.8">Small (Compact Sashes, ~12 sq ft)</option>
                <option value="1.0" selected>Standard Residential (~18 sq ft)</option>
                <option value="1.35">Large Architectural (~25+ sq ft)</option>
              </select>
            </div>

            <!-- Existing Window Type -->
            <div class="form-group">
              <label for="calc-existing-glazing" class="form-label">Existing Window Glazing Type</label>
              <select id="calc-existing-glazing" class="form-select">
                <option value="single" selected>Single-Pane Clear Glass (Drafty / High Heat Loss)</option>
                <option value="aluminum_slider">Uninsulated Metal Frame Sliders (Cold Condensation)</option>
                <option value="double_old">Older Clear Dual-Pane (15+ Years Old / Weak Seal)</option>
              </select>
            </div>

            <!-- Proposed Vitrava Glazing Package -->
            <div class="form-group">
              <label for="calc-proposed-glazing" class="form-label">Proposed Vitrava Glazing Package</label>
              <select id="calc-proposed-glazing" class="form-select">
                <option value="triple_krypton" selected>Signature Triple-Pane Krypton (U-0.16 &bull; Maximum Efficiency)</option>
                <option value="dual_argon">Performance Dual-Pane Low-E Argon (U-0.26 &bull; Balanced Value)</option>
              </select>
            </div>

            <!-- Climate Region -->
            <div class="form-group">
              <label for="calc-climate-zone" class="form-label">Geographic Climate Profile</label>
              <select id="calc-climate-zone" class="form-select">
                <option value="northern" selected>Northern Climate (Cold Winters &bull; Heating Dominated)</option>
                <option value="central">Central / Mixed Climate (Moderate Heating &amp; Cooling)</option>
                <option value="southern">Southern Climate (Intense Sun &bull; Cooling Dominated)</option>
              </select>
            </div>

            <!-- Yearly HVAC Bill -->
            <div class="form-group">
              <label for="calc-hvac-bill" class="form-label">Estimated Yearly Heating &amp; Cooling Bill (₹)</label>
              <input type="number" id="calc-hvac-bill" class="form-input" min="500" max="15000" step="50" value="2800">
              <span class="form-hint">Average annual electricity and natural gas expenditure for HVAC.</span>
            </div>

            <!-- Optional Project Budget for Payback -->
            <div class="form-group">
              <label for="calc-project-budget" class="form-label">Estimated Window Project Cost (Optional, ₹)</label>
              <input type="number" id="calc-project-budget" class="form-input" min="0" max="60000" step="500" value="12500">
              <span class="form-hint">Enter your budget to calculate approximate simple payback in years.</span>
            </div>
          </form>

          <!-- Column 2: Live Calculated Results & Visual Comparison -->
          <div>
            <div class="calc-stat-hero" style="margin-bottom: 1.5rem;">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; margin-bottom: 0.25rem;">Estimated Annual Savings</div>
              <div id="out-annual-savings" class="calc-savings-number">₹812</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">Estimated first-year utility bill reduction</div>
            </div>

            <!-- 5-Yr & 10-Yr ROI Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
              <div class="card-flat" style="text-align: center; padding: 1.25rem;">
                <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">5-Year Cumulative</div>
                <div id="out-5yr-savings" style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); font-family: var(--font-mono); margin-top: 0.25rem;">₹4,354</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">3.5% energy inflation</div>
              </div>
              <div class="card-flat" style="text-align: center; padding: 1.25rem;">
                <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">10-Year Cumulative</div>
                <div id="out-10yr-savings" style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-top: 0.25rem;">₹9,526</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Compounding returns</div>
              </div>
            </div>

            <!-- Additional Metrics Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
              <div class="metric-box">
                <span class="metric-label">Window Loss Reduction</span>
                <span id="out-loss-reduction" style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">74%</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">Simple Payback Period</span>
                <span id="out-payback-years" style="font-size: 1.35rem; font-weight: 800; color: var(--color-text-main); font-family: var(--font-mono);">15.4 yrs</span>
              </div>
            </div>

            <!-- Visual Heat Loss Comparison Bars -->
            <div class="card-flat" style="margin-bottom: 1.75rem;">
              <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 0.75rem;">Window Thermal Loss Comparison</h4>
              
              <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.25rem;">
                  <span>Existing Window Heat Loss</span>
                  <span id="bar-label-old" style="font-weight: 700; color: var(--color-danger);">100% Thermal Waste Baseline</span>
                </div>
                <div class="calc-bar-track">
                  <div id="bar-loss-old" class="calc-bar-fill" style="width: 100%; background-color: var(--color-danger);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.25rem;">
                  <span>Vitrava Replacement</span>
                  <span id="bar-label-new" style="font-weight: 700; color: var(--color-primary);">26% Residual Loss (74% Retained)</span>
                </div>
                <div class="calc-bar-track">
                  <div id="bar-loss-new" class="calc-bar-fill" style="width: 26%;"></div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="booking.html" class="btn btn-primary" style="flex: 1; text-align: center;">Book Free Measurement</a>
              <button type="button" id="calc-print-btn" class="btn btn-secondary">Print Calculation</button>
            </div>
            
            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 1rem; line-height: 1.5; font-style: italic;">
              *Indicative engineering model based on NFRC certified U-Factors, ASHRAE building science equations, and historical utility rates. Actual savings depend on HVAC efficiency, thermostat behavior, and structural building envelope conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Interactive Energy Savings Calculator — Vitrava',
    'Calculate your estimated residential heating and cooling savings with Vitrava triple-pane energy-efficient replacement windows.',
    bodyContent,
    depth,
    'calculator'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'calculator.html'), html, 'utf8');
}

// 5. PRICING & FINANCING PAGE (pricing.html)
function generatePricingPage() {
  const bodyContent = `
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 820px; margin-inline: auto; text-align: center;">
        <span class="badge badge-teal" style="margin-bottom: 1rem;">TRANSPARENT VALUE</span>
        <h1 class="text-h1" style="margin-bottom: 1rem;">Window Replacement Pricing &amp; Financing</h1>
        <p class="text-lead">
          Clear, honest, line-item pricing with zero hidden fees. Choose the high-performance window package designed for your home’s climate.
        </p>
      </div>
    </div>
  </section>

  <!-- Section 1: 3 Illustrative Packages -->
  <section class="section-spacing">
    <div class="container-custom">
      <div class="grid-3-col" style="margin-bottom: 4rem;">
        
        <!-- Package 1: Essential Comfort -->
        <div class="card-arch" style="display: flex; flex-direction: column;">
          <span class="badge badge-accent" style="margin-bottom: 1rem;">ENTRY PERFORMANCE</span>
          <h2 class="text-h3" style="margin-bottom: 0.25rem;">Essential Comfort</h2>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">Ideal for mild climates and standard residential window retrofits.</p>
          
          <div style="margin-bottom: 1.75rem;">
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">From</span>
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--color-text-main); font-family: var(--font-mono); line-height: 1;">₹720 – ₹890</div>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">per window installed</span>
          </div>

          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: var(--color-text-main); margin-bottom: 2rem; flex: 1;">
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Performance Dual-Pane Argon Glazing</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} U-Factor 0.26 / SHGC 0.28</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} High-Density Composite Frame</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} 30 STC Acoustic Sound Dampening</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} AAMA 2400 Certified Master Installation</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} 25-Year Non-Prorated Warranty</li>
          </ul>

          <a href="quote.html" class="btn btn-secondary" style="width: 100%;">Request Essential Quote</a>
        </div>

        <!-- Package 2: Performance Plus (Featured) -->
        <div class="card-arch" style="display: flex; flex-direction: column; border-color: var(--color-primary); box-shadow: var(--shadow-xl); position: relative;">
          <div style="position: absolute; top: 0; right: 0; background-color: var(--color-highlight); color: var(--color-highlight-text); font-size: 0.75rem; font-weight: 800; padding: 0.35rem 1rem; border-bottom-left-radius: var(--radius-md); letter-spacing: 0.05em; text-transform: uppercase;">
            MOST POPULAR
          </div>
          <span class="badge badge-teal" style="margin-bottom: 1rem;">ENHANCED COMFORT</span>
          <h2 class="text-h3" style="margin-bottom: 0.25rem;">Performance Plus</h2>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">Our top-selling package for Northern &amp; mixed climate comfort.</p>
          
          <div style="margin-bottom: 1.75rem;">
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">From</span>
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); line-height: 1;">₹880 – ₹1,150</div>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">per window installed</span>
          </div>

          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: var(--color-text-main); margin-bottom: 2rem; flex: 1;">
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} <strong>Signature Triple-Pane Argon Low-E</strong></li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} <strong>U-Factor 0.18 / SHGC 0.23</strong></li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Multi-Point Compression Cam Locks</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} 34 STC Acoustic Noise Barrier</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Low-Expansion Closed-Cell Foam Barrier</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Qualifies for 25C Energy Tax Credit (₹1,200)</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} 25-Year Transferable Warranty Deed</li>
          </ul>

          <a href="booking.html" class="btn btn-primary btn-lg" style="width: 100%;">Schedule Free Measurement</a>
        </div>

        <!-- Package 3: Signature Efficiency -->
        <div class="card-arch" style="display: flex; flex-direction: column;">
          <span class="badge badge-citron" style="margin-bottom: 1rem;">ULTIMATE SPECIFICATION</span>
          <h2 class="text-h3" style="margin-bottom: 0.25rem;">Signature Efficiency</h2>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">Maximum insulation, severe storm DP-70 rating, and studio acoustics.</p>
          
          <div style="margin-bottom: 1.75rem;">
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">From</span>
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--color-text-main); font-family: var(--font-mono); line-height: 1;">₹1,180 – ₹1,480</div>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">per window installed</span>
          </div>

          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: var(--color-text-main); margin-bottom: 2rem; flex: 1;">
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} <strong>Triple-Pane Pure Krypton Gas Fill</strong></li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} <strong>Ultra-Low U-Factor 0.15 – 0.16</strong></li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Asymmetric Acoustic Laminate (38 STC)</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Marine-Grade 316 Stainless Hardware</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Bespoke Obsidian / Architectural Bronze Finishes</li>
            <li style="display: flex; gap: 0.5rem;">${ICONS.check} Lifetime Accidental Glass Breakage Included</li>
          </ul>

          <a href="quote.html" class="btn btn-secondary" style="width: 100%;">Request Signature Quote</a>
        </div>
      </div>

      <!-- Feature Comparison Table -->
      <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: clamp(1.5rem, 3vw, 2.5rem); margin-bottom: 4rem;">
        <h3 class="text-h2" style="margin-bottom: 1.5rem; text-align: center;">Comprehensive Package Comparison</h3>
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
          <table style="width: 100%; border-collapse: collapse; min-width: 650px; font-size: 0.9rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--color-border); color: var(--color-text-main);">
                <th style="padding: 1rem; text-align: start;">Performance Features</th>
                <th style="padding: 1rem; text-align: center;">Essential Comfort</th>
                <th style="padding: 1rem; text-align: center; color: var(--color-primary);">Performance Plus</th>
                <th style="padding: 1rem; text-align: center;">Signature Efficiency</th>
              </tr>
            </thead>
            <tbody style="color: var(--color-text-muted);">
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem; font-weight: 600; color: var(--color-text-main);">Glazing Configuration</td>
                <td style="padding: 1rem; text-align: center;">Dual-Pane Low-E</td>
                <td style="padding: 1rem; text-align: center; font-weight: 700; color: var(--color-primary);">Triple-Pane Low-E</td>
                <td style="padding: 1rem; text-align: center; font-weight: 700;">Triple-Pane Ultra Low-E</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem; font-weight: 600; color: var(--color-text-main);">Thermal U-Factor</td>
                <td style="padding: 1rem; text-align: center; font-family: var(--font-mono);">0.26</td>
                <td style="padding: 1rem; text-align: center; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">0.18</td>
                <td style="padding: 1rem; text-align: center; font-family: var(--font-mono); font-weight: 700;">0.15 – 0.16</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem; font-weight: 600; color: var(--color-text-main);">Gas Chamber Filling</td>
                <td style="padding: 1rem; text-align: center;">90% Argon</td>
                <td style="padding: 1rem; text-align: center;">90% Argon Dual-Chamber</td>
                <td style="padding: 1rem; text-align: center;">Pure Krypton Dual-Chamber</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem; font-weight: 600; color: var(--color-text-main);">Acoustic Rating (STC)</td>
                <td style="padding: 1rem; text-align: center;">30 STC</td>
                <td style="padding: 1rem; text-align: center;">34 STC</td>
                <td style="padding: 1rem; text-align: center; font-weight: 700;">38 STC (Studio Grade)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem; font-weight: 600; color: var(--color-text-main);">Federal Tax Credit (25C)</td>
                <td style="padding: 1rem; text-align: center;">Selected Regions</td>
                <td style="padding: 1rem; text-align: center; color: var(--color-success); font-weight: 700;">100% Qualified (₹1,200)</td>
                <td style="padding: 1rem; text-align: center; color: var(--color-success); font-weight: 700;">100% Qualified (₹1,200)</td>
              </tr>
              <tr>
                <td style="padding: 1rem; font-weight: 600; color: var(--color-text-main);">Transferable Warranty</td>
                <td style="padding: 1rem; text-align: center;">25 Years</td>
                <td style="padding: 1rem; text-align: center;">25 Years</td>
                <td style="padding: 1rem; text-align: center;">25 Years + Accidental Glass</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Financing & Payment Options -->
      <div class="calc-stat-hero grid-2-col-split">
        <div>
          <span class="badge badge-citron" style="margin-bottom: 0.75rem;">FLEXIBLE FINANCING</span>
          <h2 class="text-h2" style="margin-bottom: 1rem;">Upgrade Now with 0% APR Financing</h2>
          <p style="color: var(--color-text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem;">
            Enjoy whole-home comfort immediately with 0% interest for 18 months or low monthly payment terms up to 120 months. Quick 60-second digital application.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="quote.html" class="btn btn-primary">Check Financing Eligibility</a>
            <a href="booking.html" class="btn btn-secondary">Schedule In-Home Measurement</a>
          </div>
        </div>
        <div class="card-flat" style="background-color: var(--color-card); text-align: center;">
          <div style="font-size: 0.8125rem; color: var(--color-text-muted); text-transform: uppercase;">Sample Payment Basis</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-block: 0.25rem;">₹129 / mo</div>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 1rem;">Based on ₹10,000 project scope &bull; 84 months &bull; Subject to credit approval</div>
          <span class="badge badge-accent">No Prepayment Penalties</span>
        </div>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Window Replacement Pricing & Financing Packages — Vitrava',
    'Transparent line-item window replacement pricing: Essential Comfort, Performance Plus, and Signature Efficiency packages. 0% APR financing available.',
    bodyContent,
    depth,
    'pricing'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'pricing.html'), html, 'utf8');
}

// 6. CONTACT PAGE (contact.html)
function generateContactPage() {
  const bodyContent = `
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 820px; margin-inline: auto; text-align: center;">
        <span class="badge badge-teal" style="margin-bottom: 1rem;">CONNECT WITH VITRAVA</span>
        <h1 class="text-h1" style="margin-bottom: 1rem;">Contact Our Architectural Window Team</h1>
        <p class="text-lead">
          Have questions about window styles, energy tax credits, or need an in-home measurement? Reach out directly to our engineering team.
        </p>
      </div>
    </div>
  </section>

  <section class="section-spacing">
    <div class="container-custom">
      <div class="grid-2-col-split">
        
        <!-- Contact Info & Office Details -->
        <div>
          <h2 class="text-h2" style="margin-bottom: 1.5rem;">Direct Headquarter Information</h2>
          <p style="color: var(--color-text-muted); line-height: 1.65; margin-bottom: 2rem;">
            Our window showroom and architectural consultation center is open Monday through Saturday. Drop in to view full-scale window frames and thermal glass cutaways.
          </p>

          <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem;">
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; flex-shrink: 0;">
                ${ICONS.phone}
              </div>
              <div>
                <div style="font-weight: 700; color: var(--color-text-main);">Toll-Free Phone Support</div>
                <a href="tel:18005558487" style="color: var(--color-primary); font-weight: 700; font-size: 1.05rem;">(800) 555-VITRAVA</a>
                <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Mon – Fri: 7:30 AM – 6:30 PM &bull; Sat: 9:00 AM – 4:00 PM</div>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background-color: var(--color-accent); color: var(--color-primary); display: grid; place-items: center; flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <div style="font-weight: 700; color: var(--color-text-main);">Email Correspondence</div>
                <a href="mailto:inquiry@vitravawindows.com" style="color: var(--color-primary); font-weight: 600;">inquiry@vitravawindows.com</a>
                <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Average response time under 2 business hours</div>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background-color: var(--color-card-muted); color: var(--color-text-main); display: grid; place-items: center; flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div style="font-weight: 700; color: var(--color-text-main);">Architectural Design Showroom</div>
                <div style="color: var(--color-text-muted); font-size: 0.95rem;">780 Architectural Parkway, Suite 400<br>Portland, OR 97204</div>
              </div>
            </div>
          </div>

          <!-- Interactive Regional Service Area Map -->
          <figure class="window-frame-wrapper service-area-map">
            <iframe
              title="Interactive map of Greater Portland, Beaverton and Lake Oswego, Oregon"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-123.05%2C45.30%2C-122.35%2C45.70&amp;layer=mapnik"
              width="640"
              height="360"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
            <figcaption>
              <strong>Vitrava Regional Service Area</strong>
              <p class="service-area-map__description">Serving Greater Portland, Lake Oswego, Beaverton &amp; Coastal Oregon</p>
              <a class="service-area-map__link" href="https://www.openstreetmap.org/#map=10/45.50/-122.70" target="_blank" rel="noopener noreferrer" aria-label="View larger map on OpenStreetMap (opens in a new tab)">View larger map &rarr;</a>
            </figcaption>
          </figure>
        </div>

        <!-- Validated Contact Form -->
        <div class="card-arch">
          <h3 class="text-h3" style="margin-bottom: 0.5rem;">Send a Message</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
            Fill out the form below and an architectural window consultant will get back to you promptly.
          </p>

          <form id="contact-form" novalidate>
            <div class="form-group">
              <label for="contact-name" class="form-label">Full Name *</label>
              <input type="text" id="contact-name" class="form-input" placeholder="e.g. Eleanor Vance" minlength="3" required>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label for="contact-email" class="form-label">Email Address *</label>
                <input type="email" id="contact-email" class="form-input" placeholder="name@example.com" required>
              </div>
              <div class="form-group">
                <label for="contact-phone" class="form-label">Phone Number *</label>
                <input type="tel" id="contact-phone" class="form-input" placeholder="10-digit phone number" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required>
              </div>
            </div>

            <div class="form-group">
              <label for="contact-interest" class="form-label">Primary Interest</label>
              <select id="contact-interest" class="form-select">
                <option value="Residential Replacement">Residential Window Replacement</option>
                <option value="Thermal Energy Assessment">Thermal Energy Audit</option>
                <option value="Custom Measurement">Free In-Home Measurement</option>
                <option value="Product Pricing">Product Pricing &amp; Financing</option>
                <option value="Architectural Specification">Architectural / Commercial Inquiry</option>
              </select>
            </div>

            <div class="form-group">
              <label for="contact-message" class="form-label">How can we help with your project? *</label>
              <textarea id="contact-message" class="form-textarea" rows="4" placeholder="Tell us about your home, number of windows, draft issues, or preferred styles..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Submit Message &rarr;</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="section-spacing contact-faq-section" aria-labelledby="contact-faq-title">
    <div class="container-custom contact-faq-container">
      <div class="contact-faq-heading">
        <span class="badge badge-teal" style="margin-bottom: 1rem;">HELPFUL ANSWERS</span>
        <h2 class="text-h2" id="contact-faq-title">Questions before you reach out?</h2>
        <p class="text-lead">Find quick answers about measurements, estimates, and our service area.</p>
      </div>

      <div class="contact-faq-list" data-accordion-single>
        <div class="accordion-item">
          <h3 class="contact-faq-question">
            <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="contact-faq-measurement">
              Is the in-home measurement free?
              <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
          </h3>
          <div class="accordion-content" id="contact-faq-measurement"><div class="accordion-body">Yes. We offer a complimentary in-home measurement and consultation. A specialist will review your openings, discuss window options, and prepare a project estimate with no obligation.</div></div>
        </div>

        <div class="accordion-item">
          <h3 class="contact-faq-question">
            <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="contact-faq-service-area">
              Which areas does Vitrava serve?
              <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
          </h3>
          <div class="accordion-content" id="contact-faq-service-area"><div class="accordion-body">Our team serves Greater Portland, including Beaverton and Lake Oswego, as well as nearby communities along the Oregon coast. Contact us with your ZIP code and we’ll confirm availability.</div></div>
        </div>

        <div class="accordion-item">
          <h3 class="contact-faq-question">
            <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="contact-faq-timeline">
              How long does a window replacement project take?
              <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
          </h3>
          <div class="accordion-content" id="contact-faq-timeline"><div class="accordion-body">Timing depends on the number of windows, product selection, and project requirements. We’ll provide an estimated schedule with your proposal and keep you updated through ordering and installation.</div></div>
        </div>

        <div class="accordion-item">
          <h3 class="contact-faq-question">
            <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="contact-faq-quote">
              What information should I include when requesting an estimate?
              <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
          </h3>
          <div class="accordion-content" id="contact-faq-quote"><div class="accordion-body">Share your project address, an approximate window count, and any priorities such as comfort, noise reduction, or a particular style. Photos are helpful but not required; we can gather measurements during your consultation.</div></div>
        </div>

        <div class="accordion-item">
          <h3 class="contact-faq-question">
            <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="contact-faq-response">
              When can I expect a reply to my message?
              <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
          </h3>
          <div class="accordion-content" id="contact-faq-response"><div class="accordion-body">Our team typically responds within two business hours during support hours. Messages received outside those hours are answered on the next business day.</div></div>
        </div>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Contact Vitrava Windows — Architectural Showroom & Consultation',
    'Get in touch with Vitrava window replacement experts. Toll-free phone, showroom directions, and quick validated inquiry form.',
    bodyContent,
    depth,
    'contact'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'contact.html'), html, 'utf8');
}

// 7. REQUEST A QUOTE (quote.html)
function generateQuotePage() {
  const bodyContent = `
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 820px; margin-inline: auto; text-align: center;">
        <span class="badge badge-teal" style="margin-bottom: 1rem;">INSTANT ESTIMATE</span>
        <h1 class="text-h1" style="margin-bottom: 1rem;">Request a Window Replacement Quote</h1>
        <p class="text-lead">
          Receive a clear, transparent line-item estimate customized to your home’s architectural dimensions and energy goals.
        </p>
      </div>
    </div>
  </section>

  <section class="section-spacing">
    <div class="container-custom" style="max-width: 980px;">
      <div class="card-arch">
        <form id="quote-form" novalidate>
          <h3 class="text-h3" style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem;">Project Parameters</h3>

          <div class="form-row-2">
            <div class="form-group">
              <label for="quote-name" class="form-label">Full Name *</label>
              <input type="text" id="quote-name" class="form-input" placeholder="e.g. Alexander Hayes" minlength="3" required>
            </div>
            <div class="form-group">
              <label for="quote-email" class="form-label">Email Address *</label>
              <input type="email" id="quote-email" class="form-input" placeholder="a.hayes@example.com" required>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="quote-phone" class="form-label">Phone Number *</label>
              <input type="tel" id="quote-phone" class="form-input" placeholder="10-digit phone number" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required>
            </div>
            <div class="form-group">
              <label for="quote-property" class="form-label">Property Type</label>
              <select id="quote-property" class="form-select">
                <option value="Single Family Home">Single Family Home</option>
                <option value="Townhouse / Brownstone">Townhouse / Brownstone</option>
                <option value="Modern Villa / Pavilion">Modern Villa / Pavilion</option>
                <option value="Historic Residence">Historic Conservation Residence</option>
              </select>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="quote-window-style" class="form-label">Preferred Window Style</label>
              <select id="quote-window-style" class="form-select">
                <option value="Casement">Airtight Casement Windows</option>
                <option value="Double-Hung">Modern Double-Hung Windows</option>
                <option value="Horizontal Sliding">Horizontal Sliding Gliders</option>
                <option value="Picture Windows">Architectural Picture Windows</option>
                <option value="Bay & Bow">Bay &amp; Bow Projection Windows</option>
                <option value="Awning Windows">Top-Hinged Awning Windows</option>
                <option value="Mixed Whole-Home Package" selected>Mixed Whole-Home Package</option>
              </select>
            </div>
            <div class="form-group">
              <label for="quote-window-count" class="form-label">Estimated Number of Windows</label>
              <input type="number" id="quote-window-count" class="form-input" min="1" max="60" value="12" required>
            </div>
          </div>

          <div class="form-group">
            <label for="quote-address" class="form-label">Property Address / Service Location *</label>
            <input type="text" id="quote-address" class="form-input" placeholder="742 Evergreen Terrace, Portland, OR" required>
          </div>

          <div class="form-group">
            <label for="quote-notes" class="form-label">Additional Project Details or Current Draft Issues</label>
            <textarea id="quote-notes" class="form-textarea" rows="3" placeholder="Tell us if you have fogged glass, rotting sills, or want custom black frame finishes..."></textarea>
          </div>

          <div class="form-group" style="margin-top: 1rem;">
            <label class="custom-checkbox">
              <input type="checkbox" id="quote-consent" required>
              <span>I agree to receive a verified project estimate and follow-up from Vitrava Windows. Zero spam, privacy protected.</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1rem;">Submit Quote Request &rarr;</button>
        </form>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Request a Window Replacement Quote — Vitrava',
    'Get an instant, transparent line-item estimate for your residential window replacement project.',
    bodyContent,
    depth,
    'quote'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'quote.html'), html, 'utf8');
}

// 8. BOOK A MEASUREMENT (booking.html)
function generateBookingPage() {
  const bodyContent = `
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 820px; margin-inline: auto; text-align: center;">
        <span class="badge badge-citron" style="margin-bottom: 1rem;">COMPLIMENTARY IN-HOME VISIT</span>
        <h1 class="text-h1" style="margin-bottom: 1rem;">Book a Free Laser Measurement</h1>
        <p class="text-lead">
          A certified Vitrava measurement technician will visit your home with digital laser instruments, frame samples, and thermal diagnostics. Zero sales pressure.
        </p>
      </div>
    </div>
  </section>

  <section class="section-spacing">
    <div class="container-custom" style="max-width: 980px;">
      <div class="card-arch">
        <form id="booking-form" novalidate>
          <h3 class="text-h3" style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem;">Appointment Details</h3>

          <div class="form-row-2">
            <div class="form-group">
              <label for="booking-name" class="form-label">Full Name *</label>
              <input type="text" id="booking-name" class="form-input" placeholder="e.g. Sarah Hayes" minlength="3" required>
            </div>
            <div class="form-group">
              <label for="booking-email" class="form-label">Email Address *</label>
              <input type="email" id="booking-email" class="form-input" placeholder="s.hayes@example.com" required>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="booking-phone" class="form-label">Phone Number *</label>
              <input type="tel" id="booking-phone" class="form-input" placeholder="10-digit phone number" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required>
            </div>
            <div class="form-group">
              <label for="booking-address" class="form-label">Home Address *</label>
              <input type="text" id="booking-address" class="form-input" placeholder="Street address, city, state, zip" required>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="booking-date" class="form-label">Preferred Date *</label>
              <input type="date" id="booking-date" class="form-input" required>
              <span class="form-hint">Past dates are automatically restricted.</span>
            </div>
            <div class="form-group">
              <label for="booking-slot" class="form-label">Preferred Time Window *</label>
              <select id="booking-slot" class="form-select" required>
                <option value="09:00 AM – 11:00 AM">Morning (09:00 AM – 11:00 AM)</option>
                <option value="11:30 AM – 01:30 PM">Midday (11:30 AM – 01:30 PM)</option>
                <option value="02:00 PM – 04:00 PM">Afternoon (02:00 PM – 04:00 PM)</option>
                <option value="04:30 PM – 06:30 PM">Evening (04:30 PM – 06:30 PM)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="booking-instructions" class="form-label">Special Access or Parking Notes</label>
            <textarea id="booking-instructions" class="form-textarea" rows="2" placeholder="e.g. Gate code, driveway parking instructions, or specific rooms to prioritize..."></textarea>
          </div>

          <div style="background-color: var(--color-card-muted); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>What to Expect:</strong> Visits typically take 45 to 60 minutes. Our technician measures rough openings from inside your home and shows physical frame finishes and glazing cutaways.
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Confirm Measurement Appointment &rarr;</button>
        </form>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Book a Free Window Measurement — Vitrava',
    'Schedule your complimentary in-home laser window measurement appointment with a Vitrava specialist.',
    bodyContent,
    depth,
    'booking'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'booking.html'), html, 'utf8');
}

// 9. LOGIN (login.html)
function generateLoginPage() {
  const bodyContent = `
  <section class="auth-card" aria-labelledby="auth-title">
    <a href="index.html" class="site-brand" aria-label="Vitrava Home 01">
      ${ICONS.logo}
      <span class="site-brand__text">
        <span class="site-brand__name">VITRAVA</span>
        <span class="site-brand__tagline">Smarter Windows</span>
      </span>
    </a>
    <div class="auth-card__intro">
      <p class="auth-card__eyebrow">Client portal access</p>
      <h1 id="auth-title">Sign in to your account</h1>
      <p class="auth-card__description">Track your installation progress, appointments, and warranty documents.</p>
    </div>
    <form id="login-form" novalidate>
          <div class="form-group">
            <label for="login-email" class="form-label">Email Address *</label>
            <input type="email" id="login-email" autocomplete="username" class="form-input" placeholder="name@example.com" required>
          </div>

          <div class="form-group">
            <div class="form-label">
              <label for="login-password">Password *</label>
              <a href="forgot-password.html" class="auth-card__link auth-card__forgot">Forgot password?</a>
            </div>
            <div class="auth-card__password">
              <input type="password" id="login-password" autocomplete="current-password" class="form-input" placeholder="Enter your password" required>
              <button type="button" data-action="toggle-password" class="auth-card__password-toggle" aria-label="Show password" aria-controls="login-password">Show</button>
            </div>
          </div>

          <div class="auth-card__remember">
            <label class="custom-checkbox">
              <input type="checkbox" checked>
              <span>Remember me</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary auth-card__submit">Sign In to Portal &rarr;</button>
          
        </form>
    <p class="auth-card__switch">New to Vitrava? <a class="auth-card__link" href="register.html">Create an account</a></p>
  </section>
  `;

  const html = wrapHtml(
    'Sign In — Vitrava Client Installation Portal',
    'Sign in to access your active window installation project timeline, appointments, and warranty certificates.',
    bodyContent,
    depth,
    'login',
    '',
    'auth'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'login.html'), html, 'utf8');
}

// 10. REGISTER (register.html)
function generateRegisterPage() {
  const bodyContent = `
  <section class="auth-card auth-card--register" aria-labelledby="auth-title">
    <a href="index.html" class="site-brand" aria-label="Vitrava Home 01">
      ${ICONS.logo}
      <span class="site-brand__text">
        <span class="site-brand__name">VITRAVA</span>
        <span class="site-brand__tagline">Smarter Windows</span>
      </span>
    </a>
    <div class="auth-card__intro">
      <p class="auth-card__eyebrow">New homeowner</p>
      <h1 id="auth-title">Create your portal account</h1>
      <p class="auth-card__description">Manage your window project, from your first measurement to your warranty.</p>
    </div>
    <form id="register-form" novalidate>
          <div class="form-group">
            <label for="reg-name" class="form-label">Full Name *</label>
            <input type="text" id="reg-name" autocomplete="name" class="form-input" placeholder="e.g. Eleanor Vance" minlength="3" required>
          </div>

          <div class="auth-form-grid">
            <div class="form-group">
              <label for="reg-email" class="form-label">Email Address *</label>
              <input type="email" id="reg-email" autocomplete="email" class="form-input" placeholder="name@example.com" required>
            </div>
            <div class="form-group">
              <label for="reg-phone" class="form-label">Phone Number *</label>
              <input type="tel" id="reg-phone" autocomplete="tel" class="form-input" placeholder="10-digit phone number" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required>
            </div>
          </div>

          <div class="auth-form-grid"><div class="form-group">
            <label for="reg-password" class="form-label">Create Password *</label>
            <input type="password" id="reg-password" autocomplete="new-password" class="form-input" placeholder="Min. 8 characters" required>
            <span class="form-hint">At least 8 characters with letters and numbers.</span>
          </div><div class="form-group">
            <label for="reg-password-confirm" class="form-label">Confirm Password *</label>
            <input type="password" id="reg-password-confirm" autocomplete="new-password" class="form-input" placeholder="Repeat password" required>
          </div></div>

          <div class="form-group" style="margin-top: 1rem;">
            <label class="custom-checkbox">
              <input type="checkbox" id="reg-terms" required>
              <span>I agree to the Vitrava Terms of Service and Privacy Policy.</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary auth-card__submit">Create Account &rarr;</button>
        </form>
    <p class="auth-card__switch">Already have an account? <a class="auth-card__link" href="login.html">Sign in</a></p>
  </section>
  `;

  const html = wrapHtml(
    'Register Account — Vitrava Client Installation Portal',
    'Create your Vitrava customer account to manage your window replacement project and documents.',
    bodyContent,
    depth,
    'register',
    '',
    'auth'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'register.html'), html, 'utf8');
}

// 11. FORGOT PASSWORD (forgot-password.html)
function generateForgotPasswordPage() {
  const bodyContent = `
  <section class="auth-card" aria-labelledby="auth-title">
    <a href="index.html" class="site-brand" aria-label="Vitrava Home 01">
      ${ICONS.logo}
      <span class="site-brand__text">
        <span class="site-brand__name">VITRAVA</span>
        <span class="site-brand__tagline">Smarter Windows</span>
      </span>
    </a>
    <div class="auth-card__intro">
      <p class="auth-card__eyebrow">Security recovery</p>
      <h1 id="auth-title">Reset your password</h1>
      <p class="auth-card__description">Enter your account email and we will send password reset instructions.</p>
    </div>
    <form id="forgot-form" novalidate>
      <div class="form-group">
        <label for="forgot-email" class="form-label">Registered Account Email *</label>
        <input type="email" id="forgot-email" autocomplete="email" class="form-input" placeholder="a.hayes@example.com" required>
      </div>
      <button type="submit" class="btn btn-primary auth-card__submit">Send Reset Link</button>
    </form>
    <p class="auth-card__switch">Remembered your password? <a href="login.html" class="auth-card__link">Back to login</a></p>
  </section>
  `;

  const html = wrapHtml(
    'Reset Password — Vitrava Client Portal',
    'Recover your Vitrava client portal login credentials.',
    bodyContent,
    depth,
    'login',
    '',
    'auth'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'forgot-password.html'), html, 'utf8');
}

// 12. 404 NOT FOUND (404.html)
function generate404Page() {
  const bodyContent = `
  <section class="section-spacing" style="min-height: 75vh; display: flex; align-items: center; text-align: center;">
    <div class="container-custom" style="max-width: 650px;">
      <span class="badge badge-citron" style="margin-bottom: 1rem;">ERROR 404 &bull; PAGE NOT FOUND</span>
      <h1 class="text-display" style="margin-bottom: 1rem; color: var(--color-primary);">404</h1>
      <h2 class="text-h2" style="margin-bottom: 1rem;">The Window You're Looking For Has Been Moved</h2>
      <p class="text-lead" style="margin-bottom: 2rem;">
        The page or resource you requested is no longer located at this address. Please use the navigation links below to return to our main catalog.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="index.html" class="btn btn-primary btn-lg">Return to Home</a>
        <a href="services.html#window-styles" class="btn btn-secondary btn-lg">Browse Window Styles</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Page Not Found (404) — Vitrava Windows',
    'The requested page could not be located on Vitrava Windows.',
    bodyContent,
    depth,
    '404'
  );

  fs.writeFileSync(path.join(__dirname, '..', '404.html'), html, 'utf8');
}

// 13. COMING SOON / MAINTENANCE (coming-soon.html)
function generateComingSoonPage() {
  const bodyContent = `
  <section class="section-spacing" style="min-height: 80vh; display: flex; align-items: center; text-align: center;">
    <div class="container-custom" style="max-width: 720px;">
      <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
        ${ICONS.logo}
      </div>
      <span class="badge badge-teal" style="margin-bottom: 1rem;">ARCHITECTURAL LAUNCH</span>
      <h1 class="text-h1" style="margin-bottom: 1.25rem;">Next-Generation Window Systems Coming Soon</h1>
      <p class="text-lead" style="margin-bottom: 2.5rem;">
        Our new Architectural Glazing Studio and Carbon-Zero Window Line are currently being calibrated for commercial release.
      </p>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 3rem; max-width: 480px; margin-inline: auto;">
        <div class="card-flat" style="padding: 1rem 0.5rem;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">28</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Days</div>
        </div>
        <div class="card-flat" style="padding: 1rem 0.5rem;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">14</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Hours</div>
        </div>
        <div class="card-flat" style="padding: 1rem 0.5rem;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">45</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Mins</div>
        </div>
        <div class="card-flat" style="padding: 1rem 0.5rem;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">20</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Secs</div>
        </div>
      </div>

      <a href="index.html" class="btn btn-primary btn-lg">Explore Current Catalog &rarr;</a>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Coming Soon — Vitrava Architectural Glazing',
    'Next-generation architectural window systems coming soon from Vitrava.',
    bodyContent,
    depth,
    'coming-soon'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'coming-soon.html'), html, 'utf8');
}

generateHome01();
generateHome02();
generateAboutPage();
generateCalculatorPage();
generatePricingPage();
generateContactPage();
generateQuotePage();
generateBookingPage();
generateLoginPage();
generateRegisterPage();
generateForgotPasswordPage();
generate404Page();
generateComingSoonPage();

console.log('Core public pages (13 pages) generated successfully.');
