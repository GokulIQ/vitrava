const fs = require('fs');
const path = require('path');
const { wrapHtml, ICONS, getRelRoot } = require('./builder-core');

const services = [
  {
    slug: 'residential-replacement',
    title: 'Residential Window Replacement',
    tagline: 'Turnkey Whole-Home Transformation',
    shortDesc: 'Turnkey full-frame and insert window replacement engineered to elevate residential thermal comfort, eliminate convective drafts, and reduce heating loads.',
    heroImg: 'assets/images/services/residential-replacement-main.jpg',
    detailImg: 'assets/images/services/residential-replacement-secondary.jpg',
    lead: 'Our residential replacement service is tailored for homeowners seeking uncompromising thermal performance, enhanced natural daylighting, and substantial reductions in annual energy expenditure.',
    benefits: [
      { title: 'Convective Draft Elimination', desc: 'Continuous EPDM perimeter compression gaskets and warm-edge spacer bars ensure zero cold air leakage.' },
      { title: 'Up to 74% Heat Transfer Reduction', desc: 'Dual and triple-pane krypton/argon thermal insulation exceeding Energy Star Northern climate mandates.' },
      { title: 'Acoustic Sound Dampening', desc: 'Asymmetric acoustic laminate glass reducing exterior traffic and neighborhood drone by up to 14 dB.' },
      { title: 'Preserved Architectural Character', desc: 'Custom frame depths and interior jamb profiles designed to harmonize seamlessly with existing millwork.' }
    ],
    process: [
      { step: '01', title: 'Architectural Consultation', desc: 'In-home survey assessing existing envelope thermal leakage, sun exposure, and preferred aesthetic finishes.' },
      { step: '02', title: 'Laser-Calibrated Sizing', desc: 'Sub-millimeter 3-point digital measurement of all rough openings to guarantee exact factory fabrication.' },
      { step: '03', title: 'AAMA 2400 Installation', desc: 'Removal of old units, inspection of structural rough frames, low-expansion foam air sealing, and waterproof flashing.' },
      { step: '04', title: 'Quality Signoff & Warranty Handover', desc: 'Multipoint sash balance verification, exterior seal inspection, and issuance of our 25-Year transferable warranty deed.' }
    ],
    technical: [
      { label: 'Air Infiltration Rating', value: '< 0.02 CFM/ft² (Exceeds Industry Standard by 8x)' },
      { label: 'Thermal Transmittance (U-Factor)', value: '0.16 – 0.22 BTU/(hr·ft²·°F)' },
      { label: 'Solar Heat Gain Coefficient (SHGC)', value: '0.21 – 0.28 (Optimized by Climate Zone)' },
      { label: 'Structural Wind Load Rating', value: 'DP-50 to DP-70 Commercial Grade' }
    ],
    pricing: 'Typical residential window replacements range from ₹750 to ₹1,450 per unit installed, depending on chosen glazing package (dual vs triple pane), frame finish, and architectural sizing. Full financing options available starting at 0% APR for 18 months.',
    faqs: [
      { q: 'How long does a whole-home window replacement project take?', a: 'Most residential installations involving 12 to 25 windows are fully completed within 1 to 2 consecutive days. Our crews install room-by-room, sealing each opening immediately to prevent weather exposure.' },
      { q: 'Can you replace windows during winter or cold weather?', a: 'Yes. Vitrava master crews use cold-weather thermal containment protocols, installing one window at a time with closed interior doors so heat loss is negligible.' },
      { q: 'Will my interior drywall or window sills be damaged?', a: 'Our certified installers use precision extraction techniques to preserve existing casing, sills, and drywall returns wherever possible.' },
      { q: 'Do these windows qualify for federal energy tax credits?', a: 'Yes. Vitrava Signature Triple-Pane and Performance Dual-Pane windows meet Energy Star Most Efficient criteria, qualifying for the 25C Energy Tax Credit (up to ₹1,200).' }
    ]
  },
  {
    slug: 'energy-assessment',
    title: 'Energy Efficiency Assessment',
    tagline: 'FLIR Thermal Heat Leak Diagnostics',
    shortDesc: 'Comprehensive building envelope audit utilizing calibrated FLIR thermography and digital pressure manometers to identify hidden window air leakage.',
    heroImg: 'assets/images/services/energy-assessment-main.jpg',
    detailImg: 'assets/images/services/energy-assessment-secondary.jpg',
    lead: 'Before replacing a single window, our certified building science technicians quantify exactly where your home is losing expensive conditioned air and how much money new windows will save you.',
    benefits: [
      { title: 'Radiometric Thermal Imaging', desc: 'High-resolution FLIR infrared scans visually uncovering invisible convective thermal leaks and edge seal failure.' },
      { title: 'Quantified Air Infiltration Testing', desc: 'Blower door depressurization measuring whole-house air changes per hour (ACH50) attributable to windows.' },
      { title: 'Customized ROI Prioritization', desc: 'Itemized priority report showing which windows have the highest thermal deficit and fastest payback.' },
      { title: 'Utility Rebate Qualification', desc: 'Official documentation required to claim local electric and gas utility efficiency cash rebates.' }
    ],
    process: [
      { step: '01', title: 'Interior Baseline Walkthrough', desc: 'Inspection of all existing window frames, glass seals, meeting rails, and weatherstripping elasticity.' },
      { step: '02', title: 'Thermographic Infrared Scan', desc: 'Mapping exterior and interior surface temperatures to detect thermal bridging and insulation voids.' },
      { step: '03', title: 'Depressurization Diagnostics', desc: 'Measuring air leakage velocity around window sashes using an aerodynamic smoke pencil and manometer.' },
      { step: '04', title: 'Comprehensive Thermal Report', desc: 'Delivery of our detailed Vitrava Energy Report with transparent rupee savings projections and upgrade options.' }
    ],
    technical: [
      { label: 'Thermal Sensor Sensitivity', value: '< 0.04°C (Detects micro-thermal bridges)' },
      { label: 'Diagnostic Standard', value: 'RESNET / BPI-1200 Building Science Protocol' },
      { label: 'Audit Output', value: 'Full Color Radiometric Thermogram Report' },
      { label: 'Cost Credit', value: '100% credited toward your window replacement order' }
    ],
    pricing: 'Stand-alone diagnostic energy assessments are priced at ₹250. However, this fee is 100% credited toward your window replacement project upon order approval.',
    faqs: [
      { q: 'What is the ideal temperature difference for a thermal audit?', a: 'A difference of at least 18°F to 20°F between indoor and outdoor air provides the sharpest thermographic contrast for detecting window insulation bypass.' },
      { q: 'How long does an in-home thermal assessment take?', a: 'A typical 2,500 sq ft home evaluation takes approximately 60 to 90 minutes to complete thoroughly.' },
      { q: 'Will I receive a copy of the thermal photos?', a: 'Yes. You receive a complete digital PDF report with full-color thermal images, leakage calculations, and prioritized replacement recommendations.' },
      { q: 'Is the audit mandatory before buying windows?', a: 'It is completely optional, though highly recommended if you want verified empirical data on your home’s existing window energy waste.' }
    ]
  },
  {
    slug: 'custom-measurement',
    title: 'Custom Window Measurement',
    tagline: 'Sub-Millimeter Laser Opening Survey',
    shortDesc: 'A perfect installation begins with perfect measurements. Our technicians capture three-point width, height, diagonal, and sill rebate angles with digital laser accuracy.',
    heroImg: 'assets/images/services/custom-measurement-main.jpg',
    detailImg: 'assets/images/services/custom-measurement-secondary.jpg',
    lead: 'There is no such thing as a standard window in an existing home. Our custom measurement protocol eliminates guesswork, ensuring your new Vitrava windows fit snugly with optimal expansion gaps.',
    benefits: [
      { title: 'Sub-Millimeter Accuracy', desc: 'Class II digital laser rangefinders eliminating tape sag and human transcription error.' },
      { title: '3-Point Opening Survey', desc: 'Measuring width and height across top, middle, and bottom to detect out-of-square wall framing.' },
      { title: 'Wall Cavity Depth Verification', desc: 'Analyzing interior drywall return depths and exterior siding reveals for perfect flush aesthetics.' },
      { title: 'Structural Header Inspection', desc: 'Verifying load-bearing header integrity and sill plate soundness prior to custom factory fabrication.' }
    ],
    process: [
      { step: '01', title: 'Opening Preparation', desc: 'Removing interior stops or trim covers where necessary to access the true rough frame framing.' },
      { step: '02', title: 'Laser Triangulation', desc: 'Capturing exact width, height, and cross-diagonal dimensions to check for wall settlement or racking.' },
      { step: '03', title: 'Profile & Casing CAD Record', desc: 'Recording exact sill slope angle and casing reveal depth into our mobile architectural specification tablet.' },
      { step: '04', title: 'Factory Order Verification', desc: 'Direct digital transmission to Vitrava automated manufacturing lines with zero transcription loss.' }
    ],
    technical: [
      { label: 'Measurement Tolerance', value: '± 1/16 inch (1.5 mm)' },
      { label: 'Sill Slope Accuracy', value: 'Digital inclinometer within 0.1°' },
      { label: 'Squareness Tolerance', value: 'Diagonal delta checked to 1/32"' },
      { label: 'Guarantee', value: '100% Guaranteed Custom Factory Fit' }
    ],
    pricing: 'Our Custom Window Measurement service is provided 100% free of charge as part of our initial consultation and quoting process.',
    faqs: [
      { q: 'Do I need to be home for the measurement appointment?', a: 'Yes, because our measurement specialists need access to the interior of each room to measure the true window jamb openings.' },
      { q: 'Do I need to take down my blinds or curtains before the specialist arrives?', a: 'Having easy access to window frames is helpful. If heavy blinds are in place, our specialist can assist in gently unhooking them.' },
      { q: 'Why can’t I just measure my own windows?', a: 'Factory replacement windows require subtractive clearances for expanding foam, shimming, and sill pan flashings. Measuring only the visible glass will lead to custom-built windows that do not fit.' },
      { q: 'What happens if a custom-built window does not fit?', a: 'Because Vitrava specialists perform the measurements, we take 100% liability. If a window fails to fit, we refabricate it at zero cost to you.' }
    ]
  },
  {
    slug: 'professional-installation',
    title: 'Master Certified Installation',
    tagline: 'AAMA 2400 Structural Anchoring',
    shortDesc: 'A high-performance window is only as good as its installation. Our in-house certified master craftsmen follow strict structural anchoring, shimming, and sealing protocols.',
    heroImg: 'assets/images/services/certified-installation-main.jpg',
    detailImg: 'assets/images/services/certified-installation-secondary.jpg',
    lead: 'We never subcontract your project to third-party laborers. Every Vitrava window is installed by our own factory-trained, background-checked master technicians adhering to AAMA 2400 installation standards.',
    benefits: [
      { title: 'Zero Subcontractors', desc: '100% installed by certified Vitrava master technicians with average 12+ years window craftsmanship.' },
      { title: 'Structural Framing Fastening', desc: 'Corrosion-proof GRK structural screws fastened directly into framing studs, never into weak drywall.' },
      { title: 'Precision Composite Shimming', desc: 'Rot-proof synthetic shims that will not swell, crack, or compress under decades of heavy wind load.' },
      { title: 'White-Glove Home Care', desc: 'Protective neoprene floor runners, HEPA vacuum dust capture, and complete job site cleanup.' }
    ],
    process: [
      { step: '01', title: 'Home & Floor Protection', desc: 'Laying clean drop cloths and floor runners across all entryways, staircases, and work zones.' },
      { step: '02', title: 'Surgical Unit Removal', desc: 'Carefully extracting old windows without marring surrounding paint, interior trim, or exterior siding.' },
      { step: '03', title: 'Level, Plumb & Square Shimming', desc: 'Securing the new frame using laser levels to ensure effortless sash movement and tight gasket contact.' },
      { step: '04', title: 'Final Inspection & Cleanup', desc: 'Wiping down glass, testing every latch and lock, and hauling away all old window materials for recycling.' }
    ],
    technical: [
      { label: 'Installation Standard', value: 'AAMA 2400 / ASTM E2112 Architectural Protocol' },
      { label: 'Fastener Type', value: 'Corrosion-resistant heavy-gauge structural screws' },
      { label: 'Shim Material', value: 'Non-decaying synthetic composite' },
      { label: 'Workmanship Warranty', value: '25-Year Non-Prorated Coverage' }
    ],
    pricing: 'Installation labor and all professional weatherproofing consumables are always bundled transparently into our project quotations with zero hidden surprises or day-of upcharges.',
    faqs: [
      { q: 'Who performs the installation?', a: 'Only dedicated Vitrava full-time master installers. We do not use third-party general laborers or transient subcontractors.' },
      { q: 'What happens to my old windows?', a: 'We haul away all old windows, frames, and scrap materials, sorting glass, aluminum, and vinyl for recycling at licensed green facilities.' },
      { q: 'Are your installers licensed and insured?', a: 'Yes. Vitrava holds full general liability, commercial auto, and workers’ compensation coverage up to ₹5,000,000 for your peace of mind.' },
      { q: 'Will the installers clean the glass after finishing?', a: 'Every window is thoroughly cleaned, vacuumed, and inspected with the homeowner prior to final project sign-off.' }
    ]
  },
  {
    slug: 'weatherproofing-air-sealing',
    title: 'Weatherproofing & Air Sealing',
    tagline: 'Polyurethane Thermal Perimeter Seal',
    shortDesc: 'Complete perimeter weatherization utilizing closed-cell polyurethane expanding foam, self-adhering flashing tape, and backer rod silicone seals.',
    heroImg: 'assets/images/services/weatherproofing-main.jpg',
    detailImg: 'assets/images/services/weatherproofing-secondary.jpg',
    lead: 'The gap between your window frame and wall rough opening is the most vulnerable point for drafts and water intrusion. We seal it with an airtight, watertight, multi-barrier weatherization envelope.',
    benefits: [
      { title: 'Closed-Cell Expanding Foam', desc: 'Specialized low-expansion polyurethane foam that insulates without bowing window jambs or losing elasticity.' },
      { title: 'Sloped Waterproof Sill Pan', desc: 'Positive-slope flashing pan directing any accidental condensation or rain driven water safely to the exterior.' },
      { title: 'Commercial-Grade Sealants', desc: 'High-movement silicone and elastomeric sealants that withstand 50% joint expansion across extreme seasons.' },
      { title: 'Zero Moisture Trapping', desc: 'Vapor-permeable exterior barriers that let interior humidity escape while preventing liquid water ingress.' }
    ],
    process: [
      { step: '01', title: 'Rough Opening Flashing', desc: 'Applying self-adhered bituminous flashing membranes along the sill, jambs, and head framing.' },
      { step: '02', title: 'Perimeter Cavity Foaming', desc: 'Injecting low-pressure expanding insulating foam around the entire 360-degree perimeter gap.' },
      { step: '03', title: 'Backer Rod & Sealant Bead', desc: 'Tooling clean elastomeric sealant joints over closed-cell backer rods on exterior siding junctions.' },
      { step: '04', title: 'Exterior Head Drip Cap', desc: 'Installing corrosion-proof metal drip cap flashings over window headers to deflect driving rainwater.' }
    ],
    technical: [
      { label: 'Foam Insulating Value', value: 'R-4.5 per inch thickness' },
      { label: 'Sealant Flexibility', value: 'ASTM C920 Class 50 (± 50% Joint Movement)' },
      { label: 'Water Penetration Resistance', value: 'Tested to 12.0 PSF (equal to 68 MPH driving rain)' },
      { label: 'Air Permeability', value: 'Zero detectable airflow at 75 Pascals' }
    ],
    pricing: 'Full perimeter weatherproofing, sill pans, low-expansion foam, and exterior silicone casing beads are included as standard components in all Vitrava window installations.',
    faqs: [
      { q: 'Why is low-expansion foam important?', a: 'Standard expanding foam from hardware stores expands aggressively, bending window jambs and preventing sashes from sliding or locking. We use certified low-pressure micro-foam.' },
      { q: 'How long do the exterior silicone sealants last?', a: 'Our architectural-grade silicone sealants are UV-stable and engineered for 25+ years without drying out, cracking, or pulling away from siding.' },
      { q: 'What is a sill pan flashing?', a: 'A sill pan is a protective waterproof tray installed directly beneath the window on the rough sill. It acts as a safety barrier to ensure moisture cannot enter interior wall framing.' },
      { q: 'Does weatherproofing prevent winter window condensation?', a: 'Yes. By eliminating thermal bypass around the perimeter and raising indoor glass surface temperatures, condensation is virtually eliminated in properly ventilated homes.' }
    ]
  },
  {
    slug: 'warranty-aftercare',
    title: '25-Year Warranty & Aftercare',
    tagline: 'Non-Prorated Transferable Bond',
    shortDesc: 'True peace of mind. Comprehensive non-prorated 25-year warranty covering glass seal failure, hardware mechanicals, frame materials, and installation labor.',
    heroImg: 'assets/images/services/warranty-aftercare-main.jpg',
    detailImg: 'assets/images/services/warranty-aftercare-secondary.jpg',
    lead: 'A warranty is only as good as the company backing it. Vitrava provides an ironclad, non-prorated, fully transferable 25-year warranty deed that protects your investment and adds measurable resale value.',
    benefits: [
      { title: '100% Non-Prorated Coverage', desc: 'No sliding scale or depreciating payouts. If a seal or component fails in year 24, we repair or replace it at 100% value.' },
      { title: 'Fully Transferable to Next Homeowner', desc: 'Transferable to subsequent property buyers at zero charge, significantly enhancing property market appraisal.' },
      { title: 'Free Annual Tune-Up', desc: 'Complimentary 12-month balance calibration and hardware lubrication service upon request.' },
      { title: 'Zero Labor Deductibles', desc: 'Both replacement parts and master certified technician labor are fully covered with zero trip fees.' }
    ],
    process: [
      { step: '01', title: 'Deed Issuance', desc: 'Immediate registration of your unique Vitrava Warranty Certificate in your digital client portal.' },
      { step: '02', title: 'Dedicated Concierge', desc: 'Direct access to your assigned installation manager for any questions, adjustments, or care advice.' },
      { step: '03', title: 'Prompt Claim Dispatch', desc: 'Fast, hassle-free service dispatch if you ever notice an issue with sash balance, latch, or glass seal.' },
      { step: '04', title: 'Simple Ownership Transfer', desc: 'One-click warranty transfer in our portal if you sell your residence to a new homeowner.' }
    ],
    technical: [
      { label: 'Insulated Glass Unit Seal', value: '25-Year Non-Prorated Guarantee' },
      { label: 'Mechanical Hardware & Operators', value: '25-Year Mechanical Replacement' },
      { label: 'Installation & Air Sealing Labor', value: '25-Year Complete Workmanship Coverage' },
      { label: 'Transferability', value: 'Unlimited within 25 years with zero transfer fee' }
    ],
    pricing: 'The Vitrava 25-Year Transferable Warranty is included with every window replacement project at zero additional charge.',
    faqs: [
      { q: 'What does "non-prorated" mean?', a: 'Prorated warranties reduce the amount the company pays as the windows age (e.g. paying only 20% in year 15). Vitrava’s non-prorated warranty covers 100% of parts and labor for the full 25 years.' },
      { q: 'Is there a fee to transfer the warranty if I sell my home?', a: 'No. The warranty can be transferred to the new homeowner online through our client portal at absolutely zero charge.' },
      { q: 'What should I do if a window seal shows moisture or fogging?', a: 'Simply submit a photo through your client portal or call our support line. A master technician will be dispatched to replace the insulated glass unit under full warranty.' },
      { q: 'Does the warranty cover accidental glass breakage?', a: 'We offer optional Lifetime Accidental Glass Breakage protection packages for added peace of mind.' }
    ]
  }
];

// The 6 Window Styles integrated into Services Page
const windowStyles = [
  {
    slug: 'casement',
    name: 'Casement Windows',
    tagline: 'Airtight Compression Crank',
    shortDesc: 'Engineered with 90-degree fold-away cranks and multi-point perimeter compression seals for industry-leading airtight thermal performance.',
    heroImg: 'assets/images/window-styles/casement-main.jpg',
    benefits: [
      'Full 90° outward swing captures prevailing breezes for whole-home ventilation',
      'Continuous rubber compression gasket pulled airtight by multi-point cam locks',
      'Washable exterior glass safely reachable from inside the room'
    ],
    specs: { uFactor: '0.16 (Triple)', airInf: '< 0.01 CFM/ft²', stc: '36 STC' }
  },
  {
    slug: 'double-hung',
    name: 'Double-Hung Windows',
    tagline: 'Traditional Dual Sliding Sashes',
    shortDesc: 'A timeless architectural profile modernized with multi-chambered thermal insulation, dual sliding sashes, and effortless tilt-in cleaning.',
    heroImg: 'assets/images/window-styles/double-hung-main.jpg',
    benefits: [
      'Simultaneous dual-sash convection cooling: hot air exits top, cool air enters bottom',
      'Dual sashes tilt inward 90° for effortless indoor glass washing without ladders',
      'Interlocking composite meeting rail eliminates winter drafts and rattling'
    ],
    specs: { uFactor: '0.18 (Triple)', airInf: '< 0.05 CFM/ft²', stc: '34 STC' }
  },
  {
    slug: 'sliding',
    name: 'Horizontal Sliding Gliders',
    tagline: 'Smooth Tandem Brass Rollers',
    shortDesc: 'Expansive contemporary horizontal openings featuring precision tandem brass rollers gliding effortlessly on an extruded aluminum sill runway.',
    heroImg: 'assets/images/window-styles/sliding-main.jpg',
    benefits: [
      'Self-lubricating tandem brass rollers roll smoothly along raised monorails',
      'Ultra-slim sightlines maximize visible natural daylight and garden vistas',
      'Baffled multipoint weep chambers drain heavy rain safely without backdrafts'
    ],
    specs: { uFactor: '0.19 (Triple)', airInf: '< 0.06 CFM/ft²', stc: '33 STC' }
  },
  {
    slug: 'picture',
    name: 'Architectural Picture Windows',
    tagline: 'Expansive Fixed View Glass',
    shortDesc: 'Grand stationary windows providing maximum natural illumination, unobstructed vista framing, and the absolute highest thermal R-value.',
    heroImg: 'assets/images/window-styles/picture-main.jpg',
    benefits: [
      '100% stationary direct-set construction eliminates operable gaps and leakage',
      'Supports continuous single insulated glass panels up to 60 square feet',
      'Triple-layer silver Low-E coatings reflect 79% of solar infrared heat waves'
    ],
    specs: { uFactor: '0.15 (Triple Krypton)', airInf: '0.00 CFM/ft² (Airtight)', stc: '38 STC' }
  },
  {
    slug: 'bay-bow',
    name: 'Bay & Bow Alcoves',
    tagline: '30° & 45° Projection Angles',
    shortDesc: 'Custom cantilevered 3-lite to 5-lite projecting assemblies transforming flat interior walls into sun-drenched architectural focal points.',
    heroImg: 'assets/images/window-styles/bay-bow-main.jpg',
    benefits: [
      'Expands interior room footprint with a sunlit reading or dining alcove',
      'Pre-insulated furniture-grade R-9 hardwood seat and head boards prevent drafts',
      'Concealed high-tensile stainless steel tieback cables prevent sag over decades'
    ],
    specs: { uFactor: '0.18 (Triple Core)', airInf: '< 0.03 CFM/ft²', stc: '35 STC' }
  },
  {
    slug: 'awning',
    name: 'Top-Hinged Awning Windows',
    tagline: 'Rainproof Breeze Ventilation',
    shortDesc: 'Designed to pivot outward from the top, creating a protective glass awning that allows fresh air ventilation even during steady rainfall.',
    heroImg: 'assets/images/window-styles/awning-main.jpg',
    benefits: [
      'Top-hinged outward cantilever lets you keep windows open during heavy rains',
      'Dual continuous perimeter silicone compression bulb seals prevent heat loss',
      'Ideal for high bathroom wall privacy and kitchen sink backsplashes'
    ],
    specs: { uFactor: '0.17 (Triple)', airInf: '< 0.02 CFM/ft²', stc: '35 STC' }
  }
];

// FAQs for Section 6
const servicesFaqs = [
  {
    q: 'How do I choose between Casement and Double-Hung windows for my home?',
    a: 'Casement windows crank outward and use continuous perimeter compression gaskets, offering industry-leading airtightness (U-0.16, air leakage < 0.01 CFM/ft²) and 100% opening area — perfect for windward rooms, modern designs, and kitchen sinks. Double-hung windows feature two vertical sliding sashes with tilt-in cleaning, preserving historic or traditional Craftsman/Colonial aesthetics while enabling natural convection cooling (hot air exits top sash while cool air enters bottom sill).'
  },
  {
    q: 'What is included in Vitrava’s turnkey window replacement service?',
    a: 'Our turnkey service includes an in-home thermal imaging inspection, sub-millimeter 3-point digital laser measurement, automated custom factory fabrication, surgical extraction of old units, rough framing and header inspection, AAMA 2400 certified installation, closed-cell low-expansion foam perimeter insulation, sloped sill pan flashing, exterior silicone joint tooling, white-glove clean-up, and registration of our 25-Year non-prorated transferable warranty.'
  },
  {
    q: 'Can window replacements be carried out during winter or cold weather?',
    a: 'Yes. Vitrava master installers use winter thermal containment procedures. Crews work room-by-room, closing interior doors and sealing each opening immediately upon removal. A typical rough opening is exposed to outside air for only 10 to 15 minutes, ensuring your indoor heating loss is virtually undetectable.'
  },
  {
    q: 'Do Vitrava windows qualify for federal energy tax credits and utility rebates?',
    a: 'Yes. All Vitrava Signature Triple-Pane and select Performance Dual-Pane window styles are NFRC certified and meet Energy Star Northern Climate criteria. They qualify homeowners for the Inflation Reduction Act Section 25C Energy Efficient Home Improvement Credit (up to ₹1,200 annually), plus local gas and electric utility cash-back rebates.'
  },
  {
    q: 'What does the 25-Year Non-Prorated Warranty actually cover?',
    a: 'Unlike standard prorated contractor warranties that depreciate value over time, Vitrava guarantees 100% parts, insulated glass seal units, mechanical hardware, and master installation labor for 25 full years. If a thermal seal fogs or hardware fails in year 24, we replace and install it free of charge. The warranty deed is also 100% transferable to future homeowners with zero fees.'
  },
  {
    q: 'How long does a typical window replacement project take from start to finish?',
    a: 'From your initial laser measurement and custom specification approval, precision automated fabrication takes approximately 3 to 4 weeks. Once delivered and quality-inspected, on-site installation for an average home (12 to 25 windows) is completed within 1 to 2 consecutive business days.'
  }
];

// 1. Generate Redesigned Services Page (services.html) - Strictly 7 Main Sections
function generateServicesDirectory() {
  const bodyContent = `
  <!-- Section 1 — Services Hero: Premium architectural image, heading, description, and CTA -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
    <div class="container-custom">
      <div class="hero-grid-split">
        <div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
            <span class="badge badge-teal">COMPREHENSIVE SERVICES &amp; STYLES</span>
            <span class="badge badge-citron">AAMA 2400 CERTIFIED</span>
          </div>
          <h1 class="text-h1" style="margin-bottom: 1.25rem;">Engineered Window Replacement &amp; Architectural Styles</h1>
          <p class="text-lead" style="margin-bottom: 2rem;">
            Discover Vitrava's certified whole-home installation services alongside our six high-performance window styles — engineered for maximum thermal insulation, acoustic tranquility, and lifetime durability.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <a href="#installation-services" class="btn btn-primary btn-lg">Explore Services</a>
            <a href="#window-styles" class="btn btn-secondary btn-lg">Explore 6 Window Styles</a>
          </div>
          <div style="display: flex; gap: 2rem; border-top: 1px solid var(--color-border); padding-top: 1.5rem; flex-wrap: wrap;">
            <div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">0.15</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Lowest U-Factor Rating</div>
            </div>
            <div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); font-family: var(--font-mono);">&lt; 0.01</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">CFM/ft² Air Infiltration</div>
            </div>
            <div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">25-Yr</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Transferable Warranty</div>
            </div>
          </div>
        </div>
        <div class="window-frame-wrapper" style="aspect-ratio: 4 / 3;">
          <img src="assets/images/about/about-hero.jpg" alt="Vitrava certified installation team fitting high performance window" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2 — Our Window Replacement Services: Display existing services with relevant imagery and details -->
  <section id="installation-services" class="section-spacing">
    <div class="container-custom">
      <div style="text-align: center; max-width: 800px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-accent" style="margin-bottom: 0.75rem;">TURNKEY CRAFTSMANSHIP</span>
        <h2 class="text-h2">Our Window Replacement Services</h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          From calibrated infrared diagnostics and sub-millimeter laser surveys to certified master installation and lifetime transferable warranty bonds.
        </p>
      </div>

      <div class="grid-3-col">
        ${services.map((s, idx) => `
        <div class="card-arch" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <div>
            <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem; border-radius: var(--radius-md); overflow: hidden;">
              <img src="${s.heroImg}" alt="${s.title} — Vitrava Energy Efficient Windows" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" loading="lazy">
            </div>
            <div class="service-card-meta" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
              <span class="badge badge-accent">SERVICE 0${idx + 1}</span>
              <span style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary); display: inline-flex; align-items: center; gap: 0.35rem;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${s.technical[0].label.split(' ')[0]} Certified
              </span>
            </div>
            <h3 class="text-h3" style="font-size: 1.25rem; line-height: 1.35; margin-bottom: 0.35rem;">
              <a href="services/${s.slug}.html" style="color: inherit; text-decoration: none;">${s.title}</a>
            </h3>
            <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary); margin-bottom: 0.75rem; letter-spacing: 0.02em;">
              ${s.tagline}
            </div>
            <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6; margin-bottom: 1.25rem;">
              ${s.shortDesc}
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
              <span class="badge badge-muted" style="font-size: 0.75rem;">${s.technical[0].label.split(' ')[0]}: ${s.technical[0].value.split(/[(/]/)[0].trim().slice(0, 24)}</span>
              <span class="badge badge-muted" style="font-size: 0.75rem;">${s.technical[3] ? s.technical[3].label.split(' ')[0] : 'Certified'}: ${s.technical[3] ? s.technical[3].value.split(/[(/]/)[0].trim().slice(0, 22) : 'Standard'}</span>
            </div>
          </div>
          <div class="service-card-actions" style="border-top: 1px solid var(--color-border); padding-top: 1.15rem; margin-top: auto; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;">
            <a href="services/${s.slug}.html" class="btn btn-primary btn-sm" style="font-weight: 700; flex: 1; text-align: center; justify-content: center;">
              View Service Details &rarr;
            </a>
            <a href="booking.html" class="btn btn-outline btn-sm" style="flex-shrink: 0;">Book Service</a>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section 3 — Explore Window Styles: Display all six window styles in a modern, responsive grid with unique images -->
  <section id="window-styles" class="section-spacing" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="text-align: center; max-width: 820px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">ARCHITECTURAL CATALOG</span>
        <h2 class="text-h2">Explore All Six Window Styles</h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Each window style is custom fabricated with triple-pane thermal insulating glass, airtight multi-point compression seals, and durable composite frames.
        </p>
      </div>

      <div class="grid-3-col">
        ${windowStyles.map((w, idx) => `
        <div class="card-arch" style="display: flex; flex-direction: column;">
          <div class="window-frame-wrapper" style="aspect-ratio: 16 / 10; margin-bottom: 1.25rem;">
            <img src="${w.heroImg}" alt="${w.name} — ${w.tagline}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge-citron">STYLE 0${idx + 1}</span>
            <span style="font-size: 0.8125rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">${w.specs.uFactor}</span>
          </div>
          <h3 class="text-h3" style="margin-bottom: 0.25rem;"><a href="products/${w.slug}.html" style="color: inherit;">${w.name}</a></h3>
          <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-primary); margin-bottom: 0.75rem;">${w.tagline}</div>
          <p style="color: var(--color-text-muted); font-size: 0.925rem; line-height: 1.55; margin-bottom: 1.25rem;">
            ${w.shortDesc}
          </p>

          <div style="background-color: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.875rem 1rem; margin-bottom: 1.25rem; flex: 1;">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem;">Key Benefits:</div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--color-text-main);">
              ${w.benefits.map((b) => `
              <li style="display: flex; align-items: flex-start; gap: 0.4rem;">
                <span style="color: var(--color-primary); margin-top: 1px;">&check;</span>
                <span>${b}</span>
              </li>
              `).join('')}
            </ul>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
            <span class="badge badge-muted">Air: ${w.specs.airInf}</span>
            <span class="badge badge-muted">Sound: ${w.specs.stc}</span>
          </div>

          <div style="border-top: 1px solid var(--color-border); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
            <a href="products/${w.slug}.html" class="btn btn-primary btn-sm" style="font-weight: 700; flex: 1; text-align: center;">
              View Details &rarr;
            </a>
            <a href="quote.html" class="btn btn-outline btn-sm">Get Quote</a>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section 4 — Energy Efficiency Benefits: Highlight insulation, thermal performance, noise reduction, and home comfort -->
  <section class="section-spacing">
    <div class="container-custom">
      <div style="text-align: center; max-width: 780px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-citron" style="margin-bottom: 0.75rem;">THERMAL SCIENCE</span>
        <h2 class="text-h2">Why Vitrava Efficiency Changes Everyday Living</h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Engineered to outperform standard builder-grade windows in every critical building science metric.
        </p>
      </div>

      <div class="grid-4-col">
        <div class="card-flat">
          <div style="width: 3rem; height: 3rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.shield}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">Maximum Thermal Insulation</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            Triple-pane krypton and argon gas fills combined with warm-edge composite spacers achieve U-factors as low as 0.15, keeping indoor winter warmth intact.
          </p>
        </div>

        <div class="card-flat">
          <div style="width: 3rem; height: 3rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.leaf}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">Zero Convective Drafts</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            Multi-chambered continuous rubber compression gaskets eliminate micro-air drafts (&lt; 0.01 CFM/ft²), eliminating uneven cold spots across your living areas.
          </p>
        </div>

        <div class="card-flat">
          <div style="width: 3rem; height: 3rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.sun}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">99.4% UV &amp; Solar Heat Shield</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            Microscopic triple-layer silver Low-E coatings reflect infrared solar heat while shielding natural wood flooring, artwork, and furniture from irreversible sun bleaching.
          </p>
        </div>

        <div class="card-flat">
          <div style="width: 3rem; height: 3rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
            ${ICONS.chart}
          </div>
          <h3 class="text-h4" style="margin-bottom: 0.5rem;">Acoustic Sound Tranquility</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">
            Asymmetric acoustic laminated glass thicknesses disrupt exterior soundwave resonance, cutting street noise, lawnmowers, and traffic rumble by up to 14 dB (38 STC).
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5 — Our Installation Process: Display the consultation-to-installation journey -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
    <div class="container-custom">
      <div style="text-align: center; max-width: 780px; margin-inline: auto; margin-bottom: 3.5rem;">
        <span class="badge badge-accent" style="margin-bottom: 0.75rem;">ZERO COMPROMISES PROTOCOL</span>
        <h2 class="text-h2">Our Master Installation Process</h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          A transparent 5-step journey from initial thermal diagnostics to lifetime transferable warranty certification.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.5rem;">
        <div class="card-flat" style="border-top: 4px solid var(--color-primary);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">01</div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text-main);">Thermal Consultation</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.55;">
            In-home walkthrough and infrared FLIR scan identifying air leaks, draft zones, and design goals.
          </p>
        </div>

        <div class="card-flat" style="border-top: 4px solid var(--color-primary);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">02</div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text-main);">Laser Measurement</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.55;">
            Sub-millimeter digital laser triangulation of rough openings ensures 100% custom factory fit.
          </p>
        </div>

        <div class="card-flat" style="border-top: 4px solid var(--color-primary);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">03</div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text-main);">Factory Fabrication</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.55;">
            Automated fabrication with triple-pane glazing, warm-edge spacers, and multi-chambered frames.
          </p>
        </div>

        <div class="card-flat" style="border-top: 4px solid var(--color-primary);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">04</div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text-main);">AAMA 2400 Installation</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.55;">
            Zero subcontractors. Master certified crews install with structural screws and low-expansion foam.
          </p>
        </div>

        <div class="card-flat" style="border-top: 4px solid var(--color-primary);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">05</div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text-main);">25-Yr Deed Handover</h4>
          <p style="color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.55;">
            Sash balance testing, white-glove site clean-up, and registration of our 25-Year transferable warranty.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 6 — Frequently Asked Questions: Include relevant service and window-style FAQs -->
  <section class="section-spacing">
    <div class="container-custom" style="max-width: 860px;">
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">CLEAR ANSWERS</span>
        <h2 class="text-h2">Frequently Asked Questions</h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Everything you need to know about our window replacement services, window styles, and technical performance.
        </p>
      </div>

      <div data-accordion-single="true">
        ${servicesFaqs.map((f, i) => `
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

  <!-- Section 7 — Consultation CTA: Encourage customers to request a quote or book a measurement -->
  <section class="section-spacing-sm" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); text-align: center;">
    <div class="container-custom" style="max-width: 800px;">
      <span class="badge badge-citron" style="margin-bottom: 1rem;">GET STARTED TODAY</span>
      <h2 class="text-h2" style="margin-bottom: 1rem;">Ready for Draft-Free Architectural Living?</h2>
      <p class="text-lead" style="margin-bottom: 2rem;">
        Schedule a complimentary in-home laser measurement with an architectural window specialist. Zero pressure, transparent line-item estimates, and physical material samples.
      </p>
      <div class="mobile-cta-stack" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
        <a href="booking.html" class="btn btn-primary btn-lg btn-no-wrap">Schedule Free Measurement</a>
        <a href="quote.html" class="btn btn-secondary btn-lg">Request Online Quote</a>
        <a href="calculator.html" class="btn btn-outline btn-lg">Calculate Energy Savings</a>
      </div>
      <div style="font-size: 0.9375rem; color: var(--color-text-muted);">
        Prefer to speak directly with an engineer? Call <a href="tel:18005558487" style="color: var(--color-primary); font-weight: 700;">(800) 555-VITRAVA</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapHtml(
    'Services & Window Styles — Vitrava Energy-Efficient Windows',
    'Explore Vitrava turnkey window replacement services and six architectural window styles: casement, double-hung, sliding, picture, bay/bow, and awning windows.',
    bodyContent,
    0,
    'services'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'services.html'), html, 'utf8');
}

// 2. Generate 6 Individual Service Detail Pages
function generateServiceDetailPages() {
  services.forEach((s) => {
    const depth = 1;
    const root = getRelRoot(depth);

    const bodyContent = `
    <!-- Section 1: Service Hero with Breadcrumbs -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
      <div class="container-custom">
        <div class="hero-grid-split">
          <div>
            <span class="badge badge-teal" style="margin-bottom: 1rem;">${s.tagline.toUpperCase()}</span>
            <h1 class="text-h1" style="margin-bottom: 1.25rem;">${s.title}</h1>
            <p class="text-lead" style="margin-bottom: 2rem;">${s.lead}</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="${root}booking.html" class="btn btn-primary btn-lg">Book Measurement</a>
              <a href="${root}quote.html" class="btn btn-secondary btn-lg">Get Fast Estimate</a>
            </div>
          </div>
          <div class="hero-image-frame">
            <img src="${root}${s.heroImg}" alt="${s.title} hero image" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Key Benefits & Advantages -->
    <section class="section-spacing">
      <div class="container-custom">
        <div style="text-align: center; max-width: 700px; margin-inline: auto; margin-bottom: 3.5rem;">
          <span class="badge badge-citron" style="margin-bottom: 0.75rem;">PROVEN ADVANTAGES</span>
          <h2 class="text-h2">Engineered Performance You Can Measure</h2>
        </div>
        <div class="grid-4-col">
          ${s.benefits.map((b) => `
          <div class="card-flat">
            <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center; margin-bottom: 1.25rem;">
              ${ICONS.shield}
            </div>
            <h3 class="text-h4" style="margin-bottom: 0.5rem;">${b.title}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6;">${b.desc}</p>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 3: Detailed Process & Technical Execution (With Second Content Photo) -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom">
        <div class="grid-2-col">
          <div class="hero-image-frame">
            <img src="${root}${s.detailImg}" alt="${s.title} technical execution detail" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <span class="badge badge-accent" style="margin-bottom: 1rem;">EXECUTION PROTOCOL</span>
            <h2 class="text-h2" style="margin-bottom: 1.5rem;">How We Execute This Service</h2>
            <div class="timeline">
              ${s.process.map((p) => `
              <div class="timeline-step is-active">
                <div class="timeline-dot"></div>
                <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 0.25rem;">
                  <span style="color: var(--color-primary); margin-inline-end: 0.35rem;">Step ${p.step}:</span> ${p.title}
                </h4>
                <p style="color: var(--color-text-muted); font-size: 0.925rem; line-height: 1.55;">${p.desc}</p>
              </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Technical Specifications & Compliance Factors -->
    <section class="section-spacing">
      <div class="container-custom">
        <div class="grid-2-col">
          <div>
            <span class="badge badge-teal" style="margin-bottom: 1rem;">ENGINEERING BENCHMARKS</span>
            <h2 class="text-h2" style="margin-bottom: 1.25rem;">Architectural Standards &amp; Metrics</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 2rem; line-height: 1.65;">
              Every Vitrava installation is measured against rigorous building science metrics, adhering strictly to AAMA 2400, NFRC thermal verification, and FGIA quality guidelines.
            </p>
            <div style="background-color: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.5rem;">Pricing &amp; Investment Guidance</h4>
              <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6;">${s.pricing}</p>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${s.technical.map((t) => `
            <div class="metric-box">
              <span class="metric-label">${t.label}</span>
              <span style="font-size: 1.15rem; font-weight: 700; color: var(--color-text-main); font-family: var(--font-mono);">${t.value}</span>
            </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Unique FAQs Accordion -->
    <section class="section-spacing-sm" style="background-color: var(--color-surface); border-block: 1px solid var(--color-border);">
      <div class="container-custom" style="max-width: 980px;">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span class="badge badge-citron" style="margin-bottom: 0.75rem;">FREQUENT QUESTIONS</span>
          <h2 class="text-h2">Questions About ${s.title}</h2>
        </div>
        <div data-accordion-single="true">
          ${s.faqs.map((f, i) => `
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

    <!-- Section 6: Direct Scheduling & Consultation CTA -->
    <section class="section-spacing" style="text-align: center;">
      <div class="container-custom" style="max-width: 900px;">
        <h2 class="text-h2" style="margin-bottom: 1rem;">Schedule Your Free Measurement For This Service</h2>
        <p class="text-lead" style="margin-bottom: 2rem;">
          Take the first step toward superior residential energy performance. Speak directly with a Vitrava architectural window specialist.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="${root}booking.html" class="btn btn-primary btn-lg">Book Free Measurement</a>
          <a href="${root}quote.html" class="btn btn-secondary btn-lg">Request Project Quote</a>
        </div>
      </div>
    </section>
    `;

    const html = wrapHtml(
      `${s.title} — Vitrava Energy-Efficient Windows`,
      `${s.shortDesc} Certified AAMA 2400 installation, FLIR diagnostics, and 25-year warranty bond.`,
      bodyContent,
      depth,
      'services'
    );

    fs.writeFileSync(path.join(__dirname, '..', 'services', `${s.slug}.html`), html, 'utf8');
  });
}

generateServicesDirectory();
generateServiceDetailPages();
console.log('Services directory and 6 unique detail pages generated successfully.');
