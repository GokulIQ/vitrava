# Vitrava — Smarter Windows. Better Living.
## Premium Energy-Efficient Window Replacement Company Multipage HTML5 Template

**Vitrava** is a commercial-grade, fully responsive, multipage HTML5 website template engineered specifically for professional energy-efficient window replacement businesses, residential glazing contractors, and architectural window specialists.

Crafted for submission to **ThemeForest** and **TemplateMonster**, Vitrava features a modern European-inspired architectural aesthetic, comprehensive thermal engineering science content, an interactive live Energy Savings Calculator, two distinct homepages, full client installation tracking portal, dual theme system (Light & Dark), and full RTL layout support.

---

### Key Features & Specifications

- **51 Production-Ready Standalone HTML Pages**: Fully interconnected with zero broken links.
- **Two Distinct Homepages**:
  - `index.html`: Home 01 — Energy Savings, Convective Draft Elimination, and High-Conversion Focus.
  - `home-02.html`: Home 02 — Modern Architectural Glazing, Luxury Home Transformation, and Editorial Aesthetic.
- **Max 7 Content Sections Rule**: Strict adherence across all pages for optimal pacing, readability, and zero fluff.
- **Interactive Energy Savings Calculator (`calculator.html`)**: Real-time formula calculating annual rupee savings, window heat loss reduction, 5-yr/10-yr ROI, simple payback period, visual before/after comparison bars, and printable report.
- **Full Client Installation Portal (`dashboard/`)**:
  - `overview.html`: Live 6-stage project status, appointment summary, assigned concierge.
  - `project.html`: Detailed milestone tracker, window inventory table with dimensions and glazing specs.
  - `appointments.html`: Upcoming & past visits, modal rescheduling, and cancellation simulation.
  - `quotes.html`: Line-item proposal breakdown with demo approval action and print simulation.
  - `documents.html`: Downloadable 25-Year transferable warranty deed and NFRC ratings sheets.
  - `profile.html`: Homeowner contact information and appearance preferences.
- **Interactive Before & After Comparison Sliders**: Mouse and touch draggable sliders comparing old drafted windows with triple-pane installations.
- **Product Spec Configurator**: Interactive swatches for frame finishes (Obsidian Black, Arctic White, Bronze, Natural Pine) and glazing selectors with live U-factor/SHGC updating.
- **Real-Time Search & Filtering**: Real-time keyword search and category filtering for Blog and Projects with empty states.
- **Complete Dual-Theme System**: Accessible Light & Dark mode with LocalStorage persistence and system preference sync.
- **RTL Language Compatibility**: Native support for Right-to-Left languages (Arabic, Hebrew) using CSS logical properties.
- **Commercial-Grade Form Validation**: Client-side validation on all forms (Contact, Quote Request, Appointment Booking, Login, Registration, Password Reset, Profile) with accessible inline feedback and toasts.
- **Zero Third-Party JS Framework Dependencies**: Built with vanilla ES modules for lightning-fast 100/100 Lighthouse performance.

---

### Project Sitemap & File Structure

```text
vitrava-window-template/
│
├── index.html                                   # Home 01 (Energy Savings & Conversion)
├── home-02.html                                 # Home 02 (Architectural & Luxury Transformation)
├── about.html                                   # About Us (Vision, Philosophy, Team & Certifications)
├── services.html                                # Services Directory (6 Services)
├── products.html                                # Window Products Directory (6 Styles)
├── projects.html                                # Completed Installations Directory (Filterable)
├── blog.html                                    # Knowledge Hub (Search & Category Filters)
├── calculator.html                              # Dedicated Interactive Energy Savings Calculator
├── pricing.html                                 # Pricing & Financing (3 Packages & Comparison Table)
├── contact.html                                 # Contact Us & Regional Showroom Info
├── quote.html                                   # Request a Quote Multi-Field Form
├── booking.html                                 # Book a Measurement (Date & Slot Selector)
├── login.html                                   # Client Portal Login (with Demo Autofill)
├── register.html                                # Client Account Registration
├── forgot-password.html                         # Password Recovery
├── 404.html                                     # Architectural 404 Error Page
├── coming-soon.html                             # Launch Countdown Page
│
├── services/                                    # 6 Detailed Service Pages
│   ├── residential-replacement.html
│   ├── energy-assessment.html
│   ├── custom-measurement.html
│   ├── professional-installation.html
│   ├── weatherproofing-air-sealing.html
│   └── warranty-aftercare.html
│
├── products/                                    # 6 Detailed Window Product Pages
│   ├── casement.html
│   ├── double-hung.html
│   ├── sliding.html
│   ├── picture.html
│   ├── bay-bow.html
│   └── awning.html
│
├── projects/                                    # 6 Installation Case Study Pages
│   ├── modern-suburban.html
│   ├── coastal-residence.html
│   ├── historic-modernization.html
│   ├── panoramic-installation.html
│   ├── family-renovation.html
│   └── casement-transformation.html
│
├── blog/                                        # 9 In-Depth Building Science Articles
│   ├── how-windows-reduce-heat-transfer.html
│   ├── double-vs-triple-glazing.html
│   ├── signs-home-needs-window-replacement.html
│   ├── understanding-u-factor-shgc.html
│   ├── casement-vs-double-hung.html
│   ├── prepare-for-window-installation.html
│   ├── window-frame-materials-compared.html
│   ├── reduce-drafts-improve-comfort.html
│   └── window-replacement-costs-guide.html
│
├── dashboard/                                   # Client Installation Portal
│   ├── index.html                               # Redirects to overview.html
│   ├── overview.html                            # Dashboard Overview
│   ├── project.html                             # 6-Stage Project Tracker & Inventory
│   ├── appointments.html                        # Measurement & Installation Schedule
│   ├── quotes.html                              # Proposals, Approval Action & Invoices
│   ├── documents.html                           # 25-Yr Warranty Deed & NFRC Specs
│   └── profile.html                             # Homeowner Profile & Settings
│
├── assets/
│   ├── css/
│   │   └── style.css                            # Master CSS System with Theme Tokens & RTL
│   ├── js/
│   │   ├── theme.js                             # Theme (Light/Dark) & RTL Controller
│   │   ├── portal.js                            # Client Portal LocalStorage Simulation
│   │   ├── calculator.js                        # Energy Savings Calculator Engine
│   │   └── main.js                              # Master Navigation, Modals, Sliders, & Validation
│   └── images/
│       ├── hero/                                # Original High-Res Hero Photographs
│       ├── products/                            # Product Primary & Detail Assets
│       ├── services/                            # Service Primary & Detail Assets
│       ├── projects/                            # Project Case Study Photography
│       ├── blog/                                # Knowledge Hub Technical Visuals
│       └── about/                               # Team Executive Portraits
│
├── scripts/                                     # Node.js Build & Asset Automation Scripts
│   ├── build-all.js                             # Master Orchestrator
│   ├── builder-core.js                          # Shared Headers, Footers, and Layouts
│   ├── generate-assets.js                       # SVG Architectural Vector Asset Generator
│   ├── generate-pages-core.js                   # Core Public Pages Builder
│   ├── generate-pages-services.js               # Services Pages Builder
│   ├── generate-pages-products.js               # Products Pages Builder
│   ├── generate-pages-projects.js               # Projects Pages Builder
│   ├── generate-pages-blog.js                   # Blog Articles Builder
│   └── generate-pages-portal.js                 # Client Portal Pages Builder
│
├── tests/
│   └── verify-links.js                          # Automated QA Link, Image & Section Auditor
│
├── documentation/
│   └── index.html                               # Offline Visual Documentation
└── package.json                                 # Node package definitions & npm scripts
```

---

### Quick Start & Development

1. **Direct Browser Preview (Zero Build Required)**:
   - Double-click `index.html` or open any file directly in Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge.
   - All links, styles, and scripts use standard relative paths and work seamlessly offline.

2. **Local Web Server**:
   ```bash
   # Run with any static server:
   npx serve .
   # OR with Python:
   python -m http.server 3000
   ```

3. **Rebuilding the Template**:
   ```bash
   npm run build
   ```

4. **Running Automated QA Verification**:
   ```bash
   npm test
   ```
   Audits all 51 HTML files, verifying:
   - 3,387+ internal links resolve to existing files.
   - 106+ image assets exist on disk.
   - Section count rule (&le; 7 main content sections per page).
   - Zero console or syntax errors.

---

### Customization Guide for Buyers

#### 1. Changing Brand Name, Logo, & Phone
Open `scripts/builder-core.js` and modify:
- `VITRAVA` brand name.
- `(800) 555-VITRAVA` phone number.
- `ICONS.logo` SVG definition.
Re-run `npm run build` to update all 51 pages simultaneously in 2 seconds.

#### 2. Modifying Color Palette
Open `assets/css/style.css` and customize the CSS root variables:
```css
:root {
  --color-text-main: #17272E;    /* Deep Graphite */
  --color-bg-main: #F7FAF9;      /* Frost White */
  --color-surface: #FFFFFF;      /* Surface / Pure White */
  --color-primary: #087D8C;      /* Ocean Teal */
  --color-primary-hover: #066572;
  --color-accent: #DDEFEA;       /* Sea Glass */
  --color-highlight: #D8EC8C;    /* Soft Citron */
  --color-text-muted: #61747B;   /* Cool Slate */
  --color-border: #DCE5E5;
}
```

#### 3. Connecting Forms to a Live Backend
All forms in `assets/js/main.js` currently use client-side demonstration handlers with instant user toasts. To connect to your backend API or email service (such as Formspree, Formkeep, Netlify Forms, or PHP mailer):
Replace the `form.addEventListener('submit', ...)` handler with standard `fetch('/api/quote', { method: 'POST', body: ... })`.

#### 4. Demo Login Credentials
To test the client portal without typing:
- Go to `login.html`.
- Click the **"Quick Fill Demo Customer Credentials"** button.
- Default Email: `a.hayes@example.com`
- Default Password: `Vitrava2026!`

---

### Browser Compatibility & Standards

- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, iOS Safari, Android Chrome.
- **Accessibility**: WCAG 2.2 AA compliant contrast, ARIA landmarks, focus-visible outlines, and screen-reader accessible forms.
- **Performance**: Optimized fluid typography with `clamp()`, lazy-loaded images, zero heavy JavaScript runtimes.

---

&copy; 2026 Vitrava Window Replacement Technologies. Built for commercial marketplace deployment.
