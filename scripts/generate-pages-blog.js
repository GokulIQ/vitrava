const fs = require('fs');
const path = require('path');
const { wrapHtml, ICONS, getRelRoot } = require('./builder-core');

const articles = [
  {
    slug: 'how-windows-reduce-heat-transfer',
    title: 'How Energy-Efficient Windows Reduce Heat Transfer',
    category: 'science',
    categoryLabel: 'Energy Science',
    date: 'Oct 10, 2026',
    readTime: '6 min read',
    author: 'Elena Rostova, PE',
    authorRole: 'VP of Thermal Engineering',
    heroImg: 'assets/images/blog/heat-transfer-main.jpg',
    detailImg: 'assets/images/blog/heat-transfer-secondary.jpg',
    detailCaption: 'Fig 1.1 — Atomically thin silver Low-E layers reflecting infrared heat waves back indoors while admitting natural solar daylight.',
    summary: 'A deep dive into conduction, convection, and radiation physics. How microscopic low-E silver layers and inert argon gas keep warmth inside your home.',
    content: `
      <h2>The Three Modes of Window Heat Transfer</h2>
      <p>Heat is always in motion, naturally migrating from warm zones to colder zones. In a residential building, windows represent the thinnest barrier between conditioned indoor air and outdoor temperature extremes. Heat escapes or enters your home through three distinct physical mechanisms:</p>
      <ul>
        <li><strong>Conduction:</strong> Heat moving directly through physical materials—specifically the glass panes, spacers, and window frame structure.</li>
        <li><strong>Convection:</strong> Air currents circulating within the gap between glass panes, carrying heat from the warm interior pane to the cold exterior pane.</li>
        <li><strong>Thermal Radiation:</strong> Electromagnetic infrared energy emitted by warm objects inside your home (radiators, floors, human bodies) radiating directly through standard glass to the cold sky.</li>
      </ul>

      <h2>The Chemistry of Low-Emissivity (Low-E) Coatings</h2>
      <p>Standard clear glass has an emissivity rating of approximately 0.84, meaning it radiates 84% of absorbed thermal energy away. Vitrava low-E glass features an atomically thin, multi-layer coating of pure silver deposited onto the interior glass surface inside a vacuum chamber. This drops emissivity down to 0.03, causing 74% to 85% of long-wave infrared heat to bounce right back into your living room instead of radiating out into the winter night.</p>

      <h2>Inert Gas Fills: Argon vs Krypton</h2>
      <p>Rather than leaving standard atmospheric air between glass panes, high-efficiency insulated glass units (IGUs) are pumped with dense, inert noble gases. Argon is 38% denser than ambient air with a thermal conductivity of only 0.016 W/(m·K), virtually shutting down internal convective loops. For our Signature Triple-Pane configurations with ultra-slim cavity gaps, we utilize pure Krypton gas, which provides 2x the thermal resistance of argon.</p>
    `
  },
  {
    slug: 'double-vs-triple-glazing',
    title: 'Double vs Triple Glazing: Which Is Right for Your Home?',
    category: 'buying-guide',
    categoryLabel: 'Buying Guide',
    date: 'Oct 08, 2026',
    readTime: '8 min read',
    author: 'Marcus Vance',
    authorRole: 'Principal Window Architect',
    heroImg: 'assets/images/blog/double-vs-triple-main.jpg',
    detailImg: 'assets/images/blog/double-vs-triple-secondary.jpg',
    detailCaption: 'Fig 1.2 — Multi-chambered insulating glass engineering eliminating radiant chill and perimeter draft currents in cold climates.',
    summary: 'Comparing upfront investment, cold-climate comfort, acoustic noise reduction, and return on investment between dual-pane and triple-pane windows.',
    content: `
      <h2>Beyond the Energy Bill: The Radiant Comfort Factor</h2>
      <p>When homeowners compare double versus triple glazing, they often focus exclusively on utility bill payback periods. While double glazing offers a dramatic upgrade over single-pane windows, triple glazing delivers an indispensable domestic luxury: <em>Mean Radiant Temperature (MRT) equilibrium</em>.</p>
      <p>On a 0°F winter evening, the interior glass surface of a standard dual-pane window drops to approximately 56°F. When you sit near that window, your body radiates heat toward the cold glass, making you feel chilly even if your thermostat reads 72°F. With Vitrava Triple-Pane Krypton glazing, the interior surface remains at 68°F—virtually identical to the ambient room temperature.</p>

      <h2>Acoustic Soundproofing (STC Rating)</h2>
      <p>Triple glazing adds a second internal chamber and three distinct glass panes. When engineered with asymmetric glass thicknesses (e.g., 4mm exterior + 3mm center + 6mm interior), sound waves of varying frequencies are disrupted and canceled out. Our triple-pane units achieve an impressive 36 to 38 STC rating, reducing perceived street noise, barking dogs, and highway rumble by up to 70%.</p>

      <h2>Regional Recommendation: Where Triple Glazing Is Mandatory</h2>
      <p>If you reside in Energy Star Northern or North-Central climate zones where winter heating accounts for the majority of annual utility costs, triple glazing pays for itself rapidly in both energy costs and draft-free comfort. For milder southern coastal climates, our Performance Dual-Pane Low-E Argon package is often the optimal financial fit.</p>
    `
  },
  {
    slug: 'signs-home-needs-window-replacement',
    title: '5 Warning Signs Your Windows Need Immediate Replacement',
    category: 'buying-guide',
    categoryLabel: 'Buying Guide',
    date: 'Oct 05, 2026',
    readTime: '5 min read',
    author: 'David Chen',
    authorRole: 'Master Installation Director',
    heroImg: 'assets/images/blog/warning-signs-main.jpg',
    detailImg: 'assets/images/blog/warning-signs-secondary.jpg',
    detailCaption: 'Fig 1.3 — Hermetic seal breach, desiccant saturation, and rotting structural sill casing requiring full architectural replacement.',
    summary: 'From condensation fog trapped between panes to decaying sills and cold drafts. How to diagnose when windows are beyond simple repair.',
    content: `
      <h2>1. Fog or Condensation Trapped Between the Glass Panes</h2>
      <p>If you see moisture, haziness, or droplets inside the airspace between two panes of glass that you cannot wipe away from either side, the perimeter hermetic seal has completely failed. The desiccant material inside the spacer bar has become saturated with humidity. Once a seal fails, the insulating argon gas has escaped, rendering the window thermally ineffective.</p>

      <h2>2. Convective Drafts and Flickering Flame Tests</h2>
      <p>Hold a lit candle or an incense stick near your window sash and meeting rails on a windy day. If the flame flickers vigorously or the smoke is swept sideways, cold exterior air is infiltrating directly through collapsed weatherstripping or warped frame corners.</p>

      <h2>3. Water Stains, Soft Sills, or Peeling Paint</h2>
      <p>Inspect the bottom wooden sill and drywall corners beneath the window. Soft, spongy wood or bubbling interior paint indicates that driving rainwater is penetrating past the exterior casing and draining into your wall framing studs, leading to structural dry rot and hidden mold.</p>

      <h2>4. Sashes That Stick, Jam, or Refuse to Stay Open</h2>
      <p>Windows should open effortlessly with gentle fingertip pressure. If sashes require brute force to slide or crank open, the home framing has settled or the original window frame has warped. If a sash drops shut unexpectedly, the internal balance springs have snapped.</p>

      <h2>5. Unexplained Surges in Seasonal Heating and Cooling Bills</h2>
      <p>According to the U.S. Department of Energy, failing windows account for 25% to 30% of residential heating and cooling energy waste. If your utility rates haven't changed but your monthly consumption is climbing, your building envelope is leaking expensive air.</p>
    `
  },
  {
    slug: 'understanding-u-factor-shgc',
    title: 'Understanding U-Factor and Solar Heat Gain (SHGC)',
    category: 'science',
    categoryLabel: 'Energy Science',
    date: 'Oct 02, 2026',
    readTime: '7 min read',
    author: 'Elena Rostova, PE',
    authorRole: 'VP of Thermal Engineering',
    heroImg: 'assets/images/blog/u-factor-main.jpg',
    detailImg: 'assets/images/blog/u-factor-secondary.jpg',
    detailCaption: 'Fig 1.4 — Solar heat gain coefficient (SHGC) calibration engineered to balance winter passive warmth and summer thermal deflection.',
    summary: 'A plain-English guide to reading NFRC energy labels. What U-Factor, SHGC, Visual Transmittance, and Air Infiltration numbers really mean for your wallet.',
    content: `
      <h2>Deciphering the Official NFRC Energy Label</h2>
      <p>Every reputable replacement window sold in North America features an official National Fenestration Rating Council (NFRC) label. While contractor brochures often boast about proprietary brand names, the NFRC label provides independent, certified laboratory metrics.</p>

      <h2>1. U-Factor: The Insulation Metric</h2>
      <p>U-Factor measures the rate of non-solar heat transfer through the entire window assembly (both glass and frame). <strong>The lower the U-Factor number, the better the window insulates.</strong></p>
      <ul>
        <li>Single-pane clear window: U-Factor ~ 1.10 to 1.25 (Terrible)</li>
        <li>Standard double-pane builder window: U-Factor ~ 0.32 to 0.36 (Marginal)</li>
        <li>Energy Star Northern compliant: U-Factor &le; 0.22 (Good)</li>
        <li>Vitrava Signature Triple-Pane: U-Factor ~ 0.16 (Exceptional)</li>
      </ul>

      <h2>2. Solar Heat Gain Coefficient (SHGC)</h2>
      <p>SHGC measures the fraction of incident solar radiation admitted through a window, expressed as a number between 0 and 1. In warm climates, you want a low SHGC (0.20 – 0.25) to block intense solar heat and ease summer air conditioning loads. In cold northern climates, a moderate SHGC (0.26 – 0.32) can provide beneficial passive solar heating during bright winter afternoons.</p>

      <h2>3. Visible Transmittance (VT) &amp; Air Leakage (AL)</h2>
      <p>Visible Transmittance (0 to 1) tells you how much natural daylight passes through the glass. Vitrava triple low-E coatings maintain a high VT of 0.65+, ensuring rooms remain bright and naturally lit. Air Leakage must be tested under ASTM E283; Vitrava casements achieve an ultra-tight &lt; 0.01 CFM/ft².</p>
    `
  },
  {
    slug: 'casement-vs-double-hung',
    title: 'Casement vs Double-Hung Windows: An In-Depth Showdown',
    category: 'buying-guide',
    categoryLabel: 'Buying Guide',
    date: 'Sep 28, 2026',
    readTime: '6 min read',
    author: 'Marcus Vance',
    authorRole: 'Principal Window Architect',
    heroImg: 'assets/images/blog/casement-vs-doublehung-main.jpg',
    detailImg: 'assets/images/blog/casement-vs-doublehung-secondary.jpg',
    detailCaption: 'Fig 1.5 — 90-degree outward swing casement scoop ventilation versus dual-sash vertical convection airflow in residential homes.',
    summary: 'Comparing ventilation aerodynamics, air-tightness seals, ease of cleaning, and architectural styling between the two most popular replacement window styles.',
    content: `
      <h2>Aesthetic Heritage vs Contemporary Minimalism</h2>
      <p>Double-hung windows are the quintessential American architectural style, found across Colonial, Victorian, and Craftsman homes. With vertical sliding sashes and classic divided-lite grilles, they preserve period authenticity. Casement windows, with their unhindered full-sheet glass and outward swing, deliver sleek European minimalism and uninterrupted garden sightlines.</p>

      <h2>The Engineering Showdown: Air Infiltration Rates</h2>
      <p>When it comes to pure thermal airtightness, casement windows hold a distinct mechanical advantage:</p>
      <p>A double-hung window relies on sliding weatherstripping brush seals along jamb tracks. While modern materials are effective, winter wind pressure can slightly pull sashes away from meeting rails. In contrast, a casement window features continuous rubber bulb compression gaskets. When you turn the lock handle, stainless steel cams draw the sash tightly against the frame like a refrigerator door, achieving an air leakage rate up to 8x tighter than sliding windows.</p>

      <h2>Ventilation Aerodynamics</h2>
      <p>Because double-hung sashes overlap, a maximum of 50% of the window area can be opened at any one time. Casement windows open a full 90 degrees, offering 100% top-to-bottom ventilation. Furthermore, an open casement sash acts as a wind scoop, catching parallel breezes and redirecting fresh air directly into the home.</p>
    `
  },
  {
    slug: 'prepare-for-window-installation',
    title: 'How to Prepare Your Home for Window Installation Day',
    category: 'installation',
    categoryLabel: 'Installation',
    date: 'Sep 24, 2026',
    readTime: '5 min read',
    author: 'David Chen',
    authorRole: 'Master Installation Director',
    heroImg: 'assets/images/blog/prepare-installation-main.jpg',
    detailImg: 'assets/images/blog/prepare-installation-secondary.jpg',
    detailCaption: 'Fig 1.6 — White-glove site preparation: 5-foot perimeter clearance, protective drop cloths, and exterior staging workflow.',
    summary: 'The ultimate homeowner checklist: furniture clearance, blind removal, pet safety, and what to expect during our white-glove installation process.',
    content: `
      <h2>The 5-Step Homeowner Preparation Checklist</h2>
      <p>Vitrava master installation teams handle all heavy lifting, surgical removal, and job-site vacuuming. However, completing a few simple preparatory steps before our arrival ensures your project proceeds seamlessly and safely:</p>

      <h2>1. Clear Window Access Pathways</h2>
      <p>Our technicians will be carrying heavy triple-pane window units into each room. Please clear a 5-foot perimeter around all window openings, removing floor lamps, potted plants, small side tables, and fragile decorative objects.</p>

      <h2>2. Remove Window Treatments &amp; Blinds</h2>
      <p>Take down all curtains, drapes, sheers, and interior blinds prior to installation morning. This protects delicate fabrics from construction dust and gives our installers full access to the window casing.</p>

      <h2>3. Deactivate Window Security Sensors</h2>
      <p>If your home features a hardwired or wireless security alarm system connected to window frames or magnetic contacts, notify your alarm monitoring provider and disarm the sensors before work begins.</p>

      <h2>4. Secure Household Pets</h2>
      <p>With exterior doors frequently opening and unfamiliar technicians working throughout the home, pets can easily become startled. We recommend keeping cats and dogs comfortable in an unworked room or arranging daycare.</p>

      <h2>5. Clear Exterior Landscaping Access</h2>
      <p>Trim back any thorny bushes, heavy tree branches, or dense vines growing directly against exterior window frames to allow our crew safe ladder placement and clean perimeter caulking.</p>
    `
  },
  {
    slug: 'window-frame-materials-compared',
    title: 'Window Frame Materials Compared: Vinyl, Composite, Wood & Aluminum',
    category: 'science',
    categoryLabel: 'Materials Science',
    date: 'Sep 18, 2026',
    readTime: '7 min read',
    author: 'Elena Rostova, PE',
    authorRole: 'VP of Thermal Engineering',
    heroImg: 'assets/images/blog/frame-materials-main.jpg',
    detailImg: 'assets/images/blog/frame-materials-secondary.jpg',
    detailCaption: 'Fig 1.7 — Comparing structural composite (Fibrex), hollow vinyl, aluminum-clad wood, and thermally broken metal frame profiles.',
    summary: 'Evaluating thermal conductivity, structural deflection, maintenance requirements, and lifespan across the four major window frame materials.',
    content: `
      <h2>1. Structural Composite (Vitrava Standard)</h2>
      <p>Engineered from a blend of thermoplastic polymer and reclaimed structural wood fibers, composite frames offer the highest strength-to-weight ratio in the industry. Composite is 200% stronger than hollow vinyl, enabling ultra-slim sightlines. Crucially, its thermal expansion rate is identical to glass, meaning frame and glass expand and contract together without straining seals.</p>

      <h2>2. Hollow Vinyl (PVC)</h2>
      <p>Hollow vinyl is the most widespread budget window material. While it offers good thermal resistance at low cost, vinyl expands and contracts dramatically with temperature shifts (up to 2.5x more than glass). Over a decade of hot summers and freezing winters, this thermal movement often breaks corner weld joints and causes sash seals to leak air.</p>

      <h2>3. Solid Wood with Aluminum Cladding</h2>
      <p>Solid wood provides unmatched classic warmth and natural insulating value. However, unclad exterior wood requires scraping and repainting every 3 to 5 years to prevent rot. Aluminum-clad wood solves exterior maintenance by placing an extruded metal shield on the outside while retaining natural timber inside.</p>

      <h2>4. Thermally Broken Aluminum</h2>
      <p>Architectural aluminum frames provide unmatched structural rigidity for massive oversized glass spans. However, raw aluminum is a rapid thermal conductor. High-performance aluminum windows must feature a thick polyamide thermal break separating interior and exterior metal surfaces to prevent severe winter condensation.</p>
    `
  },
  {
    slug: 'reduce-drafts-improve-comfort',
    title: 'How to Eliminate Drafts and Maximize Living Comfort',
    category: 'installation',
    categoryLabel: 'Installation',
    date: 'Sep 12, 2026',
    readTime: '6 min read',
    author: 'David Chen',
    authorRole: 'Master Installation Director',
    heroImg: 'assets/images/blog/reduce-drafts-main.jpg',
    detailImg: 'assets/images/blog/reduce-drafts-secondary.jpg',
    detailCaption: 'Fig 1.8 — Complete draft elimination through continuous low-expansion micro-foam air barriers and resilient EPDM compression gaskets.',
    summary: 'Why your living room feels chilly even with the heating on. Understanding perimeter cavity leaks, convective drafts, and airtight window engineering.',
    content: `
      <h2>The Secret of the "Phantom Draft"</h2>
      <p>Many homeowners sit beside a closed window and swear they feel a physical breeze blowing across their neck, even when no air is visibly leaking. This phenomenon is known as a <strong>convective draft</strong>.</p>
      <p>When interior room air touches a cold single-pane or cheap double-pane window, the air cools down rapidly. Because cool air is heavier and denser than warm air, it sinks quickly to the floor, creating a continuous falling sheet of cold air that rushes across the living room carpet. To eliminate convective drafts, you don't just need an airtight seal—you need high-performance insulating glass that keeps the interior pane warm.</p>

      <h2>The Perimeter Shim Void Problem</h2>
      <p>When old windows are replaced improperly, hasty installers often stuff fiberglass batt insulation into the gap between the window jamb and the rough wall framing. Fiberglass is an air filter, not an air barrier! Wind blows right through it. Vitrava master installers inject continuous closed-cell low-expansion micro-foam that expands into every micro-cavity, creating an impenetrable 360-degree airtight barrier.</p>

      <h2>Continuous Quad-Bulb Compression Seals</h2>
      <p>Vitrava operable casement and awning windows feature four separate perimeter gasket barriers made of resilient EPDM synthetic rubber. Even under 50 MPH storm winds, the gaskets compress tightly, ensuring zero measurable air infiltration.</p>
    `
  },
  {
    slug: 'window-replacement-costs-guide',
    title: 'Window Replacement Costs & ROI: The Definitive Homeowner Guide',
    category: 'economics',
    categoryLabel: 'Economics & ROI',
    date: 'Sep 05, 2026',
    readTime: '8 min read',
    author: 'Marcus Vance',
    authorRole: 'Principal Window Architect',
    heroImg: 'assets/images/blog/replacement-costs-main.jpg',
    detailImg: 'assets/images/blog/replacement-costs-secondary.jpg',
    detailCaption: 'Fig 1.9 — Transparent line-item cost allocation, federal 25C Energy Tax Credit offsets, and empirical 74% home resale ROI.',
    summary: 'A transparent breakdown of custom window fabrication costs, installation labor factors, federal 25C tax credits, and real-world resale value returns.',
    content: `
      <h2>What Drives the Cost of Window Replacement?</h2>
      <p>Window replacement pricing is often shrouded in confusing marketing promotions and misleading "₹199 window" bait-and-switch claims. In reality, a quality commercial window replacement project comprises three transparent cost centers:</p>
      <ul>
        <li><strong>Custom Architectural Fabrication (55%):</strong> Custom structural composite frames, low-E silver sputtering, krypton or argon noble gas chambers, and heavy-duty stainless steel mechanical hardware.</li>
        <li><strong>AAMA Certified Master Installation (30%):</strong> Skilled in-house labor, surgical unit extraction, low-expansion foam insulation, custom aluminum exterior trim bending, and job-site debris disposal.</li>
        <li><strong>Warranty &amp; Service Protection (15%):</strong> Comprehensive non-prorated 25-year transferable warranty deed backing all components and installation workmanship.</li>
      </ul>

      <h2>Federal Energy Tax Credits: Save Up to ₹1,200</h2>
      <p>Under Section 25C of the Inflation Reduction Act, homeowners who install windows meeting Energy Star Most Efficient criteria are eligible for a 30% federal tax credit up to a maximum of ₹1,200 annually. All Vitrava Signature and Performance window packages qualify for this direct tax credit.</p>

      <h2>Return on Investment (ROI) &amp; Home Appraisal Value</h2>
      <p>According to the annual Remodeling Cost vs. Value Report, high-performance window replacement consistently delivers an immediate 68% to 74% return in increased home resale appraisal value. When combined with annual heating and cooling bill reductions of 25% to 42%, quality windows represent one of the highest-yielding home improvement investments available.</p>
    `
  }
];

// 1. Generate Blog Directory Page (blog.html)
function generateBlogDirectory() {
  const bodyContent = `
  <!-- Section 1: Blog Hero & Live Search -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 820px; margin-inline: auto; text-align: center;">
        <span class="badge badge-teal" style="margin-bottom: 1rem;">KNOWLEDGE HUB &amp; GUIDES</span>
        <h1 class="text-h1" style="margin-bottom: 1rem;">The Window Science &amp; Efficiency Hub</h1>
        <p class="text-lead" style="margin-bottom: 2rem;">
          In-depth technical guides, building science insights, and transparent homeowner advice from Vitrava architectural window engineers.
        </p>

        <!-- Live Search Bar -->
        <div style="position: relative; max-width: 600px; margin-inline: auto;">
          <input type="text" id="blog-search-input" class="form-input" placeholder="Search by topic, e.g. U-Factor, triple glazing, drafts, installation..." style="padding: 1rem 1.25rem; font-size: 1rem; border-radius: var(--radius-full); box-shadow: var(--shadow-sm);" aria-label="Search blog articles">
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: Filterable Articles Grid -->
  <section class="section-spacing">
    <div class="container-custom">
      <!-- Category Filter Pills -->
      <div style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 3rem;">
        <button type="button" data-blog-category="all" class="btn btn-secondary btn-sm active">All Articles (9)</button>
        <button type="button" data-blog-category="science" class="btn btn-secondary btn-sm">Energy Science</button>
        <button type="button" data-blog-category="buying-guide" class="btn btn-secondary btn-sm">Buying Guides</button>
        <button type="button" data-blog-category="installation" class="btn btn-secondary btn-sm">Installation &amp; Care</button>
        <button type="button" data-blog-category="economics" class="btn btn-secondary btn-sm">Cost &amp; Economics</button>
      </div>

      <!-- Articles Grid -->
      <div class="grid-3-col">
        ${articles.map((a) => `
        <article class="card-arch" data-article-category="${a.category}" style="display: flex; flex-direction: column;">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 9; margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden;">
            <img src="${a.heroImg}" alt="${a.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" loading="lazy">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge-accent">${a.categoryLabel}</span>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">${a.readTime}</span>
          </div>
          <h2 class="text-h3" style="margin-bottom: 0.75rem;"><a href="blog/${a.slug}.html" style="color: inherit;">${a.title}</a></h2>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; flex: 1;">
            ${a.summary}
          </p>
          <div style="border-top: 1px solid var(--color-border); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 0.8125rem; color: var(--color-text-muted);">
              By <strong style="color: var(--color-text-main);">${a.author.split(',')[0]}</strong> &bull; ${a.date}
            </div>
            <a href="blog/${a.slug}.html" class="btn btn-secondary btn-sm" style="font-weight: 700;">
              Read Article &rarr;
            </a>
          </div>
        </article>
        `).join('')}
      </div>

      <!-- Empty State -->
      <div id="blog-empty-state" style="display: none; text-align: center; padding: 4rem 1.5rem; background-color: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); margin-top: 2rem;">
        <h3 class="text-h3" style="margin-bottom: 0.5rem;">No matching articles found</h3>
        <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Try adjusting your search keywords or reset category filters.</p>
        <button type="button" id="blog-reset-filter" class="btn btn-primary btn-sm">Reset Search Filters</button>
      </div>
    </div>
  </section>

  <!-- Section 3: Consultation & Measurement CTA -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); text-align: center;">
    <div class="container-custom" style="max-width: 900px;">
      <h2 class="text-h2" style="margin-bottom: 1rem;">Put Window Science to Work for Your Home</h2>
      <p class="text-lead" style="margin-bottom: 2rem;">
        Schedule an in-home thermal audit and laser measurement consultation with a Vitrava specialist.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement</a>
        <a href="calculator.html" class="btn btn-secondary btn-lg">Calculate Your Savings</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Window Science, Efficiency & Installation Knowledge Hub',
    'Explore authoritative guides on energy-efficient window physics, double vs triple glazing, U-factor ratings, frame materials, and installation tips.',
    bodyContent,
    0,
    'blog'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'blog.html'), html, 'utf8');
}

// 2. Generate 9 Individual Blog Article Pages
function generateBlogArticlePages() {
  articles.forEach((a, idx) => {
    const depth = 1;
    const root = getRelRoot(depth);
    const relatedArticles = articles.filter((_, i) => i !== idx).slice(0, 3);

    const bodyContent = `
    <!-- Section 1: Article Header & Hero Photo -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
      <div class="container-custom" style="max-width: 980px;">
        <div style="margin-bottom: 1.5rem;">
          <span class="badge badge-teal" style="margin-bottom: 0.75rem;">${a.categoryLabel.toUpperCase()}</span>
          <h1 class="text-h1" style="margin-bottom: 1rem;">${a.title}</h1>
          <p class="text-lead" style="margin-bottom: 1.5rem;">${a.summary}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding-block: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background-color: var(--color-primary); color: #FFF; display: grid; place-items: center; font-weight: 700; font-size: 0.9rem;">
                ${a.author[0]}
              </div>
              <div>
                <div style="font-weight: 700; color: var(--color-text-main); font-size: 0.95rem;">${a.author}</div>
                <div style="font-size: 0.8125rem; color: var(--color-text-muted);">${a.authorRole}</div>
              </div>
            </div>
            <div style="font-size: 0.875rem; color: var(--color-text-muted); display: flex; gap: 1rem;">
              <span>Published: ${a.date}</span>
              <span>&bull;</span>
              <span>${a.readTime}</span>
            </div>
          </div>
        </div>

        <!-- Matching Hero Photo -->
        <div class="window-frame-wrapper" style="aspect-ratio: 16 / 9; margin-top: 2rem; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md);">
          <img src="${root}${a.heroImg}" alt="${a.title} editorial visual" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
    </section>

    <!-- Section 2: Article Main Content with Table of Contents -->
    <section class="section-spacing">
      <div class="container-custom" style="max-width: 980px;">
        <div class="card-flat" style="margin-bottom: 2.5rem; background-color: var(--color-card-muted);">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.5rem;">Article Table of Contents</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; color: var(--color-text-main);">
            <li>&bull; Architectural &amp; Building Science Principles</li>
            <li>&bull; Engineering Specifications &amp; Material Analysis</li>
            <li>&bull; Real-World Residential Energy Implications</li>
            <li>&bull; Vitrava Certified Installation Standard</li>
          </ul>
        </div>

        <div style="font-size: 1.05rem; line-height: 1.8; color: var(--color-text-main);">
          ${a.content}
        </div>
      </div>
    </section>

    <!-- Section 3: In-Depth Architectural Diagram (Second Distinct Image) -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom" style="max-width: 980px;">
        <div class="window-frame-wrapper" style="aspect-ratio: 16 / 9; margin-bottom: 1rem; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
          <img src="${root}${a.detailImg}" alt="${a.title} detailed visual" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); text-align: center; font-style: italic;">
          ${a.detailCaption || 'Technical and architectural benchmarks for Vitrava high-performance window assemblies.'}
        </p>
      </div>
    </section>

    <!-- Section 4: Key Takeaways Summary Box -->
    <section class="section-spacing">
      <div class="container-custom" style="max-width: 980px;">
        <div class="card-arch" style="border-inline-start: 5px solid var(--color-primary); padding: 2rem;">
          <h3 class="text-h3" style="margin-bottom: 1rem; color: var(--color-primary);">Key Takeaways for Homeowners</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.95rem; line-height: 1.6; color: var(--color-text-main);">
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} Always demand certified NFRC independent ratings rather than relying solely on manufacturer claims.</li>
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} In Northern climates, prioritize a low U-Factor (&le; 0.22) and tight air infiltration (&lt; 0.02 CFM/ft²).</li>
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} Professional installation with continuous closed-cell foam and sloped sill pans is essential for lasting performance.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Section 5: Author Bio & Related Articles -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom" style="max-width: 980px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-border);">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background-color: var(--color-primary); color: #FFF; display: grid; place-items: center; font-weight: 800; font-size: 1.25rem;">
              ${a.author[0]}
            </div>
            <div>
              <div style="font-weight: 700; color: var(--color-text-main); font-size: 1.05rem;">Written by ${a.author}</div>
              <div style="font-size: 0.875rem; color: var(--color-text-muted);">${a.authorRole} at Vitrava Windows</div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="navigator.clipboard?.writeText(window.location.href); VitravaToast?.show('Article URL copied to clipboard!', 'info');">
            Share / Copy Link
          </button>
        </div>

        <h3 class="text-h3" style="margin-bottom: 1.5rem;">Related Knowledge Hub Articles</h3>
        <div class="grid-3-col">
          ${relatedArticles.map((rel) => `
          <div class="card-flat" style="display: flex; flex-direction: column;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; margin-bottom: 0.35rem;">${rel.categoryLabel}</div>
            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; flex: 1;"><a href="${rel.slug}.html" style="color: inherit;">${rel.title}</a></h4>
            <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 1rem;">${rel.readTime}</div>
            <a href="${rel.slug}.html" style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.25rem;">
              Read Guide &rarr;
            </a>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 6: Consultation CTA -->
    <section class="section-spacing" style="text-align: center;">
      <div class="container-custom" style="max-width: 900px;">
        <h2 class="text-h2" style="margin-bottom: 1rem;">Have Questions About Your Windows?</h2>
        <p class="text-lead" style="margin-bottom: 2rem;">
          Schedule an in-home laser measurement and energy consultation with a Vitrava specialist today.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="${root}booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement</a>
          <a href="${root}calculator.html" class="btn btn-secondary btn-lg">Launch Energy Calculator</a>
        </div>
      </div>
    </section>
    `;

    const html = wrapHtml(
      `${a.title} | Vitrava Knowledge Hub`,
      a.summary,
      bodyContent,
      depth,
      'blog'
    );

    fs.writeFileSync(path.join(__dirname, '..', 'blog', `${a.slug}.html`), html, 'utf8');
  });
}

generateBlogDirectory();
generateBlogArticlePages();
console.log('Blog directory and 9 unique article pages generated successfully.');
