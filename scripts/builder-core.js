const fs = require('fs');
const path = require('path');

// Helper to determine relative root path for subdirectories
function getRelRoot(depth = 0) {
  if (depth === 0) return './';
  if (depth === 1) return '../';
  return '../../';
}

// Global SVG Icons
const ICONS = {
  logo: `<svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="32" height="32" rx="6" fill="#087D8C"/>
    <rect x="6" y="6" width="10" height="10" rx="2" fill="#DDEFEA"/>
    <rect x="20" y="6" width="10" height="10" rx="2" fill="#DDEFEA"/>
    <rect x="6" y="20" width="10" height="10" rx="2" fill="#DDEFEA"/>
    <rect x="20" y="20" width="10" height="10" rx="2" fill="#D8EC8C"/>
    <line x1="18" y1="2" x2="18" y2="34" stroke="#17272E" stroke-width="2"/>
    <line x1="2" y1="18" x2="34" y2="18" stroke="#17272E" stroke-width="2"/>
  </svg>`,
  sun: `<svg class="theme-icon-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg class="theme-icon-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-primary); flex-shrink: 0;"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  chevronDown: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  close: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  leaf: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7z"></path><path d="M11 20v-9"></path></svg>`,
  thermometer: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`
};

// Common Header Generator
function renderHeader(depth = 0, activeNav = '') {
  const root = getRelRoot(depth);
  return `
  <!-- Accessibility Skip Link -->
  <a href="#main-content" style="position: absolute; top: -100px; left: 1rem; z-index: 9999; padding: 0.5rem 1rem; background: var(--color-primary); color: #fff; border-radius: 4px; transition: top 0.2s;" onfocus="this.style.top='1rem'" onblur="this.style.top='-100px'">Skip to main content</a>

  <!-- Primary Site Header -->
  <header class="site-header">
    <div class="container-custom" style="display: flex; justify-content: space-between; align-items: center; height: 4.75rem;">
      <!-- Brand Logo -->
      <a href="${root}index.html" class="site-brand" aria-label="Vitrava Windows Home">
        ${ICONS.logo}
        <span class="site-brand__text">
          <span class="site-brand__name">VITRAVA</span>
          <span class="site-brand__tagline">Smarter Windows</span>
        </span>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="desktop-nav" aria-label="Main Navigation">
        <!-- Home Dropdown -->
        <div class="nav-dropdown">
          <a href="${root}index.html" class="nav-link ${activeNav === 'home' ? 'active' : ''}">
            Home ${ICONS.chevronDown}
          </a>
          <div class="dropdown-menu">
            <a href="${root}index.html" class="dropdown-item">
              <div>
                <strong style="display: block;">Home 01 — Energy Savings</strong>
                <small style="color: var(--color-text-muted);">Conversion &amp; Thermal Efficiency</small>
              </div>
            </a>
            <a href="${root}home-02.html" class="dropdown-item">
              <div>
                <strong style="display: block;">Home 02 — Architectural</strong>
                <small style="color: var(--color-text-muted);">Editorial &amp; Luxury Renovation</small>
              </div>
            </a>
          </div>
        </div>

        <a href="${root}about.html" class="nav-link ${activeNav === 'about' ? 'active' : ''}">About</a>

        <!-- Services Dropdown (Services & Styles) -->
        <div class="nav-dropdown">
          <a href="${root}services.html" class="nav-link ${activeNav === 'services' ? 'active' : ''}">
            Services ${ICONS.chevronDown}
          </a>
          <div class="dropdown-menu dropdown-menu--services">
            <div class="dropdown-services-header">
              <span class="dropdown-category-title">Installation &amp; Engineering Services</span>
              <a href="${root}services.html" class="dropdown-view-all">All Services &rarr;</a>
            </div>
            <div class="dropdown-services-grid">
              <a href="${root}services/residential-replacement.html" class="dropdown-item">
                <div><strong>Residential Replacement</strong><small>Turnkey whole-home transformation</small></div>
              </a>
              <a href="${root}services/energy-assessment.html" class="dropdown-item">
                <div><strong>Energy Assessment</strong><small>FLIR thermal diagnostics</small></div>
              </a>
              <a href="${root}services/custom-measurement.html" class="dropdown-item">
                <div><strong>Custom Measurement</strong><small>Laser opening survey</small></div>
              </a>
              <a href="${root}services/professional-installation.html" class="dropdown-item">
                <div><strong>Certified Installation</strong><small>AAMA 2400 anchoring</small></div>
              </a>
              <a href="${root}services/weatherproofing-air-sealing.html" class="dropdown-item">
                <div><strong>Weatherproofing &amp; Sealing</strong><small>Perimeter thermal seal</small></div>
              </a>
              <a href="${root}services/warranty-aftercare.html" class="dropdown-item">
                <div><strong>25-Year Warranty</strong><small>Non-prorated transferable bond</small></div>
              </a>
            </div>
            <div class="dropdown-services-footer">
              <a href="${root}services.html#window-styles" class="dropdown-item dropdown-item--highlight">
                <div><strong>Explore 6 Window Styles &rarr;</strong><small>Casement, Double-Hung, Sliding &amp; more</small></div>
              </a>
            </div>
          </div>
        </div>

        <a href="${root}projects.html" class="nav-link ${activeNav === 'projects' ? 'active' : ''}">Projects</a>
        <a href="${root}calculator.html" class="nav-link ${activeNav === 'calculator' ? 'active' : ''}">Calculator</a>
        <a href="${root}pricing.html" class="nav-link ${activeNav === 'pricing' ? 'active' : ''}">Pricing</a>
        <a href="${root}blog.html" class="nav-link ${activeNav === 'blog' ? 'active' : ''}">Blog</a>
        <a href="${root}contact.html" class="nav-link ${activeNav === 'contact' ? 'active' : ''}">Contact</a>
        <a href="${root}dashboard/overview.html" class="nav-link${activeNav === 'portal' ? ' active' : ''}">Dashboard</a>
      </nav>

      <!-- Right Utility Actions -->
      <div style="display: flex; align-items: center; gap: 0.65rem;">
        <!-- Theme Toggle -->
        <button type="button" class="btn btn-secondary btn-icon nav-theme-toggle" data-action="toggle-theme" aria-label="Toggle color theme" title="Toggle Light/Dark Theme">
          <svg class="theme-icon-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg class="theme-icon-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
        <button type="button" class="btn btn-secondary btn-sm nav-rtl-toggle" data-action="toggle-rtl" aria-label="Toggle text direction" title="Toggle LTR/RTL Layout">
          <span class="rtl-btn-text">RTL</span>
        </button>
        <!-- Login -->
        <a href="${root}login.html" class="btn btn-secondary btn-sm desktop-only nav-login">Login</a>

        <!-- Primary CTA -->
        <a href="${root}booking.html" class="btn btn-primary btn-sm desktop-only" style="margin-inline-start: 0.25rem;">
          Free Measurement
        </a>

        <!-- Mobile Menu Toggle -->
        <button type="button" class="btn btn-secondary btn-icon mobile-only" data-action="toggle-mobile-menu" aria-label="Open navigation menu">
          ${ICONS.menu}
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Off-Canvas Drawer -->
  <div id="mobile-drawer" class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
    <div class="mobile-drawer-overlay"></div>
    <div class="mobile-drawer-content">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.15rem 1.25rem; border-bottom: 1px solid var(--color-border); gap: 0.5rem;">
        <a href="${root}index.html" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none;">
          ${ICONS.logo}
          <span style="font-size: 1.2rem; font-weight: 800; color: var(--color-text-main);">VITRAVA</span>
        </a>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <button type="button" class="btn btn-secondary btn-icon" data-action="close-mobile-menu" aria-label="Close navigation menu" style="width: 36px; height: 36px;">
            ${ICONS.close}
          </button>
        </div>
      </div>

      <div style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; flex: 1; overflow-y: auto;">
        <a href="${root}index.html" class="portal-nav-link">Home 01 — Energy Savings</a>
        <a href="${root}home-02.html" class="portal-nav-link">Home 02 — Architectural</a>
        <a href="${root}about.html" class="portal-nav-link">About Company</a>
        <a href="${root}services.html" class="portal-nav-link">Services &amp; Window Styles</a>
        <a href="${root}projects.html" class="portal-nav-link">Completed Projects</a>
        <a href="${root}calculator.html" class="portal-nav-link">Energy Savings Calculator</a>
        <a href="${root}pricing.html" class="portal-nav-link">Pricing &amp; Financing</a>
        <a href="${root}blog.html" class="portal-nav-link">Knowledge Hub (Blog)</a>
        <a href="${root}contact.html" class="portal-nav-link">Contact Us</a>
        <hr style="border: none; border-top: 1px solid var(--color-border); margin-block: 0.5rem;">
        <a href="${root}dashboard/overview.html" class="portal-nav-link" style="color: var(--color-primary); font-weight: 700;">Customer Dashboard</a>
      </div>

      <div style="padding: 1.15rem 1.25rem; border-top: 1px solid var(--color-border); display: flex; flex-direction: column; gap: 0.65rem;">
        <a href="${root}login.html" class="btn btn-secondary nav-login" style="width: 100%;">Login</a>
        <a href="${root}booking.html" class="btn btn-primary" style="width: 100%;">Book Measurement</a>
        <a href="${root}quote.html" class="btn btn-outline" style="width: 100%;">Request Free Quote</a>
      </div>
    </div>
  </div>

  <style>
    @media (max-width: 1279px) {
      .desktop-nav, .desktop-only { display: none !important; }
      .mobile-only { display: inline-flex !important; }
    }
    @media (min-width: 1280px) {
      .mobile-only { display: none !important; }
    }
  </style>
  `;
}

// Common Footer Generator
function renderFooter(depth = 0) {
  const root = getRelRoot(depth);
  return `
  <footer class="site-footer">
    <div class="container-custom">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 3rem; margin-bottom: 3.5rem;">
        <!-- Column 1: Brand & Credibility -->
        <div>
          <div class="site-brand">
            ${ICONS.logo}
            <span class="site-brand__text">
              <span class="site-brand__name">VITRAVA</span>
              <span class="site-brand__tagline">Smarter Windows</span>
            </span>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6; margin-bottom: 1.5rem;">
            Architectural precision and next-generation thermal window engineering. Transforming residential comfort, daylight quality, and energy efficiency.
          </p>
          <nav class="footer-social" aria-label="Social media">
            <a class="footer-social__link" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube (opens in a new tab)" title="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
            </a>
            <a class="footer-social__link" href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter, opens in a new tab)" title="X (formerly Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z"/></svg>
            </a>
            <a class="footer-social__link" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0Z"/></svg>
            </a>
          </nav>
        </div>

        <!-- Column 2: Window Styles -->
        <div>
          <h4 style="color: var(--color-text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 1.25rem;">Window Products</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem;">
            <li><a href="${root}products/casement.html" class="footer-link">Casement Windows</a></li>
            <li><a href="${root}products/double-hung.html" class="footer-link">Double-Hung Windows</a></li>
            <li><a href="${root}products/sliding.html" class="footer-link">Horizontal Sliding Windows</a></li>
            <li><a href="${root}products/picture.html" class="footer-link">Architectural Picture Windows</a></li>
            <li><a href="${root}products/bay-bow.html" class="footer-link">Bay &amp; Bow Windows</a></li>
            <li><a href="${root}products/awning.html" class="footer-link">Top-Hinged Awning Windows</a></li>
          </ul>
        </div>

        <!-- Column 3: Installation Services -->
        <div>
          <h4 style="color: var(--color-text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 1.25rem;">Our Services</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem;">
            <li><a href="${root}services/residential-replacement.html" class="footer-link">Residential Window Replacement</a></li>
            <li><a href="${root}services/energy-assessment.html" class="footer-link">Energy Efficiency Assessment</a></li>
            <li><a href="${root}services/custom-measurement.html" class="footer-link">Custom Window Measurement</a></li>
            <li><a href="${root}services/professional-installation.html" class="footer-link">Professional Window Installation</a></li>
            <li><a href="${root}services/weatherproofing-air-sealing.html" class="footer-link">Weatherproofing &amp; Air Sealing</a></li>
            <li><a href="${root}services/warranty-aftercare.html" class="footer-link">25-Year Warranty &amp; Aftercare</a></li>
          </ul>
        </div>

        <!-- Column 4: Quick Links & Contact -->
        <div>
          <h4 style="color: var(--color-text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 1.25rem;">Direct Inquiries</h4>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin-bottom: 0.75rem;">
            Direct Headquarters:<br>
            <strong style="color: var(--color-text-main);">780 Architectural Parkway, Suite 400<br>Portland, OR 97204</strong>
          </p>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin-bottom: 1.25rem;">
            Direct Phone: <a href="tel:18005558487" style="color: var(--color-primary); font-weight: 700;">(800) 555-VITRAVA</a><br>
            Email: <a href="mailto:inquiry@vitravawindows.com" style="color: var(--color-primary);">inquiry@vitravawindows.com</a>
          </p>
          <div style="display: flex; gap: 0.75rem;">
            <a href="${root}booking.html" class="btn btn-highlight btn-sm">Book Measurement</a>
            <a href="${root}quote.html" class="btn btn-outline btn-sm">Request Quote</a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div style="border-top: 1px solid var(--color-border); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: var(--color-text-muted);">
        <div>
          &copy; 2026 Vitrava Window Replacement Technologies. All rights reserved. Commercial HTML Template.
        </div>

      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="${root}assets/js/theme.js"></script>
  <script src="${root}assets/js/portal.js"></script>
  <script src="${root}assets/js/calculator.js"></script>
  <script src="${root}assets/js/main.js"></script>
  `;
}

// Common Client Portal Sidebar
function renderPortalSidebar(depth = 1, active = 'overview') {
  const root = getRelRoot(depth);
  return `
  <aside class="portal-sidebar">
    <a href="${root}index.html" class="site-brand" aria-label="Vitrava Home 01" style="padding-bottom: 1.25rem; border-bottom: 1px solid var(--color-border);">
      ${ICONS.logo}
      <span class="site-brand__text">
        <span class="site-brand__name">VITRAVA</span>
        <span class="site-brand__tagline">Smarter Windows</span>
      </span>
    </a>

    <!-- Customer Card -->
    <div style="background-color: var(--color-card-muted); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); display: flex; align-items: center; gap: 0.75rem;">
      <img src="${root}assets/images/testimonials/customer-alexander.jpg" alt="Alexander Hayes" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-surface); box-shadow: 0 0 0 1px var(--color-border); flex-shrink: 0;" loading="lazy">
      <div style="min-width: 0;">
        <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em;">Active Homeowner</div>
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Alexander Hayes</div>
        <div style="font-size: 0.75rem; color: var(--color-primary); font-family: var(--font-mono); margin-top: 2px;">PROJECT #VIT-2026-8841</div>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav style="display: flex; flex-direction: column; gap: 0.35rem; flex: 1;">
      <a href="${root}dashboard/overview.html" class="portal-nav-link ${active === 'overview' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        Overview
      </a>
      <a href="${root}dashboard/project.html" class="portal-nav-link ${active === 'project' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        My Installation Project
      </a>
      <a href="${root}dashboard/appointments.html" class="portal-nav-link ${active === 'appointments' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        Appointments
      </a>
      <a href="${root}dashboard/quotes.html" class="portal-nav-link ${active === 'quotes' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12M6 7h12M6 3h3a5 5 0 0 1 0 10H6l10 8"></path></svg>
        Quotes &amp; Estimates
      </a>
      <a href="${root}dashboard/documents.html" class="portal-nav-link ${active === 'documents' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Warranty &amp; Documents
      </a>
      <a href="${root}dashboard/profile.html" class="portal-nav-link ${active === 'profile' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        Profile &amp; Settings
      </a>
    </nav>

    <!-- Bottom Portal Utilities -->
    <div style="border-top: 1px solid var(--color-border); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="${root}login.html" class="btn btn-outline btn-sm" style="width: 100%;">
        Log out
      </a>
    </div>
  </aside>
  `;
}

// Display controls shared by every dashboard page.
function renderPortalUtilities() {
  return `
      <div class="portal-utilities no-print" role="group" aria-label="Dashboard display settings">
        <button type="button" class="btn btn-secondary btn-icon" data-action="toggle-theme" aria-label="Toggle color theme" title="Toggle Light/Dark Theme">
          ${ICONS.sun}
          ${ICONS.moon}
        </button>
        <button type="button" class="btn btn-secondary btn-sm" data-action="toggle-rtl" aria-label="Toggle text direction" title="Toggle LTR/RTL Layout" style="min-width: 2.75rem; height: 44px; padding: 0.35rem 0.45rem; white-space: nowrap; flex: 0 0 auto;">
          <span class="rtl-btn-text">RTL</span>
        </button>
      </div>`;
}

// Compact portal navigation for screens where the sidebar is hidden.
function renderPortalNavigation(depth = 1) {
  const root = getRelRoot(depth);
  return `
  <a class="portal-skip-link" href="#main-content">Skip to main content</a>
  <div class="portal-mobile-bar no-print">
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.85rem 1.25rem;">
      <a href="${root}dashboard/overview.html" class="site-brand" style="gap: 0.5rem; text-decoration: none;">
        ${ICONS.logo}
        <span class="site-brand__text">
          <span class="site-brand__name" style="font-size: 1.15rem;">VITRAVA</span>
          <span class="site-brand__tagline" style="font-size: 0.55rem; color: var(--color-primary); font-weight: 700;">Client Portal</span>
        </span>
      </a>
      <div style="display: flex; align-items: center; gap: 0.45rem;">
        <button type="button" class="btn btn-secondary btn-icon" data-action="toggle-portal-menu" aria-label="Toggle portal menu" aria-expanded="false" style="width: 36px; height: 36px;">
          ${ICONS.menu}
        </button>
      </div>
    </div>
    <div id="portal-mobile-menu" class="portal-mobile-menu" style="display: none; border-top: 1px solid var(--color-border); background-color: var(--color-surface); padding: 1rem 1.25rem;">
      <nav aria-label="Client portal navigation" style="display: flex; flex-direction: column; gap: 0.35rem;">
        <a class="portal-nav-link" href="${root}dashboard/overview.html">Overview</a>
        <a class="portal-nav-link" href="${root}dashboard/project.html">My Installation Project</a>
        <a class="portal-nav-link" href="${root}dashboard/appointments.html">Appointments</a>
        <a class="portal-nav-link" href="${root}dashboard/quotes.html">Quotes &amp; Estimates</a>
        <a class="portal-nav-link" href="${root}dashboard/documents.html">Warranty &amp; Documents</a>
        <a class="portal-nav-link" href="${root}dashboard/profile.html">Profile &amp; Settings</a>
        <hr style="border: none; border-top: 1px solid var(--color-border); margin-block: 0.5rem;">
        <a class="portal-nav-link" href="${root}index.html" style="color: var(--color-primary); font-weight: 600;">&larr; Return to Main Website</a>
        <a class="portal-nav-link" href="${root}login.html" style="color: var(--color-danger); font-weight: 600;">Log out</a>
      </nav>
    </div>
  </div>`;
}

// Master HTML Wrapper
function wrapHtml(title, description, bodyContent, depth = 0, activeNav = '', extraHead = '', layout = 'default') {
  const root = getRelRoot(depth);
  const isAuth = layout === 'auth';
  const authControls = isAuth ? renderPortalUtilities()
    .replace('portal-utilities', 'auth-utilities')
    .replace('Dashboard display settings', 'Display settings') : '';
  return `<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="light">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" sizes="any" href="${root}assets/images/common/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Vitrava Energy-Efficient Windows</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="energy efficient windows, window replacement, triple pane windows, casement windows, double hung windows, architectural windows, thermal insulation">
  <meta property="og:title" content="${title} | Vitrava Windows">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${root}assets/images/hero/home-01-hero.jpg">
  <!-- Immediate Theme & Direction Initialization (Prevents FOUC) -->
  <script>
    (function() {
      try {
        var t = localStorage.getItem('vitrava-theme-pref') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', t);
        var d = localStorage.getItem('vitrava-dir-pref');
        if (d) document.documentElement.setAttribute('dir', d);
      } catch (e) {}
    })();
  </script>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Master Stylesheet -->
  <link rel="stylesheet" href="${root}assets/css/style.css">
  ${extraHead}
</head>
<body${isAuth ? ' class="auth-page"' : ''}>
  ${isAuth ? `<a class="portal-skip-link" href="#main-content">Skip to main content</a>${authControls}` : activeNav === 'portal' ? renderPortalNavigation(depth) : renderHeader(depth, activeNav)}
  <main id="main-content">
    ${bodyContent}
  </main>
  ${isAuth ? `
  <script src="${root}assets/js/theme.js"></script>
  <script src="${root}assets/js/portal.js"></script>
  <script src="${root}assets/js/main.js"></script>` : renderFooter(depth)}
</body>
</html>`;
}

// Export common generators
module.exports = {
  wrapHtml,
  renderPortalSidebar,
  renderPortalUtilities,
  ICONS,
  getRelRoot
};
