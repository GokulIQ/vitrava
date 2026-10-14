const fs = require('fs');
const path = require('path');
const { wrapHtml, ICONS, getRelRoot } = require('./builder-core');

const products = [
  {
    slug: 'casement',
    name: 'Casement Windows',
    style: 'Outward-Swinging Side-Hinged Sash',
    shortDesc: 'Engineered with 90-degree fold-away cranks and multi-point perimeter compression seals for industry-leading airtight thermal performance.',
    heroImg: 'assets/images/window-styles/casement-main.jpg',
    detailImg: 'assets/images/window-styles/casement-secondary.jpg',
    lead: 'The Vitrava Architectural Casement is our highest-performing operable window style. By utilizing a continuous rubber compression gasket that pulls tight against the frame when locked, it virtually eliminates air infiltration.',
    features: [
      { title: 'Concealed Multi-Point Locks', desc: 'Single-lever operation drives up to four stainless steel locking wedges simultaneously along the jamb.' },
      { title: '100% Top-to-Bottom Ventilation', desc: 'Sash opens a full 90 degrees to capture gentle exterior breezes and channel fresh air directly indoors.' },
      { title: 'Easy-Clean Washability', desc: 'Hinges pivot smoothly away from the jamb allowing effortless cleaning of exterior glass from inside your room.' },
      { title: 'Ultra-Slim Sightline Frame', desc: 'Reinforced composite structural frame maximizes daylit glass area while exceeding severe wind loads.' }
    ],
    specs: {
      uFactor: '0.16 (Triple) / 0.25 (Dual)',
      shgc: '0.21 – 0.27',
      airInfiltration: '< 0.01 CFM/ft²',
      stc: '36 STC (Acoustic Grade)',
      windLoad: 'DP-65 Structural',
      warranty: '25-Year Non-Prorated'
    },
    materials: 'Composite Fibrex structural core, exterior extruded aluminum cladding, interior solid timber or contemporary painted finish.',
    operation: 'Heavy-duty stainless steel dual-arm scissor operator with fold-away nesting handle that avoids interfering with interior window treatments.',
    applications: ['Living Rooms & Great Rooms', 'Kitchen Sink Sightlines', 'Bedrooms Requiring Egress', 'Windward Walls for Natural Cooling'],
    pricingEst: '₹880 – ₹1,280 installed per unit',
    faqs: [
      {
        q: 'Why are casement windows considered the most airtight operable window style?',
        a: 'Casement windows close with a continuous 360-degree perimeter compression gasket. When the multi-point cam locking system is engaged, the sash is pulled tight into the frame. Unlike sliding or double-hung windows where weatherstripping rubs against tracks, a casement compression seal has no friction gap, and seasonal winds actually push the sash tighter against the frame.'
      },
      {
        q: 'Can both interior and exterior glass be cleaned from inside the home?',
        a: 'Yes. Vitrava casement windows feature specialized 90-degree washability hinges. When fully cranked open, the hinged edge of the sash slides away from the jamb, creating a generous 4-inch gap that allows you to easily reach around and wipe down the exterior glass safely from inside your home.'
      },
      {
        q: 'Will the crank handle interfere with interior blinds or shutters?',
        a: 'No. Our casements are equipped with low-profile nesting fold-away crank handles. When not in active use, the handle folds flush into the hardware escutcheon plate, ensuring zero interference with plantation shutters, motorized roller shades, or cellular blinds.'
      },
      {
        q: 'Are Vitrava casement windows certified for bedroom emergency egress?',
        a: 'Yes. We custom manufacture egress-compliant casement sizes that meet International Residential Code (IRC) emergency escape requirements (minimum 20" clear opening width, 24" clear height, and 5.7 sq ft clear open area).'
      }
    ]
  },
  {
    slug: 'double-hung',
    name: 'Double-Hung Windows',
    tagline: 'Traditional Dual Sliding Sashes',
    style: 'Dual Vertical Sliding Sashes',
    shortDesc: 'A timeless American architectural design modernized with multi-chambered thermal insulation and effortless tilt-to-clean sashes.',
    heroImg: 'assets/images/window-styles/double-hung-main.jpg',
    detailImg: 'assets/images/window-styles/double-hung-secondary.jpg',
    lead: 'Our Modern Double-Hung balances classic architectural proportions with state-of-the-art thermal engineering. Both top and bottom sashes slide smoothly on stainless steel constant-force balance springs.',
    features: [
      { title: 'Dual-Sash Convective Cooling', desc: 'Open top and bottom sashes simultaneously: warm air exhausts through the top while cool air enters at bottom.' },
      { title: 'Easy Tilt-In Cleaning', desc: 'Both sashes tilt smoothly inward with fingertip release catches so you can safely clean outside glass from indoors.' },
      { title: 'Interlocking Meeting Rail', desc: 'Continuous composite tongue-and-groove meeting rail preventing drafts and rattling during seasonal wind gusts.' },
      { title: 'Integrated Night Latches', desc: 'Discreet vent latches allowing windows to remain open 3 inches for secure nighttime fresh air ventilation.' }
    ],
    specs: {
      uFactor: '0.18 (Triple) / 0.27 (Dual)',
      shgc: '0.22 – 0.28',
      airInfiltration: '< 0.05 CFM/ft²',
      stc: '34 STC',
      windLoad: 'DP-50 Structural',
      warranty: '25-Year Non-Prorated'
    },
    materials: 'Multi-chambered insulating composite frame with optional simulated divided-lite historic muntin grilles.',
    operation: 'Constant-force coil spring balances calibrated to sash weight for effortless one-finger vertical gliding without stickiness.',
    applications: ['Colonial & Craftsman Residences', 'Upper-Floor Bedrooms', 'Street-Facing Facades', 'Historic Conservation Districts'],
    pricingEst: '₹780 – ₹1,150 installed per unit',
    faqs: [
      {
        q: 'How does the tilt-in sash mechanism work for cleaning?',
        a: 'Both top and bottom sashes feature dual spring-loaded tilt latches on the top rail. Squeeze both latches inward simultaneously and the sash pivots smoothly 90 degrees inward like a tabletop, allowing you to clean the exterior glass safely from inside your home without ladders.'
      },
      {
        q: 'How do double-hung windows facilitate natural convective cooling?',
        a: 'By lowering the top sash slightly and raising the bottom sash slightly at the same time, natural thermal physics creates a gentle air siphon: hot, buoyant indoor air naturally escapes through the top aperture while cooler outdoor breeze is drawn into the bottom.'
      },
      {
        q: 'Will the sashes drop down unexpectedly or feel heavy to lift?',
        a: 'No. Unlike old counterweight-and-rope systems, Vitrava double-hung windows utilize calibrated stainless steel constant-force coil balances. These spring coils hold the sash weight in exact neutral equilibrium, providing effortless fingertip operation that never requires tension adjustments.'
      },
      {
        q: 'Can I install a window air conditioner in a Vitrava double-hung window?',
        a: 'Yes. Double-hung windows are the most versatile window style for window AC units or seasonal window fans. The reinforced composite lower sill rail and deep jamb pockets support AC brackets securely without voiding the frame warranty.'
      }
    ]
  },
  {
    slug: 'sliding',
    name: 'Horizontal Sliding Windows',
    tagline: 'Smooth Tandem Brass Rollers',
    style: 'Side-to-Side Glide Sash',
    shortDesc: 'Expansive contemporary horizontal openings featuring precision tandem brass rollers on an extruded aluminum sill runway.',
    heroImg: 'assets/images/window-styles/sliding-main.jpg',
    detailImg: 'assets/images/window-styles/sliding-secondary.jpg',
    lead: 'Ideal for contemporary spaces where projecting sashes might obstruct walkways, patios, or decks. Our sliding windows deliver expansive panoramic glass area with frictionless operation.',
    features: [
      { title: 'Tandem Brass Rollers', desc: 'Self-lubricating sealed tandem rollers gliding silently on a raised monorail track with zero binding.' },
      { title: 'Low-Profile Frame Design', desc: 'Engineered with clean architectural edges to maximize visible daylight and unobstructed garden views.' },
      { title: 'Multipoint Weep Drainage', desc: 'Integrated baffled weep chambers that channel driving rain safely outdoors while preventing air backdraft.' },
      { title: 'Lift-Out Sash Maintenance', desc: 'Interior operable sash lifts out effortlessly for deep cleaning or periodic hardware inspection.' }
    ],
    specs: {
      uFactor: '0.19 (Triple) / 0.28 (Dual)',
      shgc: '0.23 – 0.29',
      airInfiltration: '< 0.06 CFM/ft²',
      stc: '33 STC',
      windLoad: 'DP-50 Structural',
      warranty: '25-Year Non-Prorated'
    },
    materials: 'High-density composite frame reinforced with structural aluminum meeting stiles to prevent deflection over wide spans.',
    operation: 'Ergonomic side-rail cam locks that automatically latch securely when closed, paired with flush-mounted finger pulls.',
    applications: ['Modernist Suburban Homes', 'Patio & Deck Overlooks', 'Wide Horizontal Wall Openings', 'Basement Daylight Egress'],
    pricingEst: '₹820 – ₹1,220 installed per unit',
    faqs: [
      {
        q: 'Do sliding windows seal as tightly as outward-swinging casement windows?',
        a: 'While casement windows utilize compression gaskets, Vitrava horizontal sliders feature multi-fin plush weatherstripping, interlocking composite meeting stiles, and dual weep baffles that deliver an air infiltration rate below 0.06 CFM/ft² — far outperforming standard builder-grade sliders.'
      },
      {
        q: 'How do you clean the exterior glass of a sliding window?',
        a: 'The operable sash lifts upward and out of its track from inside the room with zero tools required, allowing you to clean both sides effortlessly. The stationary sash can be reached easily by sliding the operable sash open.'
      },
      {
        q: 'Will dirt or pet hair cause the roller track to jam or bind?',
        a: 'No. Vitrava sliders feature an elevated aluminum monorail track design that keeps the rolling surface raised above the sill floor where debris might collect. The tandem brass rollers are sealed against dust and self-clean as they travel.'
      },
      {
        q: 'When should an architect specify horizontal sliders over double-hung?',
        a: 'Sliders are ideal when the rough wall opening is wider than it is tall, and along outdoor living spaces (patios, decks, walkways) where an outward-projecting casement or awning sash would create an obstacle or safety hazard.'
      }
    ]
  },
  {
    slug: 'picture',
    name: 'Architectural Picture Windows',
    tagline: 'Expansive Fixed View Glass',
    style: 'Fixed Direct-Set High-Efficiency Glazing',
    shortDesc: 'Grand stationary windows providing maximum natural illumination, unobstructed vista framing, and the absolute highest thermal R-value.',
    heroImg: 'assets/images/window-styles/picture-main.jpg',
    detailImg: 'assets/images/window-styles/picture-secondary.jpg',
    lead: 'Because picture windows are completely fixed without moving sashes, they deliver the highest thermal insulation and airtightness in our entire catalog. Perfect for framing dramatic outdoor vistas.',
    features: [
      { title: 'Ultimate Thermal Performance', desc: 'Zero moving sashes means zero air infiltration leaks, delivering an extraordinary U-Factor down to 0.15.' },
      { title: 'Expansive Glass Spans', desc: 'Heavy-duty structural framing capable of supporting continuous insulated glass panels up to 60 sq ft.' },
      { title: 'Flawless Aesthetic Pairing', desc: 'Frame profiles engineered to align perfectly with adjacent operable casement and awning windows.' },
      { title: '99.4% Ultraviolet Filtration', desc: 'Triple-layer low-E silver coatings protecting valuable interior artwork, hardwood, and textiles from fading.' }
    ],
    specs: {
      uFactor: '0.15 (Triple Krypton) / 0.22 (Dual Argon)',
      shgc: '0.20 – 0.26',
      airInfiltration: '0.00 CFM/ft² (Completely Airtight)',
      stc: '38 STC (Studio Grade)',
      windLoad: 'DP-70 Commercial Grade',
      warranty: '25-Year Non-Prorated'
    },
    materials: 'Direct-set insulated glass unit sealed into heavy-wall structural composite frames with silicone structural glazing.',
    operation: 'Fixed stationary installation with zero operable hardware, eliminating mechanical wear and maintenance completely.',
    applications: ['Double-Height Great Rooms', 'Scenic Landscape Vistas', 'Dining Alcoves & Stairwells', 'Transom & Clerestory Accents'],
    pricingEst: '₹650 – ₹1,400 installed per unit',
    faqs: [
      {
        q: 'Why do architectural picture windows achieve the highest thermal efficiency?',
        a: 'Because picture windows have no operable sashes, meeting rails, or opening hinges, the insulated glass unit is bedded directly into structural silicone within the composite frame. This achieves an airtightness rating of 0.00 CFM/ft² and enables U-factors down to 0.15.'
      },
      {
        q: 'Can picture windows be combined with operable styles for fresh air?',
        a: 'Yes. Vitrava specializes in custom combination assemblies where a central picture window is flanked by matching casements, awnings, or sliders. The sightline profiles match exactly for seamless architectural harmony.'
      },
      {
        q: 'Will such large glass panes make my living room overheat in direct sunlight?',
        a: 'No. Vitrava picture windows feature triple-pane glass coated with three separate microscopic layers of silver Low-E. This transmits crystal-clear visible daylight while reflecting 79% of solar infrared heat energy away from your interior.'
      },
      {
        q: 'What is the largest dimension available for a custom picture window?',
        a: 'Vitrava manufactures custom architectural picture windows in single continuous panes up to 60 square feet (for example, 6 feet by 10 feet), reinforced with commercial-grade internal steel gussets.'
      }
    ]
  },
  {
    slug: 'bay-bow',
    name: 'Bay & Bow Windows',
    tagline: '30° & 45° Projection Angles',
    style: 'Multi-Angle Architectural Alcove Projection',
    shortDesc: 'Custom cantilevered 3-lite to 5-lite projecting assemblies transforming flat interior walls into sun-drenched architectural focal points.',
    heroImg: 'assets/images/window-styles/bay-bow-main.jpg',
    detailImg: 'assets/images/window-styles/bay-bow-secondary.jpg',
    lead: 'Add tangible square footage, panoramic natural lighting, and an inviting seating bench to your home. Our bay and bow windows feature insulated head and seat boards supported by high-tensile structural cables.',
    features: [
      { title: '30° & 45° Projection Angles', desc: 'Custom configured with central fixed picture window flanked by operable ventilating casements.' },
      { title: 'Insulated Head & Seat Boards', desc: 'Furniture-grade hardwood head and seat boards filled with R-9 closed-cell insulation to prevent cold floors.' },
      { title: 'High-Tensile Cable Support', desc: 'Concealed steel tieback cables anchored directly to roof framing studs, preventing sagging over decades.' },
      { title: 'Custom Window Seat Furniture', desc: 'Deep interior sill ledge perfect for upholstered reading benches, indoor plants, or dining tables.' }
    ],
    specs: {
      uFactor: '0.18 (Triple Glaze Core)',
      shgc: '0.22 – 0.28',
      airInfiltration: '< 0.03 CFM/ft²',
      stc: '35 STC',
      windLoad: 'DP-55 Structural',
      warranty: '25-Year Non-Prorated'
    },
    materials: 'Structural mullion connectors uniting custom composite window units, topped with custom copper or aluminum standing-seam rooflet.',
    operation: 'Operable flanking units feature casement or double-hung sash controls for dual-direction cross-ventilation breezes.',
    applications: ['Living Room Front Facades', 'Breakfast Nooks & Kitchens', 'Master Bedroom Reading Alcoves', 'Dining Rooms'],
    pricingEst: '₹2,400 – ₹4,800 installed per assembly',
    faqs: [
      {
        q: 'What is the structural difference between a Bay window and a Bow window?',
        a: 'A Bay window traditionally consists of three window lites: one large fixed picture window in the center flanked by two operable casement or double-hung units set at 30° or 45° projection angles. A Bow window consists of 4, 5, or 6 equally sized units arranged in a gentle, elegant architectural curve.'
      },
      {
        q: 'How does Vitrava prevent cold drafts under the bay window seat board?',
        a: 'Unlike cheap contractor assemblies made from bare plywood, Vitrava seat and head boards are crafted from furniture-grade oak or birch encasing high-density closed-cell R-9 insulation with an integrated vapor barrier. This ensures the seat remains warm and draft-free even in sub-zero winter temperatures.'
      },
      {
        q: 'How is the physical cantilevered weight supported?',
        a: 'We install concealed high-tensile stainless steel aircraft cables anchored directly into the structural top plate and ceiling joists of your home. This suspension system supports the cantilevered structure invisibly from above, completely eliminating the need for exterior diagonal braces.'
      },
      {
        q: 'What roofing options are available for the exterior canopy?',
        a: 'We offer custom architectural standing-seam copper rooflets, matching colored aluminum canopy caps, or custom framing ready for architectural shingles to blend seamlessly into your existing home facade.'
      }
    ]
  },
  {
    slug: 'awning',
    name: 'Top-Hinged Awning Windows',
    tagline: 'Rainproof Breeze Ventilation',
    style: 'Top-Hinged Outward Cantilever Sash',
    shortDesc: 'Designed to pivot outward from the top, creating a protective glass awning that allows fresh air ventilation even during rain showers.',
    heroImg: 'assets/images/window-styles/awning-main.jpg',
    detailImg: 'assets/images/window-styles/awning-secondary.jpg',
    lead: 'Enjoy fresh outdoor breezes without worrying about surprise rainstorms. The Vitrava Awning Window sash acts as a protective umbrella, deflecting water outward while circulating fresh air.',
    features: [
      { title: 'All-Weather Rain Ventilation', desc: 'Top-hinged cantilever geometry lets you keep windows comfortably open during light or heavy rainfall.' },
      { title: 'Perimeter Bulb Compression', desc: 'Dual continuous silicone compression gaskets provide an airtight thermal seal when cranked shut.' },
      { title: 'High-Wall Privacy Placement', desc: 'Ideal for high bathroom and kitchen wall placements where privacy and ventilation are both essential.' },
      { title: 'Smooth Dual-Arm Operator', desc: 'Heavy-duty zinc alloy rotogear crank mechanism providing effortless opening with minimal turns.' }
    ],
    specs: {
      uFactor: '0.17 (Triple) / 0.26 (Dual)',
      shgc: '0.21 – 0.27',
      airInfiltration: '< 0.02 CFM/ft²',
      stc: '35 STC',
      windLoad: 'DP-60 Structural',
      warranty: '25-Year Non-Prorated'
    },
    materials: 'Multi-cavity composite frame with stainless steel scissor arms and corrosion-resistant marine-grade hardware.',
    operation: 'Compact folding nesting handle with dual locking cam levers along the bottom frame rail for tight compression.',
    applications: ['Modern Spa Bathrooms', 'Kitchen Backsplashes', 'Basement Garden Wells', 'Transom Accents Above Entry Doors'],
    pricingEst: '₹790 – ₹1,180 installed per unit',
    faqs: [
      {
        q: 'Can awning windows truly be left open during heavy rain?',
        a: 'Yes. Because the hinge is located at the top of the frame and the sash pushes outward from the bottom, the glass pane forms a natural pitched awning that sheds raindrops harmlessly away from the interior opening while fresh breeze circulates freely underneath.'
      },
      {
        q: 'Where are awning windows most advantageous in a floorplan?',
        a: 'Awning windows are ideal for high placement on bathroom and master bedroom walls, offering complete privacy while allowing hot, humid air to escape. They are also exceptionally popular above kitchen counters and mulled under large picture windows.'
      },
      {
        q: 'How does the locking and sealing mechanism work?',
        a: 'Vitrava awning windows utilize dual multi-point cam locks located along the bottom rail. When engaged, the mechanism pulls the bottom and sides of the sash into continuous silicone compression bulb seals, achieving an air leakage rate under 0.02 CFM/ft².'
      },
      {
        q: 'Is the crank operator easy to reach when installed high on a wall?',
        a: 'Yes. The rotary crank handle is positioned at the very bottom center of the window frame. For especially high transom placements, we also offer motorized remote-control operators that link to smart home thermostats.'
      }
    ]
  }
];

// 1. Generate Products Directory Page (products.html)
function generateProductsDirectory() {
  const bodyContent = `
  <!-- Section 1: Catalog Hero with Notice of Services Integration -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="max-width: 840px; margin-inline: auto; text-align: center;">
        <div style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
          <span class="badge badge-teal">ARCHITECTURAL WINDOW CATALOG</span>
          <span class="badge badge-citron">ALL 6 STYLES</span>
        </div>
        <h1 class="text-h1" style="margin-bottom: 1rem;">Energy-Efficient Window Styles</h1>
        <p class="text-lead" style="margin-bottom: 1.5rem;">
          Six distinct architectural window profiles engineered with triple-pane thermal glass, airtight compression seals, and bespoke frame finishes.
        </p>
        <div style="background-color: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem 1.5rem; display: inline-flex; align-items: center; gap: 1rem; flex-wrap: wrap; justify-content: center;">
          <span style="font-size: 0.925rem; color: var(--color-text-main); font-weight: 600;">Looking for our complete installation services &amp; styles?</span>
          <a href="services.html#window-styles" class="btn btn-primary btn-sm">Explore on Services Page &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: Products Grid (6 Styles) -->
  <section class="section-spacing">
    <div class="container-custom">
      <div class="grid-3-col">
        ${products.map((p, idx) => `
        <div class="card-arch" style="display: flex; flex-direction: column;">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.5rem;">
            <img src="${p.heroImg}" alt="${p.name} architectural window" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge-accent">STYLE 0${idx + 1}</span>
            <span style="font-size: 0.8125rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">U-Factor ${p.specs.uFactor.split(' ')[0]}</span>
          </div>
          <h2 class="text-h3" style="margin-bottom: 0.35rem;"><a href="products/${p.slug}.html" style="color: inherit;">${p.name}</a></h2>
          <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-primary); margin-bottom: 0.75rem;">${p.style}</div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; flex: 1;">
            ${p.shortDesc}
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <span class="badge badge-muted">${p.specs.stc}</span>
            <span class="badge badge-muted">Air Inf: ${p.specs.airInfiltration}</span>
          </div>
          <div style="border-top: 1px solid var(--color-border); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <a href="products/${p.slug}.html" class="btn btn-secondary btn-sm" style="font-weight: 700;">
              View Details &amp; Specs &rarr;
            </a>
            <a href="quote.html" class="btn btn-outline btn-sm">Get Quote</a>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section 3: Interactive Style Comparison Matrix -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="text-align: center; max-width: 760px; margin-inline: auto; margin-bottom: 3rem;">
        <span class="badge badge-citron" style="margin-bottom: 0.75rem;">SIDE-BY-SIDE MATRIX</span>
        <h2 class="text-h2">Window Styles Comparison</h2>
        <p style="color: var(--color-text-muted);">Compare ventilation, air-leakage rates, and architectural best-fits at a glance.</p>
      </div>
      <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table style="width: 100%; border-collapse: collapse; text-align: start; min-width: 650px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--color-border); color: var(--color-text-main); font-size: 0.9rem;">
              <th style="padding: 1rem; text-align: start;">Window Style</th>
              <th style="padding: 1rem; text-align: start;">Ventilation</th>
              <th style="padding: 1rem; text-align: start;">Air Infiltration</th>
              <th style="padding: 1rem; text-align: start;">Sound Insulation</th>
              <th style="padding: 1rem; text-align: start;">Best Fit Location</th>
            </tr>
          </thead>
          <tbody style="font-size: 0.9rem; color: var(--color-text-muted);">
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 1rem; font-weight: 700; color: var(--color-text-main);">Casement</td>
              <td style="padding: 1rem;">100% Opening</td>
              <td style="padding: 1rem; color: var(--color-primary); font-weight: 600;">&lt; 0.01 CFM/ft² (Best)</td>
              <td style="padding: 1rem;">36 STC</td>
              <td style="padding: 1rem;">Windward rooms &amp; kitchen sinks</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 1rem; font-weight: 700; color: var(--color-text-main);">Double-Hung</td>
              <td style="padding: 1rem;">Top &amp; bottom 50%</td>
              <td style="padding: 1rem;">&lt; 0.05 CFM/ft²</td>
              <td style="padding: 1rem;">34 STC</td>
              <td style="padding: 1rem;">Traditional facades &amp; bedrooms</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 1rem; font-weight: 700; color: var(--color-text-main);">Horizontal Sliding</td>
              <td style="padding: 1rem;">Side opening 50%</td>
              <td style="padding: 1rem;">&lt; 0.06 CFM/ft²</td>
              <td style="padding: 1rem;">33 STC</td>
              <td style="padding: 1rem;">Patios, walkways &amp; modern vistas</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 1rem; font-weight: 700; color: var(--color-text-main);">Picture</td>
              <td style="padding: 1rem;">Fixed (0%)</td>
              <td style="padding: 1rem; color: var(--color-primary); font-weight: 600;">0.00 CFM/ft² (Airtight)</td>
              <td style="padding: 1rem;">38 STC</td>
              <td style="padding: 1rem;">Great rooms &amp; panoramic views</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 1rem; font-weight: 700; color: var(--color-text-main);">Bay &amp; Bow</td>
              <td style="padding: 1rem;">Cross-ventilation sashes</td>
              <td style="padding: 1rem;">&lt; 0.03 CFM/ft²</td>
              <td style="padding: 1rem;">35 STC</td>
              <td style="padding: 1rem;">Front living rooms &amp; dining alcoves</td>
            </tr>
            <tr>
              <td style="padding: 1rem; font-weight: 700; color: var(--color-text-main);">Awning</td>
              <td style="padding: 1rem;">Bottom-outward 45%</td>
              <td style="padding: 1rem; color: var(--color-primary); font-weight: 600;">&lt; 0.02 CFM/ft²</td>
              <td style="padding: 1rem;">35 STC</td>
              <td style="padding: 1rem;">Rainy climates &amp; high bathroom walls</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Section 4: Materials & Glazing Innovation -->
  <section class="section-spacing">
    <div class="container-custom">
      <div class="grid-2-col-split">
        <div>
          <span class="badge badge-accent" style="margin-bottom: 1rem;">THERMAL TECHNOLOGY</span>
          <h2 class="text-h2" style="margin-bottom: 1.25rem;">Why Vitrava Frames Never Warp, Rot, or Weaken</h2>
          <p style="color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem;">
            Conventional vinyl windows warp under direct solar heat, while wood frames rot from moisture. Vitrava windows utilize a proprietary structural composite blend of thermoplastic polymer and reclaimed wood fibers.
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem;">
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} <strong>2x Stronger than Vinyl:</strong> Allows significantly slimmer frame profiles with expansive glass.</li>
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} <strong>Thermal Expansion Matching:</strong> Expands and contracts at the exact same rate as glass, protecting seals.</li>
            <li style="display: flex; gap: 0.75rem;">${ICONS.check} <strong>Zero Repainting:</strong> Color is factory-extruded through the material core; will not peel or flake.</li>
          </ul>
        </div>
        <div class="window-frame-wrapper" style="aspect-ratio: 4 / 3;">
          <img src="assets/images/products/product-casement-2.jpg" alt="Vitrava structural composite window frame" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5: Consultation CTA -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); text-align: center;">
    <div class="container-custom" style="max-width: 900px;">
      <h2 class="text-h2" style="margin-bottom: 1rem;">Find the Perfect Style for Your Architecture</h2>
      <p class="text-lead" style="margin-bottom: 2rem;">
        Schedule a complimentary measurement consultation. We bring physical frame and glazing samples right to your living room.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement</a>
        <a href="calculator.html" class="btn btn-secondary btn-lg">Calculate Energy Savings</a>
        <a href="services.html" class="btn btn-outline btn-lg">Explore Services</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Energy-Efficient Window Styles & Products',
    'Explore Vitrava replacement window catalog: casement, double-hung, horizontal sliding, architectural picture, bay/bow, and awning windows.',
    bodyContent,
    0,
    'services'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'products.html'), html, 'utf8');
}

// 2. Generate 6 Individual Product Detail Pages (Strictly <= 7 sections per page)
function generateProductDetailPages() {
  products.forEach((p) => {
    const depth = 1;
    const root = getRelRoot(depth);

    const bodyContent = `
    <!-- Section 1: Product Hero & Interactive Option Configurator -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
      <div class="container-custom">
        <div class="hero-grid-split">
          <div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
              <span class="badge badge-teal">${p.style}</span>
              <span class="badge badge-citron">NFRC CERTIFIED</span>
            </div>
            <h1 class="text-h1" style="margin-bottom: 1rem;">${p.name}</h1>
            <p class="text-lead" style="margin-bottom: 1.75rem;">${p.lead}</p>

            <div class="product-summary-card" aria-label="${p.name} performance overview">
              <div class="product-summary-card__eyebrow">PERFORMANCE SNAPSHOT</div>
              <h2 class="text-h3">Made to fit. Built to perform.</h2>
              <p class="product-summary-card__description">See the thermal, acoustic, and warranty details for this window style. Our team can help tailor a configuration to your home and priorities.</p>
              <div class="product-summary-card__specs">
                <div class="product-summary-card__spec">
                  <span>U-Factor</span>
                  <strong>${p.specs.uFactor}</strong>
                </div>
                <div class="product-summary-card__spec">
                  <span>Sound rating</span>
                  <strong>${p.specs.stc}</strong>
                </div>
                <div class="product-summary-card__spec">
                  <span>Warranty</span>
                  <strong>${p.specs.warranty}</strong>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="${root}booking.html" class="btn btn-primary btn-lg">Book Free Measurement</a>
              <a href="${root}quote.html" class="btn btn-secondary btn-lg">Request Custom Quote</a>
            </div>
          </div>
          <div class="hero-image-frame">
            <img src="${root}${p.heroImg}" alt="${p.name} primary photo" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Features & Architectural Advantages -->
    <section class="section-spacing">
      <div class="container-custom">
        <div style="text-align: center; max-width: 700px; margin-inline: auto; margin-bottom: 3.5rem;">
          <span class="badge badge-accent" style="margin-bottom: 0.75rem;">KEY HIGHLIGHTS</span>
          <h2 class="text-h2">Engineered For Decades of Effortless Use</h2>
        </div>
        <div class="grid-4-col">
          ${p.features.map((f) => `
          <div class="card-flat">
            <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
              ${ICONS.leaf}
            </div>
            <h3 class="text-h4" style="margin-bottom: 0.5rem;">${f.title}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">${f.desc}</p>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 3: Hardware Engineering & Secondary Photo Showcase -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom">
        <div class="grid-2-col">
          <div class="hero-image-frame">
            <img src="${root}${p.detailImg}" alt="${p.name} hardware and engineering detail" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <span class="badge badge-citron" style="margin-bottom: 1rem;">HARDWARE &amp; MECHANICS</span>
            <h2 class="text-h2" style="margin-bottom: 1.25rem;">Commercial Precision Hardware</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 1.5rem; line-height: 1.65;">
              ${p.operation}
            </p>
            <div style="background-color: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
              <div style="font-weight: 700; color: var(--color-text-main); margin-bottom: 0.25rem;">Frame Composite Material</div>
              <div style="color: var(--color-text-muted); font-size: 0.9rem;">${p.materials}</div>
            </div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
              <li style="display: flex; gap: 0.5rem; font-size: 0.9375rem;">${ICONS.check} Tested to 20,000 continuous opening cycles without mechanical play.</li>
              <li style="display: flex; gap: 0.5rem; font-size: 0.9375rem;">${ICONS.check} Marine-grade corrosion-resistant stainless steel linkage bars.</li>
              <li style="display: flex; gap: 0.5rem; font-size: 0.9375rem;">${ICONS.check} Concealed hinge tracks preventing exterior insect entry and dirt accumulation.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Thermal Performance & Specifications Matrix -->
    <section class="section-spacing">
      <div class="container-custom">
        <div class="grid-2-col">
          <div>
            <span class="badge badge-teal" style="margin-bottom: 1rem;">NFRC CERTIFIED MATRIX</span>
            <h2 class="text-h2" style="margin-bottom: 1.25rem;">Thermal &amp; Acoustic Ratings</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 1.75rem; line-height: 1.65;">
              All ratings are verified under National Fenestration Rating Council (NFRC) testing standards and exceed Energy Star Northern Climate efficiency mandates.
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="metric-box">
                <span class="metric-label">U-Factor</span>
                <span style="font-size: 1.15rem; font-weight: 700; color: var(--color-primary); font-family: var(--font-mono);">${p.specs.uFactor}</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">Solar Heat Gain (SHGC)</span>
                <span style="font-size: 1.15rem; font-weight: 700; color: var(--color-text-main); font-family: var(--font-mono);">${p.specs.shgc}</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">Air Infiltration Rate</span>
                <span style="font-size: 1.15rem; font-weight: 700; color: var(--color-primary); font-family: var(--font-mono);">${p.specs.airInfiltration}</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">Acoustic Sound Rating</span>
                <span style="font-size: 1.15rem; font-weight: 700; color: var(--color-text-main); font-family: var(--font-mono);">${p.specs.stc}</span>
              </div>
            </div>
          </div>

          <!-- Suitable Home Applications List -->
          <div class="card-arch">
            <h3 class="text-h3" style="margin-bottom: 1rem;">Ideal Room Applications</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
              Where architects recommend specifying ${p.name.toLowerCase()} in residential floorplans:
            </p>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.75rem;">
              ${p.applications.map((app) => `
              <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; font-weight: 600;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-primary);"></span>
                ${app}
              </li>
              `).join('')}
            </ul>
            <div style="border-top: 1px solid var(--color-border); padding-top: 1rem;">
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Estimated Installed Pricing:</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">${p.pricingEst}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Style-Specific Frequently Asked Questions Accordion -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom" style="max-width: 980px;">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span class="badge badge-citron" style="margin-bottom: 0.75rem;">STYLE FAQs</span>
          <h2 class="text-h2">Questions About ${p.name}</h2>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Key architectural and operational insights for this window style.</p>
        </div>
        <div data-accordion-single="true">
          ${p.faqs.map((f, i) => `
          <div class="accordion-item ${i === 0 ? 'is-open' : ''}">
            <button class="accordion-trigger" aria-expanded="${i === 0 ? 'true' : 'false'}">
              <span>${f.q}</span>
              <span class="accordion-icon">${ICONS.chevronDown}</span>
            </button>
            <div class="accordion-content">
              <div class="accordion-body">
                ${f.a}
              </div>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 6: Care & Operation Guidelines -->
    <section class="section-spacing">
      <div class="container-custom" style="max-width: 980px;">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span class="badge badge-teal" style="margin-bottom: 0.75rem;">LIFETIME EASE</span>
          <h2 class="text-h2">Care &amp; Maintenance Guidelines</h2>
        </div>
        <div class="grid-2-col">
          <div class="card-flat">
            <h4 style="font-weight: 700; margin-bottom: 0.5rem; color: var(--color-primary);">Semi-Annual Cleaning</h4>
            <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6;">
              Wipe composite frames and low-E glass with warm water and mild dish soap. Never use abrasive scrubbers, razor blades, or caustic chemical solvents.
            </p>
          </div>
          <div class="card-flat">
            <h4 style="font-weight: 700; margin-bottom: 0.5rem; color: var(--color-primary);">Hardware Lubrication</h4>
            <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6;">
              Apply dry silicone spray lubricant to tracks, pivot hinges, and operator gears once every 12 to 18 months for silky gliding movement.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 7: Consultation & Estimate CTA -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); text-align: center;">
      <div class="container-custom" style="max-width: 900px;">
        <h2 class="text-h2" style="margin-bottom: 1rem;">Custom Fabricated to Your Exact Window Openings</h2>
        <p class="text-lead" style="margin-bottom: 2rem;">
          Request a personalized in-home quote for Vitrava ${p.name}. Includes free laser measurement and our 25-Year non-prorated warranty bond.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="${root}booking.html" class="btn btn-primary btn-lg">Schedule Free Measurement</a>
          <a href="${root}quote.html" class="btn btn-secondary btn-lg">Request Line-Item Quote</a>
          <a href="${root}services.html#window-styles" class="btn btn-outline btn-lg">View All Styles</a>
        </div>
      </div>
    </section>
    `;

    const html = wrapHtml(
      `${p.name} — Vitrava Energy-Efficient Replacement Windows`,
      `${p.shortDesc} Triple-pane low-E glass, U-factor ${p.specs.uFactor}, and 25-year non-prorated warranty.`,
      bodyContent,
      depth,
      'services'
    );

    fs.writeFileSync(path.join(__dirname, '..', 'products', `${p.slug}.html`), html, 'utf8');
  });
}

generateProductsDirectory();
generateProductDetailPages();
console.log('Products directory and 6 unique detail pages generated successfully.');
