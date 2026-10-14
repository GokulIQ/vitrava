const fs = require('fs');
const path = require('path');

function createSvg(width, height, title, subtitle, badgeText, visualElements) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#17272E" />
      <stop offset="60%" stop-color="#0E1B20" />
      <stop offset="100%" stop-color="#087D8C" stop-opacity="0.8" />
    </linearGradient>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DDEFEA" stop-opacity="0.25" />
      <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#087D8C" stop-opacity="0.3" />
    </linearGradient>
    <linearGradient id="citronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D8EC8C" />
      <stop offset="100%" stop-color="#B2CE55" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DCE5E5" stroke-opacity="0.07" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- Visual Graphics -->
  ${visualElements}

  <!-- Lower Architectural Overlay Panel -->
  <rect x="24" y="${height - 110}" width="${width - 48}" height="86" rx="12" fill="#17272E" fill-opacity="0.85" stroke="#344950" stroke-width="1.5" />
  
  <!-- Badge -->
  <rect x="40" y="${height - 96}" width="${badgeText.length * 8 + 20}" height="24" rx="12" fill="url(#citronGrad)" />
  <text x="${50 + (badgeText.length * 8 + 20) / 2 - 10}" y="${height - 80}" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#17272E" text-anchor="middle" letter-spacing="0.5">${badgeText}</text>

  <!-- Title & Subtitle -->
  <text x="40" y="${height - 45}" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="19" font-weight="700" fill="#F1F7F5">${title}</text>
  <text x="40" y="${height - 30}" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="500" fill="#ADC0C3">${subtitle}</text>
</svg>`;
}

// Ensure directories
const dirs = [
  'assets/images/products',
  'assets/images/window-styles',
  'assets/images/services',
  'assets/images/projects',
  'assets/images/blog',
  'assets/images/about',
  'assets/images/common'
];
dirs.forEach(d => fs.mkdirSync(path.join(__dirname, '..', d), { recursive: true }));

const assets = [
  // Products
  {
    file: 'assets/images/products/product-sliding-1.svg',
    w: 800, h: 600,
    title: 'Sliding Windows — Horizontal Glider',
    sub: 'Effortless brass tandem rollers & panoramic glass area',
    badge: 'PRODUCT CATALOG',
    svg: `
      <!-- Sliding Window Elevation -->
      <g transform="translate(150, 60)">
        <rect x="0" y="0" width="500" height="360" rx="6" fill="#1A2D35" stroke="#344950" stroke-width="12" />
        <rect x="12" y="12" width="232" height="336" fill="url(#glassGrad)" stroke="#4A6570" stroke-width="6" />
        <rect x="250" y="12" width="238" height="336" fill="url(#glassGrad)" stroke="#087D8C" stroke-width="8" />
        <!-- Glaze Reflection Lines -->
        <line x1="30" y1="30" x2="160" y2="330" stroke="#FFF" stroke-opacity="0.15" stroke-width="2" />
        <line x1="270" y1="30" x2="400" y2="330" stroke="#FFF" stroke-opacity="0.15" stroke-width="2" />
        <!-- Directional arrow -->
        <path d="M 390 180 L 330 180 M 350 165 L 330 180 L 350 195" stroke="#D8EC8C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    `
  },
  {
    file: 'assets/images/products/product-sliding-2.svg',
    w: 800, h: 600,
    title: 'Precision Tandem Roller & Track Detail',
    sub: 'Heavy-duty extruded brass hardware with weep-hole drainage',
    badge: 'TECHNICAL DETAIL',
    svg: `
      <g transform="translate(180, 80)">
        <rect x="0" y="220" width="440" height="40" fill="#344950" rx="4" />
        <circle cx="120" cy="210" r="35" fill="#D9822B" stroke="#F1F7F5" stroke-width="4" />
        <circle cx="320" cy="210" r="35" fill="#D9822B" stroke="#F1F7F5" stroke-width="4" />
        <circle cx="120" cy="210" r="10" fill="#17272E" />
        <circle cx="320" cy="210" r="10" fill="#17272E" />
        <rect x="60" y="80" width="320" height="100" rx="8" fill="#1F3640" stroke="#087D8C" stroke-width="4" />
        <text x="220" y="135" font-family="sans-serif" font-size="14" font-weight="700" fill="#D8EC8C" text-anchor="middle">QUAD-SEAL COMPRESSION SILL</text>
      </g>
    `
  },
  {
    file: 'assets/images/products/product-picture-1.svg',
    w: 800, h: 600,
    title: 'Architectural Picture Windows',
    sub: 'Unbroken sightlines with maximum structural thermal glass',
    badge: 'PRODUCT CATALOG',
    svg: `
      <g transform="translate(160, 60)">
        <rect x="0" y="0" width="480" height="360" rx="4" fill="#1A2D35" stroke="#087D8C" stroke-width="14" />
        <rect x="14" y="14" width="452" height="332" fill="url(#glassGrad)" />
        <!-- Scenic Landscape Silhouettes through glass -->
        <path d="M 14 340 L 140 220 L 260 300 L 380 180 L 466 340 Z" fill="#0E1B20" fill-opacity="0.5" />
        <circle cx="360" cy="110" r="35" fill="#D8EC8C" fill-opacity="0.3" />
        <line x1="30" y1="40" x2="300" y2="340" stroke="#FFF" stroke-opacity="0.2" stroke-width="3" />
      </g>
    `
  },
  {
    file: 'assets/images/products/product-picture-2.svg',
    w: 800, h: 600,
    title: 'Triple-Pane Structural Glazing Cross Section',
    sub: 'Dual 90% Argon chambers with warm-edge composite spacer',
    badge: 'THERMAL CUTAWAY',
    svg: `
      <g transform="translate(180, 80)">
        <rect x="50" y="40" width="340" height="260" rx="8" fill="#172930" stroke="#344950" stroke-width="3" />
        <!-- 3 Panes of Glass -->
        <rect x="100" y="60" width="16" height="220" fill="#78BFC7" rx="2" />
        <rect x="210" y="60" width="16" height="220" fill="#78BFC7" rx="2" />
        <rect x="320" y="60" width="16" height="220" fill="#78BFC7" rx="2" />
        <!-- Argon Gas Labels -->
        <text x="160" y="170" font-family="sans-serif" font-size="12" font-weight="700" fill="#D8EC8C" text-anchor="middle">ARGON</text>
        <text x="270" y="170" font-family="sans-serif" font-size="12" font-weight="700" fill="#D8EC8C" text-anchor="middle">ARGON</text>
        <text x="220" y="260" font-family="sans-serif" font-size="11" fill="#ADC0C3" text-anchor="middle">U-Factor 0.18 | SHGC 0.21</text>
      </g>
    `
  },
  {
    file: 'assets/images/products/product-bay-bow-1.svg',
    w: 800, h: 600,
    title: 'Bay & Bow Projection Windows',
    sub: 'Panoramic multi-angle alcove transforming interior spaces',
    badge: 'PRODUCT CATALOG',
    svg: `
      <g transform="translate(120, 70)">
        <!-- Projection angles -->
        <polygon points="0,320 60,60 200,60 140,320" fill="url(#glassGrad)" stroke="#344950" stroke-width="6" />
        <polygon points="140,320 200,60 360,60 420,320" fill="url(#glassGrad)" stroke="#087D8C" stroke-width="8" />
        <polygon points="420,320 360,60 500,60 560,320" fill="url(#glassGrad)" stroke="#344950" stroke-width="6" />
        <text x="280" y="190" font-family="sans-serif" font-size="14" font-weight="700" fill="#F1F7F5" text-anchor="middle">30° &amp; 45° ANGLED PROJECTION</text>
      </g>
    `
  },
  {
    file: 'assets/images/products/product-bay-bow-2.svg',
    w: 800, h: 600,
    title: 'Insulated Cable-Support & Head Board',
    sub: 'Structural steel tie-back system preventing sag & heat loss',
    badge: 'ENGINEERING DETAIL',
    svg: `
      <g transform="translate(180, 80)">
        <rect x="40" y="40" width="360" height="50" rx="4" fill="#20333A" stroke="#087D8C" stroke-width="4" />
        <line x1="80" y1="40" x2="220" y2="280" stroke="#D8EC8C" stroke-width="4" stroke-dasharray="6 4" />
        <line x1="360" y1="40" x2="220" y2="280" stroke="#D8EC8C" stroke-width="4" stroke-dasharray="6 4" />
        <circle cx="220" cy="280" r="16" fill="#D8EC8C" stroke="#17272E" stroke-width="3" />
        <text x="220" y="160" font-family="sans-serif" font-size="13" font-weight="700" fill="#F1F7F5" text-anchor="middle">HIGH-TENSILE CABLE TENSIONER</text>
      </g>
    `
  },
  {
    file: 'assets/images/products/product-awning-1.svg',
    w: 800, h: 600,
    title: 'Top-Hinged Awning Windows',
    sub: 'Weather-tight ventilation even during heavy rain showers',
    badge: 'PRODUCT CATALOG',
    svg: `
      <g transform="translate(180, 70)">
        <rect x="0" y="0" width="440" height="320" rx="6" fill="#1A2D35" stroke="#344950" stroke-width="10" />
        <!-- Tilted out pane -->
        <polygon points="12,12 428,12 448,300 -8,300" fill="url(#glassGrad)" stroke="#087D8C" stroke-width="6" />
        <!-- Scissor Arm -->
        <line x1="220" y1="280" x2="220" y2="330" stroke="#D8EC8C" stroke-width="4" />
        <!-- Rain Drops -->
        <circle cx="80" cy="80" r="3" fill="#78BFC7" />
        <circle cx="140" cy="120" r="3" fill="#78BFC7" />
        <circle cx="340" cy="90" r="3" fill="#78BFC7" />
        <circle cx="280" cy="140" r="3" fill="#78BFC7" />
      </g>
    `
  },
  {
    file: 'assets/images/products/product-awning-2.svg',
    w: 800, h: 600,
    title: 'Dual-Point Scissor Operator & Seal',
    sub: 'Die-cast zinc gears with dual continuous compression bulb seals',
    badge: 'MECHANICAL SPEC',
    svg: `
      <g transform="translate(180, 90)">
        <circle cx="220" cy="180" r="60" fill="#20333A" stroke="#087D8C" stroke-width="6" />
        <path d="M 220 120 L 220 80 M 220 240 L 220 280 M 160 180 L 120 180 M 280 180 L 320 180" stroke="#D8EC8C" stroke-width="4" stroke-linecap="round" />
        <circle cx="220" cy="180" r="25" fill="#D8EC8C" />
        <text x="220" y="50" font-family="sans-serif" font-size="14" font-weight="700" fill="#F1F7F5" text-anchor="middle">ROTOGEAR 4:1 MECHANICAL ADVANTAGE</text>
      </g>
    `
  },

  // Services
  {
    file: 'assets/images/services/service-assessment-2.svg',
    w: 800, h: 600,
    title: 'Blower Door Air Leakage Diagnostics',
    sub: 'Calibrated multipoint CFM50 whole-envelope air leakage testing',
    badge: 'ENERGY AUDIT',
    svg: `
      <g transform="translate(160, 60)">
        <rect x="0" y="0" width="480" height="340" rx="8" fill="#1A2D35" stroke="#D9383A" stroke-width="6" />
        <circle cx="240" cy="170" r="110" fill="#0E1B20" stroke="#344950" stroke-width="8" />
        <!-- Fan Blades -->
        <path d="M 240 170 L 210 90 A 90 90 0 0 1 270 90 Z" fill="#087D8C" />
        <path d="M 240 170 L 310 210 A 90 90 0 0 1 280 260 Z" fill="#087D8C" />
        <path d="M 240 170 L 170 240 A 90 90 0 0 1 150 190 Z" fill="#087D8C" />
        <circle cx="240" cy="170" r="30" fill="#D8EC8C" />
        <text x="240" y="315" font-family="sans-serif" font-size="13" font-weight="700" fill="#ADC0C3" text-anchor="middle">TARGET: &lt; 0.05 CFM/FT² ENVELOPE SEAL</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-measurement-1.svg',
    w: 800, h: 600,
    title: 'Precision Laser Opening Verification',
    sub: 'Sub-millimeter 3-point digital measurement for perfect fit',
    badge: 'ACCURACY PROTOCOL',
    svg: `
      <g transform="translate(160, 60)">
        <rect x="40" y="30" width="400" height="280" fill="none" stroke="#DCE5E5" stroke-width="4" stroke-dasharray="8 6" />
        <!-- Laser Crosshairs -->
        <line x1="0" y1="170" x2="480" y2="170" stroke="#D9383A" stroke-width="2" />
        <line x1="240" y1="0" x2="240" y2="340" stroke="#D9383A" stroke-width="2" />
        <!-- Digital readout -->
        <rect x="150" y="140" width="180" height="60" rx="8" fill="#17272E" stroke="#087D8C" stroke-width="2" />
        <text x="240" y="178" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="#D8EC8C" text-anchor="middle">71.875 IN</text>
        <text x="240" y="270" font-family="sans-serif" font-size="13" font-weight="600" fill="#F1F7F5" text-anchor="middle">DIAGONAL SQUARENESS TOLERANCE &lt; 1/16"</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-measurement-2.svg',
    w: 800, h: 600,
    title: 'Architectural CAD Elevation Profile',
    sub: 'Detailed jamb depth, sill bevel angle, and casing clearance specs',
    badge: 'TECHNICAL BLUEPRINT',
    svg: `
      <g transform="translate(160, 60)">
        <rect x="0" y="0" width="480" height="340" rx="6" fill="#0E1B20" stroke="#087D8C" stroke-width="3" />
        <!-- Blueprint Grid -->
        <path d="M 40 40 L 440 40 M 40 100 L 440 100 M 40 160 L 440 160 M 40 220 L 440 220 M 40 280 L 440 280" stroke="#087D8C" stroke-opacity="0.3" stroke-width="1" />
        <rect x="100" y="60" width="280" height="200" fill="none" stroke="#D8EC8C" stroke-width="3" />
        <line x1="240" y1="60" x2="240" y2="260" stroke="#D8EC8C" stroke-width="2" stroke-dasharray="4 4" />
        <text x="240" y="310" font-family="sans-serif" font-size="13" fill="#ADC0C3" text-anchor="middle">CUSTOM SILL REBATE ANGLE: 14° DRAINAGE</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-installation-1.svg',
    w: 800, h: 600,
    title: 'Certified Master Installation Standard',
    sub: 'Factory-certified crew adhering strictly to AAMA 2400 guidelines',
    badge: 'INSTALLATION EXCELLENCE',
    svg: `
      <g transform="translate(160, 60)">
        <rect x="60" y="20" width="360" height="300" rx="8" fill="#1F3640" stroke="#344950" stroke-width="8" />
        <!-- Shims & Fasteners -->
        <rect x="40" y="80" width="20" height="15" fill="#D8EC8C" />
        <rect x="40" y="240" width="20" height="15" fill="#D8EC8C" />
        <rect x="420" y="80" width="20" height="15" fill="#D8EC8C" />
        <rect x="420" y="240" width="20" height="15" fill="#D8EC8C" />
        <!-- Spirit Level Graphic -->
        <rect x="140" y="150" width="200" height="40" rx="6" fill="#087D8C" stroke="#F1F7F5" stroke-width="3" />
        <circle cx="240" cy="170" r="10" fill="#D8EC8C" />
        <line x1="230" y1="170" x2="250" y2="170" stroke="#17272E" stroke-width="2" />
        <text x="240" y="225" font-family="sans-serif" font-size="14" font-weight="700" fill="#D8EC8C" text-anchor="middle">PERFECT 0.0° VERTICAL PLUMB</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-installation-2.svg',
    w: 800, h: 600,
    title: 'Structural Fastening & Load Transfer',
    sub: 'Corrosion-proof 3" GRK fasteners anchored directly into framing',
    badge: 'ENGINEERING ANCHOR',
    svg: `
      <g transform="translate(180, 80)">
        <rect x="20" y="60" width="100" height="240" fill="#344950" />
        <rect x="120" y="60" width="20" height="240" fill="#D8EC8C" />
        <rect x="140" y="60" width="120" height="240" fill="#1F3640" stroke="#087D8C" stroke-width="4" />
        <!-- Heavy Fastener -->
        <line x1="80" y1="180" x2="220" y2="180" stroke="#F1F7F5" stroke-width="8" stroke-linecap="round" />
        <polygon points="215,172 235,180 215,188" fill="#F1F7F5" />
        <text x="220" y="30" font-family="sans-serif" font-size="14" font-weight="700" fill="#F1F7F5" text-anchor="middle">SHEAR STRENGTH RATED ANCHORING</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-weatherproofing-1.svg',
    w: 800, h: 600,
    title: 'Perimeter Low-Expansion Thermal Barrier',
    sub: 'Closed-cell polyurethane expanding foam stopping all thermal bypass',
    badge: 'AIR TIGHTNESS',
    svg: `
      <g transform="translate(160, 60)">
        <rect x="60" y="40" width="360" height="260" rx="8" fill="#172930" stroke="#344950" stroke-width="6" />
        <!-- Foam Bead Pattern -->
        <rect x="80" y="60" width="320" height="40" rx="20" fill="#D8EC8C" fill-opacity="0.85" />
        <rect x="80" y="220" width="320" height="40" rx="20" fill="#D8EC8C" fill-opacity="0.85" />
        <rect x="80" y="100" width="40" height="120" rx="20" fill="#D8EC8C" fill-opacity="0.85" />
        <rect x="360" y="100" width="40" height="120" rx="20" fill="#D8EC8C" fill-opacity="0.85" />
        <text x="240" y="165" font-family="sans-serif" font-size="15" font-weight="700" fill="#F1F7F5" text-anchor="middle">360° CONTINUOUS EXPANSION SEAL</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-weatherproofing-2.svg',
    w: 800, h: 600,
    title: 'Self-Adhered Flexible Flashing & Sill Pan',
    sub: 'Dual-sloped sloped sill pan directing water safely outdoors',
    badge: 'WATER MANAGEMENT',
    svg: `
      <g transform="translate(160, 60)">
        <polygon points="40,240 440,200 440,280 40,280" fill="#087D8C" />
        <rect x="80" y="60" width="320" height="140" fill="#17272E" stroke="#344950" stroke-width="4" />
        <!-- Drainage Water Flow Arrow -->
        <path d="M 300 180 L 360 220 L 420 260" stroke="#78BFC7" stroke-width="4" stroke-dasharray="6 4" />
        <text x="240" y="125" font-family="sans-serif" font-size="14" font-weight="700" fill="#D8EC8C" text-anchor="middle">POSITIVE SLOPE WATERPROOF SILL PAN</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-warranty-1.svg',
    w: 800, h: 600,
    title: 'Lifetime Transferable Craftsmanship Warranty',
    sub: 'Full 25-year non-prorated coverage on glass, frames, and installation',
    badge: 'PROTECTION GUARANTEE',
    svg: `
      <g transform="translate(180, 60)">
        <circle cx="220" cy="160" r="110" fill="#172930" stroke="#087D8C" stroke-width="8" />
        <polygon points="220,70 240,130 300,135 255,175 270,235 220,200 170,235 185,175 140,135 200,130" fill="url(#citronGrad)" />
        <text x="220" y="310" font-family="sans-serif" font-size="15" font-weight="700" fill="#F1F7F5" text-anchor="middle">25-YEAR TRANSFERABLE BOND</text>
      </g>
    `
  },
  {
    file: 'assets/images/services/service-warranty-2.svg',
    w: 800, h: 600,
    title: 'Annual Balance Calibration & Maintenance',
    sub: 'Complimentary 12-month tune-up verifying seals and effortless glide',
    badge: 'AFTERCARE PROGRAM',
    svg: `
      <g transform="translate(180, 80)">
        <rect x="40" y="60" width="360" height="200" rx="8" fill="#1A2D35" stroke="#344950" stroke-width="4" />
        <!-- Inspection Checklist Items -->
        <circle cx="80" cy="110" r="12" fill="#1E8E6A" />
        <text x="110" y="115" font-family="sans-serif" font-size="13" font-weight="600" fill="#F1F7F5">Sash balance tension calibrated</text>
        <circle cx="80" cy="160" r="12" fill="#1E8E6A" />
        <text x="110" y="165" font-family="sans-serif" font-size="13" font-weight="600" fill="#F1F7F5">Weatherstripping elasticity tested</text>
        <circle cx="80" cy="210" r="12" fill="#1E8E6A" />
        <text x="110" y="215" font-family="sans-serif" font-size="13" font-weight="600" fill="#F1F7F5">Locking cam alignment verified</text>
      </g>
    `
  },

  // Projects
  {
    file: 'assets/images/projects/project-coastal-1.svg',
    w: 800, h: 600,
    title: 'Coastal Residence — Oceanfront Villa',
    sub: 'Impact-resistant Category 5 triple-pane hurricane architectural glass',
    badge: 'FEATURED CASE STUDY',
    svg: `
      <g transform="translate(140, 60)">
        <rect x="0" y="0" width="520" height="340" rx="8" fill="#172930" stroke="#087D8C" stroke-width="8" />
        <rect x="16" y="16" width="488" height="308" fill="url(#glassGrad)" />
        <!-- Ocean Waves Silhouettes -->
        <path d="M 16 280 C 120 250, 240 310, 360 260 C 420 230, 480 270, 504 290 L 504 324 L 16 324 Z" fill="#087D8C" fill-opacity="0.5" />
        <text x="260" y="150" font-family="sans-serif" font-size="16" font-weight="700" fill="#D8EC8C" text-anchor="middle">PVB STRUCTURAL INTERLAYER | DP-70 RATED</text>
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-coastal-2.svg',
    w: 800, h: 600,
    title: 'Marine-Grade 316 Stainless Hardware',
    sub: 'Zero corrosion guarantee despite high-salinity maritime breezes',
    badge: 'DURABILITY METRIC',
    svg: `
      <g transform="translate(180, 70)">
        <circle cx="220" cy="170" r="90" fill="#20333A" stroke="#78BFC7" stroke-width="8" />
        <path d="M 180 170 L 210 200 L 270 140" stroke="#D8EC8C" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <text x="220" y="300" font-family="sans-serif" font-size="14" font-weight="700" fill="#F1F7F5" text-anchor="middle">3,000-HOUR ASTM B117 SALT SPRAY CERTIFIED</text>
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-historic-1.svg',
    w: 800, h: 600,
    title: 'Historic Brownstone Restoration',
    sub: 'Authentic simulated divided-lite grilles with modern 0.20 U-factor',
    badge: 'HISTORIC REVERENCE',
    svg: `
      <g transform="translate(180, 50)">
        <path d="M 40 120 C 40 40, 400 40, 400 120 L 400 350 L 40 350 Z" fill="#17272E" stroke="#8A482A" stroke-width="12" />
        <!-- Grille Pattern -->
        <line x1="40" y1="200" x2="400" y2="200" stroke="#8A482A" stroke-width="8" />
        <line x1="220" y1="60" x2="220" y2="350" stroke="#8A482A" stroke-width="8" />
        <line x1="130" y1="120" x2="130" y2="350" stroke="#8A482A" stroke-width="6" />
        <line x1="310" y1="120" x2="310" y2="350" stroke="#8A482A" stroke-width="6" />
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-historic-2.svg',
    w: 800, h: 600,
    title: 'Precision Timber-Clad Thermal Frame',
    sub: 'Exterior extruded aluminum shield with interior solid mahogany trim',
    badge: 'HERITAGE DETAIL',
    svg: `
      <g transform="translate(180, 80)">
        <rect x="40" y="40" width="360" height="200" rx="6" fill="#422518" stroke="#344950" stroke-width="6" />
        <rect x="60" y="60" width="140" height="160" fill="url(#glassGrad)" />
        <rect x="240" y="60" width="140" height="160" fill="url(#glassGrad)" />
        <text x="220" y="280" font-family="sans-serif" font-size="14" font-weight="700" fill="#D8EC8C" text-anchor="middle">LANDMARK PRESERVATION COMMISSION APPROVED</text>
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-panoramic-1.svg',
    w: 800, h: 600,
    title: 'Hillside Modernist Panoramic Pavilion',
    sub: 'Continuous 11-foot floor-to-ceiling multi-slide structural glazing',
    badge: 'CONTEMPORARY MASTERPIECE',
    svg: `
      <g transform="translate(120, 60)">
        <rect x="0" y="20" width="560" height="300" rx="4" fill="#0E1B20" stroke="#17272E" stroke-width="4" />
        <rect x="10" y="30" width="170" height="280" fill="url(#glassGrad)" stroke="#087D8C" stroke-width="4" />
        <rect x="195" y="30" width="170" height="280" fill="url(#glassGrad)" stroke="#087D8C" stroke-width="4" />
        <rect x="380" y="30" width="170" height="280" fill="url(#glassGrad)" stroke="#087D8C" stroke-width="4" />
        <text x="280" y="170" font-family="sans-serif" font-size="16" font-weight="700" fill="#D8EC8C" text-anchor="middle">54 FEET OF UNBROKEN LIVING GLASS</text>
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-panoramic-2.svg',
    w: 800, h: 600,
    title: 'Flush Floor Track Recessed Sill',
    sub: 'Completely zero-threshold barrier seamlessly uniting indoors & deck',
    badge: 'THRESHOLD DETAIL',
    svg: `
      <g transform="translate(180, 100)">
        <rect x="20" y="140" width="400" height="30" fill="#344950" />
        <rect x="140" y="20" width="20" height="120" fill="#087D8C" />
        <rect x="260" y="20" width="20" height="120" fill="#087D8C" />
        <text x="220" y="220" font-family="sans-serif" font-size="14" font-weight="700" fill="#D8EC8C" text-anchor="middle">ZERO-TRIP HAZARD ADA-COMPLIANT RUNWAY</text>
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-family-1.svg',
    w: 800, h: 600,
    title: 'Suburban Craftsman Whole-Home Retrofit',
    sub: 'Full 24-window energy modernization reducing annual heating by 42%',
    badge: 'WHOLE-HOME CASE STUDY',
    svg: `
      <g transform="translate(160, 60)">
        <polygon points="240,20 40,140 440,140" fill="#20333A" stroke="#087D8C" stroke-width="4" />
        <rect x="70" y="140" width="340" height="180" fill="#17272E" stroke="#344950" stroke-width="4" />
        <!-- Windows on house facade -->
        <rect x="100" y="170" width="60" height="80" rx="3" fill="url(#glassGrad)" stroke="#D8EC8C" stroke-width="3" />
        <rect x="320" y="170" width="60" height="80" rx="3" fill="url(#glassGrad)" stroke="#D8EC8C" stroke-width="3" />
        <rect x="210" y="190" width="60" height="130" fill="#087D8C" />
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-family-2.svg',
    w: 800, h: 600,
    title: 'Acoustic Soundproofing dB Reduction',
    sub: 'Sound Transmission Class (STC) upgraded from 26 to 36 STC rating',
    badge: 'NOISE REDUCTION METRIC',
    svg: `
      <g transform="translate(180, 80)">
        <circle cx="220" cy="150" r="80" fill="#172930" stroke="#087D8C" stroke-width="8" />
        <text x="220" y="160" font-family="'JetBrains Mono', monospace" font-size="32" font-weight="800" fill="#D8EC8C" text-anchor="middle">-14 dB</text>
        <text x="220" y="270" font-family="sans-serif" font-size="13" font-weight="600" fill="#F1F7F5" text-anchor="middle">70% PERCEIVED EXTERIOR NOISE REDUCTION</text>
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-transformation-1.svg',
    w: 800, h: 600,
    title: 'Before & After Window Transformation',
    sub: 'Dramatic upgrade from 1980s aluminum sliders to modern casements',
    badge: 'COMPARISON CASE',
    svg: `
      <g transform="translate(140, 60)">
        <!-- Before Left Side -->
        <rect x="0" y="0" width="250" height="340" fill="#242B2E" stroke="#D9383A" stroke-width="4" />
        <text x="125" y="40" font-family="sans-serif" font-size="14" font-weight="800" fill="#D9383A" text-anchor="middle">BEFORE: SINGLE-PANE</text>
        <line x1="30" y1="170" x2="220" y2="170" stroke="#61747B" stroke-width="2" />
        <text x="125" y="200" font-family="sans-serif" font-size="12" fill="#ADC0C3" text-anchor="middle">Drafts, fogging &amp; rattle</text>
        <!-- After Right Side -->
        <rect x="270" y="0" width="250" height="340" fill="#172930" stroke="#087D8C" stroke-width="6" />
        <text x="395" y="40" font-family="sans-serif" font-size="14" font-weight="800" fill="#D8EC8C" text-anchor="middle">AFTER: VITRAVA TRIPLE-PANE</text>
        <line x1="300" y1="170" x2="490" y2="170" stroke="#087D8C" stroke-width="3" />
        <text x="395" y="200" font-family="sans-serif" font-size="12" fill="#F1F7F5" text-anchor="middle">Crystal clear, zero drafts</text>
      </g>
    `
  },
  {
    file: 'assets/images/projects/project-transformation-2.svg',
    w: 800, h: 600,
    title: 'Drywall Return & Shadowline Trim Detail',
    sub: 'European-style trimless aesthetic emphasizing pure glass geometry',
    badge: 'FINISH ARCHITECTURE',
    svg: `
      <g transform="translate(180, 80)">
        <rect x="40" y="40" width="360" height="220" rx="4" fill="#1F3640" stroke="#344950" stroke-width="4" />
        <rect x="80" y="80" width="280" height="140" fill="url(#glassGrad)" stroke="#D8EC8C" stroke-width="3" />
        <text x="220" y="280" font-family="sans-serif" font-size="13" font-weight="600" fill="#ADC0C3" text-anchor="middle">MINIMAL 1/4" REVEAL CASING DETAIL</text>
      </g>
    `
  },

  // Blog: using 18 high-resolution photographic JPG assets in assets/images/blog/


  // Team
  {
    file: 'assets/images/about/team-marcus.svg',
    w: 400, h: 400,
    title: 'Marcus Vance',
    sub: 'Principal Window Architect & Founder',
    badge: 'LEADERSHIP',
    svg: `
      <g transform="translate(100, 40)">
        <circle cx="100" cy="90" r="60" fill="#172930" stroke="#087D8C" stroke-width="4" />
        <path d="M 30 240 C 30 170, 170 170, 170 240 Z" fill="#20333A" stroke="#087D8C" stroke-width="3" />
        <circle cx="100" cy="90" r="30" fill="#D8EC8C" fill-opacity="0.2" />
      </g>
    `
  },
  {
    file: 'assets/images/about/team-elena.svg',
    w: 400, h: 400,
    title: 'Elena Rostova, PE',
    sub: 'VP of Thermal Engineering & Compliance',
    badge: 'ENGINEERING',
    svg: `
      <g transform="translate(100, 40)">
        <circle cx="100" cy="90" r="60" fill="#172930" stroke="#D8EC8C" stroke-width="4" />
        <path d="M 30 240 C 30 170, 170 170, 170 240 Z" fill="#20333A" stroke="#D8EC8C" stroke-width="3" />
        <circle cx="100" cy="90" r="30" fill="#78BFC7" fill-opacity="0.2" />
      </g>
    `
  },
  {
    file: 'assets/images/about/team-david.svg',
    w: 400, h: 400,
    title: 'David Chen',
    sub: 'Master Installation Director (AAMA Certified)',
    badge: 'OPERATIONS',
    svg: `
      <g transform="translate(100, 40)">
        <circle cx="100" cy="90" r="60" fill="#172930" stroke="#78BFC7" stroke-width="4" />
        <path d="M 30 240 C 30 170, 170 170, 170 240 Z" fill="#20333A" stroke="#78BFC7" stroke-width="3" />
        <circle cx="100" cy="90" r="30" fill="#1E8E6A" fill-opacity="0.3" />
      </g>
    `
  },

  // Auth / Common
  {
    file: 'assets/images/common/auth-hero.svg',
    w: 800, h: 600,
    title: 'Vitrava Client & Installation Portal',
    sub: 'Track live fabrication, measurement scheduling, and lifetime warranty documents',
    badge: 'HOMEOWNER PORTAL',
    svg: `
      <g transform="translate(160, 60)">
        <rect x="0" y="0" width="480" height="340" rx="12" fill="#172930" stroke="#087D8C" stroke-width="4" />
        <circle cx="240" cy="140" r="50" fill="#087D8C" fill-opacity="0.2" stroke="#D8EC8C" stroke-width="4" />
        <path d="M 220 140 L 235 155 L 265 125" stroke="#D8EC8C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <text x="240" y="230" font-family="sans-serif" font-size="16" font-weight="700" fill="#F1F7F5" text-anchor="middle">REAL-TIME PROJECT TRACKING</text>
        <text x="240" y="260" font-family="sans-serif" font-size="13" fill="#ADC0C3" text-anchor="middle">Measurement &bull; Custom Fabrication &bull; Direct Installation</text>
      </g>
    `
  }
];

let count = 0;
assets.forEach(a => {
  const content = createSvg(a.w, a.h, a.title, a.sub, a.badge, a.svg);
  fs.writeFileSync(path.join(__dirname, '..', a.file), content, 'utf8');
  count++;
});

console.log(`Successfully generated ${count} architectural SVG graphics.`);
