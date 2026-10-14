// Shared source for project cards, case studies, and home-page project previews.
const fs = require('fs');
const path = require('path');

const projects = [
  {
    slug: 'modern-suburban',
    title: 'Modern Suburban Home Window Upgrade',
    category: 'residential',
    categoryLabel: 'Suburban Residential',
    location: 'Oakridge Heights, OR',
    scope: '22 Windows (14 Casement, 6 Awning, 2 Picture)',
    windowsSelected: 'Vitrava Signature Triple-Pane Krypton (Matte Obsidian Frame)',
    heroImg: 'assets/images/projects/Modern Suburban Home Window Upgrade-1.jpg',
    detailImg: 'assets/images/projects/Modern Suburban Home Window Upgrade-2.jpg',
    shortDesc: 'A complete 22-window replacement brings clear views, improved insulation, and clean architectural lines to a suburban home.',
    lead: 'Built in 1994, this two-story suburban home suffered from original double-pane clear aluminum windows with dried perimeter gaskets, cold winter drafts, and steep ₹480/month winter heating bills.',
    challenge: 'Original windows exhibited extensive edge condensation, rattling sashes in moderate wind, and a measured whole-envelope air infiltration rate of 0.28 CFM/ft². The homeowners desired modern black frames without sacrificing heat retention in Portland’s rainy winters.',
    solution: 'We specified 22 custom Vitrava Signature Triple-Pane windows with Matte Obsidian composite frames. Each opening received continuous sloped sill pan flashings and low-expansion closed-cell foam insulation.',
    results: [
      { metric: '42%', label: 'Annual Heating Bill Reduction' },
      { metric: '0.01', label: 'CFM/ft² Air Infiltration (down from 0.28)' },
      { metric: '-12 dB', label: 'Exterior Traffic Noise Attenuation' },
      { metric: '₹1,380', label: 'First-Year Verified Energy Savings' }
    ],
    testimonial: {
      quote: 'The change in our home’s comfort was instantaneous. Rooms that used to be freezing in November are now completely warm, and our heating bills dropped over 40%. The black architectural frames completely transformed the look of our house.',
      author: 'Marcus & Jessica Vance',
      role: 'Homeowners'
    }
  },
  {
    slug: 'coastal-residence',
    title: 'High-Performance Coastal Residence',
    category: 'coastal',
    categoryLabel: 'Coastal & Marine',
    location: 'Cannon Beach, OR',
    scope: '18 Windows (12 Casement, 6 Direct-Set Picture)',
    windowsSelected: 'Impact-Resistant Marine-Grade Triple Glaze (DP-70)',
    heroImg: 'assets/images/projects/High-Performance Coastal Residence-1.jpg',
    detailImg: 'assets/images/projects/High-Performance Coastal Residence-2.jpg',
    shortDesc: 'Ocean-facing glazing pairs expansive daylight and sea views with hardware and seals selected for coastal weather.',
    lead: 'Overlooking the Pacific Ocean, this exposed coastal bluff residence faced 70 MPH gale-force winter storms, salt-spray corrosion, and severe wind-driven rain penetration.',
    challenge: 'The coastal salt air had severely corroded the prior metal hardware, while intense coastal wind loads caused water to leak under the sills during winter storms.',
    solution: 'Engineered with 316-grade stainless steel hardware, PVB structural storm interlayers, and triple-glazed krypton chambers tested to 12.0 PSF water penetration resistance.',
    results: [
      { metric: 'DP-70', label: 'Commercial Wind Pressure Rating' },
      { metric: '0.00', label: 'Water Penetration at 68 MPH Rain' },
      { metric: '100%', label: 'Salt Spray Corrosion Resistance' },
      { metric: '38 STC', label: 'Acoustic Rating (Quiet during ocean storms)' }
    ],
    testimonial: {
      quote: 'Living right on the ocean is incredible, but winter storms used to be terrifying with windows flexing and whistling. Vitrava’s marine windows are rock-solid and whisper-quiet even in 60 MPH winds.',
      author: 'Dr. Gregory Thorne',
      role: 'Oceanfront Homeowner'
    }
  },
  {
    slug: 'historic-modernization',
    title: 'Historic Brownstone Restoration',
    category: 'historic',
    categoryLabel: 'Historic Renovation',
    location: 'Nob Hill District, Portland, OR',
    scope: '16 Custom Double-Hung Windows',
    windowsSelected: 'Simulated Divided-Lite Triple Glaze with Solid Mahogany Interior',
    heroImg: 'assets/images/projects/Historic Brownstone Restoration-1.jpg',
    detailImg: 'assets/images/projects/Historic Brownstone Restoration-2.jpg',
    shortDesc: 'Carefully detailed replacement windows preserve traditional character while improving everyday comfort and operation.',
    lead: 'Balancing strict Historic Preservation Commission guidelines with 21st-century thermal physics. Replicating authentic 1912 divided-lite muntin profiles with 0.18 U-factor performance.',
    challenge: 'Local historic preservation guidelines prohibited altering exterior sightlines or removing original mahogany interior casing. Existing single-pane weights-and-pulleys windows rattled and leaked cold air.',
    solution: 'Custom-milled exterior aluminum clad frames matching the historic municipal color palette, combined with interior stain-grade mahogany sashes and simulated divided-lite spacers between triple-pane glass.',
    results: [
      { metric: '100%', label: 'Historic Commission Approval' },
      { metric: '0.18', label: 'U-Factor (down from 1.15 single-pane)' },
      { metric: '35 STC', label: 'Acoustic Soundproofing Rating' },
      { metric: 'Zero', label: 'Disruption to Original Interior Trim' }
    ],
    testimonial: {
      quote: 'The Historic Board praised Vitrava’s attention to detail. We maintained the authentic 1912 brownstone look while gaining modern triple-pane insulation and effortless tilt-in cleaning.',
      author: 'Eleanor Sterling',
      role: 'Heritage Property Owner'
    }
  },
  {
    slug: 'panoramic-installation',
    title: 'Hillside Modernist Panoramic Pavilion',
    category: 'panoramic',
    categoryLabel: 'Panoramic Contemporary',
    location: 'West Hills, OR',
    scope: '54 Linear Feet of Continuous Floor-to-Ceiling Glazing',
    windowsSelected: 'Custom Architectural Multi-Slide & Fixed Picture Windows',
    heroImg: 'assets/images/projects/Hillside Modernist Panoramic Pavilion-1.png',
    detailImg: 'assets/images/projects/Hillside Modernist Panoramic Pavilion-2.jpg',
    shortDesc: 'Large architectural windows frame the hillside landscape and connect open living spaces with the surrounding trees.',
    lead: 'A dramatic architectural hillside residence requiring 11-foot-tall floor-to-ceiling glass walls uniting the great room with an expansive cantilevered cedar forest deck.',
    challenge: 'Supporting massive glass weight over expansive spans without thick structural mullions that would ruin the panoramic forest view, while complying with stringent energy codes.',
    solution: 'Structural silicone glazing with recessed flush floor tracks and thermal-break heavy-gauge composite jambs. 90% Argon gas chambers with triple low-E coating layers.',
    results: [
      { metric: '54 FT', label: 'Continuous Panoramic Glass Wall' },
      { metric: '99.4%', label: 'UV Radiation Filtration' },
      { metric: '0.16', label: 'U-Factor Across Oversized Spans' },
      { metric: 'Zero', label: 'Threshold Barrier (Flush ADA Runway)' }
    ],
    testimonial: {
      quote: 'Vitrava delivered an architectural masterpiece. We have 54 feet of uninterrupted glass framing the mountains, yet you can sit two inches from the glass in mid-January and feel zero chill.',
      author: 'Julian & Claire Mercer',
      role: 'Architectural Homeowners'
    }
  },
  {
    slug: 'family-renovation',
    title: 'Whole-Home Craftsman Energy Renovation',
    category: 'residential',
    categoryLabel: 'Craftsman Renovation',
    location: 'Laurelhurst, OR',
    scope: '24 Windows (16 Casement, 4 Bay Projection, 4 Awning)',
    windowsSelected: 'Vitrava Performance Plus with Arctic White Composite Frames',
    heroImg: 'assets/images/projects/Whole-Home Craftsman Energy Renovation-1.jpg',
    detailImg: 'assets/images/projects/Whole-Home Craftsman Energy Renovation-2.jpg',
    shortDesc: 'A whole-home window upgrade improves comfort and light while retaining the welcoming character of a Craftsman residence.',
    lead: 'A 1928 Craftsman family bungalow with 24 drafty single-pane windows updated into an ultra-comfortable, energy-positive family haven with a sunny projecting breakfast bay.',
    challenge: 'The family suffered from mold and condensation on old wooden window sills every winter, uneven room temperatures, and excessive street noise waking their toddler.',
    solution: 'Complete tear-out replacement with Vitrava Performance dual-pane argon composite windows, custom 5-lite projecting bay window with insulated seat board, and acoustic laminate glass in bedrooms.',
    results: [
      { metric: '₹1,120', label: 'Annual Electricity & Gas Savings' },
      { metric: '100%', label: 'Condensation & Moisture Elimination' },
      { metric: 'R-9', label: 'Insulated Bay Window Seat Board' },
      { metric: '36 STC', label: 'Quiet Bedroom Soundproofing' }
    ],
    testimonial: {
      quote: 'Our kids can now play by the windows in winter without wearing sweaters. Our toddler sleeps through morning traffic noise, and our energy bills have never been lower.',
      author: 'David & Rachel Kim',
      role: 'Craftsman Bungalow Homeowners'
    }
  },
  {
    slug: 'casement-transformation',
    title: 'Contemporary Casement Transformation',
    category: 'modern',
    categoryLabel: 'Modern Transformation',
    location: 'Lake Oswego, OR',
    scope: '14 Outward Casement Units with Drywall Return Trim',
    windowsSelected: 'Vitrava Signature Casement with Charcoal Grey Frames',
    heroImg: 'assets/images/projects/Contemporary Casement Transformation-1.jpg',
    detailImg: 'assets/images/projects/Contemporary Casement Transformation-2.jpg',
    shortDesc: 'Contemporary replacement windows refresh the exterior and bring easier ventilation, clear views, and improved seals indoors.',
    lead: 'Replacing dated 1980s cloudy aluminum sliding windows with sleek, modern architectural casements featuring trimless drywall returns and high-flow summer ventilation.',
    challenge: 'The existing aluminum sliders had failed perimeter seals, cloudy foggy glass, and required considerable physical muscle to push open along corroded tracks.',
    solution: 'Installed 14 custom-engineered Vitrava Casement Windows with smooth 4:1 rotogear cranks, multi-point concealed deadbolts, and European shadowline drywall return trims.',
    results: [
      { metric: '100%', label: 'Ventilation Area (up from 45% slider)' },
      { metric: '< 0.01', label: 'CFM/ft² Compression Air Seal' },
      { metric: '25 YR', label: 'Non-Prorated Transferable Warranty' },
      { metric: '0.16', label: 'NFRC Certified U-Factor' }
    ],
    testimonial: {
      quote: 'The crank operation is like butter — effortless to open and lock. The clean charcoal frames give our home the modern Scandinavian look we always dreamed of.',
      author: 'Brandon & Sophia Lee',
      role: 'Lake Oswego Homeowners'
    }
  }
];


// Fail the build with the exact project/asset instead of rendering missing content.
for (const project of projects) {
  for (const key of ['slug', 'title', 'category', 'categoryLabel', 'location', 'scope', 'windowsSelected', 'shortDesc', 'lead', 'challenge', 'solution', 'heroImg', 'detailImg']) {
    if (typeof project[key] !== 'string' || !project[key].trim()) throw new Error('Missing project field: ' + project.slug + '.' + key);
  }
  if (project.heroImg === project.detailImg) throw new Error('Project needs distinct photos: ' + project.slug);
  for (const image of [project.heroImg, project.detailImg]) {
    if (!fs.existsSync(path.join(__dirname, '..', image))) throw new Error('Missing project photo: ' + image);
  }
}
module.exports = projects;
