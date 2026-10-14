/**
 * VITRAVA — Theme & Localization Controller
 * Handles Light/Dark mode toggling, LocalStorage persistence, and RTL layout support.
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'vitrava-theme-pref';
  const DIR_STORAGE_KEY = 'vitrava-dir-pref';

  // Determine initial theme: saved in localStorage or OS system preference
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme to document root
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update all theme toggle buttons on page
    document.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      const lightIcon = btn.querySelector('.theme-icon-light');
      const darkIcon = btn.querySelector('.theme-icon-dark');
      if (lightIcon && darkIcon) {
        if (theme === 'dark') {
          lightIcon.style.display = 'block';
          darkIcon.style.display = 'none';
        } else {
          lightIcon.style.display = 'none';
          darkIcon.style.display = 'block';
        }
      }
    });

    window.dispatchEvent(new CustomEvent('vitrava-theme-changed', { detail: { theme } }));
  }

  // Determine initial layout direction (LTR / RTL)
  function getPreferredDir() {
    const saved = localStorage.getItem(DIR_STORAGE_KEY);
    return saved === 'rtl' ? 'rtl' : 'ltr';
  }

  // Apply layout direction
  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_STORAGE_KEY, dir);

    document.querySelectorAll('[data-action="toggle-rtl"]').forEach((btn) => {
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
      const textSpan = btn.querySelector('.rtl-btn-text');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });

    window.dispatchEvent(new CustomEvent('vitrava-dir-changed', { detail: { dir } }));
  }

  // Initialize immediately to prevent flash of wrong theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  const initialDir = getPreferredDir();
  applyDir(initialDir);

  // Bind event listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Re-apply to ensure icons and buttons sync
    applyTheme(getPreferredTheme());
    applyDir(getPreferredDir());

    // Theme toggle button clicks
    document.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('[data-action="toggle-theme"]');
      if (themeBtn) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      }

      const rtlBtn = e.target.closest('[data-action="toggle-rtl"]');
      if (rtlBtn) {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDir(newDir);
      }
    });

    // Listen for OS system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

  // Export to window for programmatic access
  window.VitravaTheme = {
    getTheme: () => document.documentElement.getAttribute('data-theme'),
    setTheme: applyTheme,
    getDir: () => document.documentElement.getAttribute('dir'),
    setDir: applyDir
  };
})();
