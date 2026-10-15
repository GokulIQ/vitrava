/**
 * VITRAVA — Master Frontend Interactions & Form Validation Engine
 * Handles Navigation, Modals, Toasts, Before/After Sliders, Product Configurator,
 * Filtering, Search, and Commercial Client-Side Validation.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const ToastSystem = {
    container: null,

    init() {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(this.container);
      }
    },

    show(message, type = 'info', duration = 4000) {
      this.init();

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.setAttribute('role', 'alert');

      let iconSvg = '';
      if (type === 'success') {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-success); flex-shrink: 0;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      } else if (type === 'error') {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-danger); flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      } else {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-primary); flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
      }

      toast.innerHTML = `
        ${iconSvg}
        <div style="flex: 1; font-size: 0.9rem; line-height: 1.4;">${message}</div>
        <button type="button" aria-label="Close notification" style="background: none; border: none; cursor: pointer; color: var(--color-text-muted); padding: 0.1rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      `;

      const closeBtn = toast.querySelector('button');
      closeBtn.addEventListener('click', () => this.dismiss(toast));

      this.container.appendChild(toast);

      // Trigger transition
      requestAnimationFrame(() => {
        toast.classList.add('is-visible');
      });

      if (duration > 0) {
        setTimeout(() => this.dismiss(toast), duration);
      }
    },

    dismiss(toast) {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', () => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      });
    }
  };

  window.VitravaToast = ToastSystem;

  /* ==========================================================================
     2. MODAL DIALOG CONTROLLER
     ========================================================================== */
  const ModalController = {
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Focus first actionable input or close button
      const focusable = modal.querySelector('button, [href], input, select, textarea');
      if (focusable) focusable.focus();
    },

    close(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    },

    init() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-target]');
        if (trigger) {
          e.preventDefault();
          const targetId = trigger.getAttribute('data-modal-target');
          this.open(targetId);
        }

        const closeBtn = e.target.closest('[data-modal-close]');
        if (closeBtn) {
          e.preventDefault();
          const modal = closeBtn.closest('.modal');
          if (modal) this.close(modal.id);
        }
      });

      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const openModal = document.querySelector('.modal.is-open');
          if (openModal) this.close(openModal.id);
        }
      });
    }
  };

  window.VitravaModal = ModalController;

  /* ==========================================================================
     3. MOBILE DRAWER NAVIGATION & ACCORDIONS
     ========================================================================== */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const drawer = document.getElementById('mobile-drawer');
    const toggleBtn = document.querySelector('[data-action="toggle-mobile-menu"]');
    const closeBtn = document.querySelector('[data-action="close-mobile-menu"]');
    const overlay = drawer?.querySelector('.mobile-drawer-overlay');

    // Let desktop dropdowns open on click as well as hover/focus.
    const desktopDropdowns = Array.from(document.querySelectorAll('.desktop-nav .nav-dropdown'));
    desktopDropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(':scope > .nav-link');
      const menu = dropdown.querySelector(':scope > .dropdown-menu');
      if (!trigger || !menu) return;

      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', (event) => {
        if (window.matchMedia('(max-width: 1279px)').matches) return;

        event.preventDefault();
        const isOpen = dropdown.classList.contains('is-open');

        desktopDropdowns.forEach((otherDropdown) => {
          otherDropdown.classList.remove('is-open');
          otherDropdown.querySelector(':scope > .dropdown-menu')?.classList.remove('is-active');
          otherDropdown.querySelector(':scope > .nav-link')?.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          dropdown.classList.add('is-open');
          menu.classList.add('is-active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      // Smooth mouse leave closing
      let leaveTimer;
      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(leaveTimer);
      });
      dropdown.addEventListener('mouseleave', () => {
        leaveTimer = setTimeout(() => {
          dropdown.classList.remove('is-open');
          dropdown.querySelector(':scope > .dropdown-menu')?.classList.remove('is-active');
          dropdown.querySelector(':scope > .nav-link')?.setAttribute('aria-expanded', 'false');
        }, 160);
      });

      // Close dropdown when any link inside is clicked
      menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          dropdown.classList.remove('is-open');
          menu.classList.remove('is-active');
          trigger.setAttribute('aria-expanded', 'false');
        });
      });
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest('.desktop-nav .nav-dropdown')) return;
      desktopDropdowns.forEach((dropdown) => {
        dropdown.classList.remove('is-open');
        dropdown.querySelector(':scope > .dropdown-menu')?.classList.remove('is-active');
        dropdown.querySelector(':scope > .nav-link')?.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (drawer?.classList.contains('is-open')) {
        closeDrawer();
      }
      desktopDropdowns.forEach((dropdown) => {
        if (!dropdown.classList.contains('is-open')) return;
        dropdown.classList.remove('is-open');
        dropdown.querySelector(':scope > .dropdown-menu')?.classList.remove('is-active');
        const trigger = dropdown.querySelector(':scope > .nav-link');
        trigger?.setAttribute('aria-expanded', 'false');
        trigger?.focus();
      });
    });

    // Sticky header shadow
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }, { passive: true });
    }

    // Drawer open / close
    if (toggleBtn && drawer) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.addEventListener('click', () => {
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        toggleBtn.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => drawer.querySelector('a[href], button:not([disabled])')?.focus());
      });
    }

    const closeDrawer = () => {
      if (drawer) {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
        toggleBtn?.setAttribute('aria-expanded', 'false');
        toggleBtn?.focus();
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Close mobile drawer when any link inside is clicked
    drawer?.querySelectorAll('.mobile-drawer-content a').forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || !drawer?.classList.contains('is-open')) return;
      const focusable = Array.from(drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        .filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    });

    // Mobile submenu accordions
    document.querySelectorAll('.mobile-nav-toggle').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.closest('.mobile-nav-item');
        if (parent) {
          const isOpen = parent.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', String(isOpen));
        }
      });
    });

    // General FAQ Accordions
    document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isOpen = item.classList.contains('is-open');

        // Optional single open behavior
        const parentAccordion = item.closest('[data-accordion-single]');
        if (parentAccordion) {
          parentAccordion.querySelectorAll('.accordion-item').forEach((i) => {
            i.classList.remove('is-open');
            const itemTrigger = i.querySelector('.accordion-trigger');
            if (itemTrigger) itemTrigger.setAttribute('aria-expanded', 'false');
          });
        }

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ==========================================================================
     4. BEFORE & AFTER INTERACTIVE COMPARISON SLIDERS
     ========================================================================== */
  function initPointerComparison(container) {
    const slider = container.querySelector('.compare-slider-input');
    if (!slider) return;
    const oldLabel = container.querySelector('.compare-badge-before');
    const newLabel = container.querySelector('.compare-badge-after');
    let pointerId = null;

    const update = (value) => {
      const percent = Math.round(Math.max(0, Math.min(100, Number(value))));
      slider.value = String(percent);
      slider.setAttribute('aria-valuetext', `${percent}% old window, ${100 - percent}% new window`);
      container.style.setProperty('--reveal-position', `${percent}%`);
      if (oldLabel) oldLabel.hidden = percent < 20;
      if (newLabel) newLabel.hidden = percent > 80;
    };
    const updateFromPointer = (event) => {
      const rect = slider.getBoundingClientRect();
      if (rect.width) update((event.clientX - rect.left) / rect.width * 100);
    };

    slider.addEventListener('input', () => update(slider.value));
    slider.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      event.preventDefault();
      pointerId = event.pointerId;
      slider.focus({ preventScroll: true });
      slider.setPointerCapture(pointerId);
      updateFromPointer(event);
    });
    slider.addEventListener('pointermove', (event) => {
      if (event.pointerId === pointerId) updateFromPointer(event);
    });
    const stopDragging = () => { pointerId = null; };
    slider.addEventListener('pointerup', stopDragging);
    slider.addEventListener('pointercancel', stopDragging);
    slider.addEventListener('lostpointercapture', stopDragging);
    update(slider.value);
  }

  function initComparisonSliders() {
    document.querySelectorAll('.compare-container').forEach((container) => {
      if (container.matches('.thermal-reveal, .home2-reveal, .projects-reveal')) {
        initPointerComparison(container);
        return;
      }
      const slider = container.querySelector('.compare-slider-input');
      const overlay = container.querySelector('.compare-overlay');
      const handle = container.querySelector('.compare-handle');

      if (!slider || !overlay) return;

      const updateSlider = (val) => {
        const pct = Math.max(0, Math.min(100, val));
        overlay.style.width = `${pct}%`;
        if (handle) handle.style.left = `${pct}%`;
      };

      slider.addEventListener('input', (e) => {
        updateSlider(e.target.value);
      });

      // Mouse drag on container
      let isDragging = false;
      const onMove = (e) => {
        if (!isDragging) return;
        const rect = container.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const offset = clientX - rect.left;
        const pct = (offset / rect.width) * 100;
        slider.value = pct;
        updateSlider(pct);
      };

      container.addEventListener('mousedown', (e) => { isDragging = true; onMove(e); });
      window.addEventListener('mouseup', () => { isDragging = false; });
      window.addEventListener('mousemove', onMove);

      container.addEventListener('touchstart', (e) => { isDragging = true; onMove(e); }, { passive: true });
      window.addEventListener('touchend', () => { isDragging = false; });
      window.addEventListener('touchmove', onMove, { passive: true });
    });
  }

  /* ==========================================================================
     5. PROJECT FILTERING & BLOG REAL-TIME SEARCH
     ========================================================================== */
  function initFilteringAndSearch() {
    // Project Category Filtering
    const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
    const projectCards = document.querySelectorAll('[data-project-category]');

    if (projectFilterBtns.length > 0 && projectCards.length > 0) {
      projectFilterBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetCategory = btn.getAttribute('data-project-filter');

          projectFilterBtns.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');

          projectCards.forEach((card) => {
            const cardCat = card.getAttribute('data-project-category');
            if (targetCategory === 'all' || cardCat === targetCategory) {
              card.style.removeProperty('display');
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // Blog Category Filtering & Live Keyword Search
    const blogSearchInput = document.getElementById('blog-search-input');
    const blogCategoryPills = document.querySelectorAll('[data-blog-category]');
    const blogArticles = document.querySelectorAll('[data-article-category]');
    const blogEmptyState = document.getElementById('blog-empty-state');
    const blogResetBtn = document.getElementById('blog-reset-filter');

    if (blogArticles.length > 0) {
      let activeCat = 'all';
      let activeQuery = '';

      const filterArticles = () => {
        let visibleCount = 0;
        blogArticles.forEach((article) => {
          const articleCat = article.getAttribute('data-article-category') || '';
          const title = article.querySelector('h2, h3')?.textContent.toLowerCase() || '';
          const desc = article.querySelector('p')?.textContent.toLowerCase() || '';

          const matchesCat = activeCat === 'all' || articleCat === activeCat;
          const matchesQuery = !activeQuery || title.includes(activeQuery) || desc.includes(activeQuery);

          if (matchesCat && matchesQuery) {
            article.style.display = 'block';
            visibleCount++;
          } else {
            article.style.display = 'none';
          }
        });

        if (blogEmptyState) {
          blogEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      };

      if (blogSearchInput) {
        blogSearchInput.addEventListener('input', (e) => {
          activeQuery = e.target.value.trim().toLowerCase();
          filterArticles();
        });
      }

      blogCategoryPills.forEach((pill) => {
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          blogCategoryPills.forEach((p) => p.classList.remove('active'));
          pill.classList.add('active');
          activeCat = pill.getAttribute('data-blog-category');
          filterArticles();
        });
      });

      if (blogResetBtn) {
        blogResetBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (blogSearchInput) blogSearchInput.value = '';
          activeQuery = '';
          activeCat = 'all';
          blogCategoryPills.forEach((p) => {
            if (p.getAttribute('data-blog-category') === 'all') p.classList.add('active');
            else p.classList.remove('active');
          });
          filterArticles();
        });
      }
    }
  }

  /* ==========================================================================
     7. FORM CLIENT-SIDE VALIDATION ENGINE
     ========================================================================== */
  function validateEmail(email) {
    return /^[^\s@]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/.test(email.trim());
  }

  function validatePhone(phone) {
    return /^\d{10}$/.test(phone.trim());
  }

  function validateName(name) {
    return name.trim().length >= 3;
  }

  function setFieldError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    let errorEl = group.querySelector('.form-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error-msg';
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearFieldError(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    const errorEl = group.querySelector('.form-error-msg');
    if (errorEl) errorEl.textContent = '';
  }

  function initFormValidation() {
    document.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.setAttribute('inputmode', 'numeric');
      input.setAttribute('maxlength', '10');
      input.setAttribute('pattern', '[0-9]{10}');
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 10);
      });
    });

    // 1. Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = contactForm.querySelector('#contact-name');
        const emailInput = contactForm.querySelector('#contact-email');
        const phoneInput = contactForm.querySelector('#contact-phone');
        const messageInput = contactForm.querySelector('#contact-message');

        if (!validateName(nameInput.value)) {
          setFieldError(nameInput, 'Name must be at least 3 characters');
          isValid = false;
        } else clearFieldError(nameInput);

        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
          setFieldError(emailInput, 'Please provide a valid email address');
          isValid = false;
        } else clearFieldError(emailInput);

        if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) {
          setFieldError(phoneInput, 'Enter a 10-digit phone number');
          isValid = false;
        } else clearFieldError(phoneInput);

        if (!messageInput.value.trim()) {
          setFieldError(messageInput, 'Please describe your inquiry');
          isValid = false;
        } else clearFieldError(messageInput);

        if (isValid) {
          contactForm.reset();
          ToastSystem.show('Inquiry received! A Vitrava specialist will contact you within 24 hours.', 'success');
        }
      });
    }

    // 2. Request a Quote Form
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = quoteForm.querySelector('#quote-name');
        const emailInput = quoteForm.querySelector('#quote-email');
        const phoneInput = quoteForm.querySelector('#quote-phone');
        const windowCount = quoteForm.querySelector('#quote-window-count');
        const styleSelect = quoteForm.querySelector('#quote-window-style');
        const addressInput = quoteForm.querySelector('#quote-address');
        const consentCheckbox = quoteForm.querySelector('#quote-consent');

        if (!validateName(nameInput.value)) { setFieldError(nameInput, 'Name must be at least 3 characters'); isValid = false; } else clearFieldError(nameInput);
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) { setFieldError(emailInput, 'Valid email required'); isValid = false; } else clearFieldError(emailInput);
        if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) { setFieldError(phoneInput, 'Enter a 10-digit phone number'); isValid = false; } else clearFieldError(phoneInput);
        if (!addressInput.value.trim()) { setFieldError(addressInput, 'Property address required'); isValid = false; } else clearFieldError(addressInput);

        if (consentCheckbox && !consentCheckbox.checked) {
          ToastSystem.show('Please accept the project terms to submit your quote request.', 'error');
          isValid = false;
        }

        if (isValid) {
          const newQuote = window.VitravaPortal?.submitQuoteRequest({
            name: nameInput.value,
            windowCount: windowCount?.value || 10,
            windowStyle: styleSelect?.value || 'Casement'
          });

          quoteForm.reset();
          ToastSystem.show(`Estimate submitted! Reference ID: ${newQuote?.id || 'QUO-8821'}. View in your portal.`, 'success');
          setTimeout(() => {
            window.location.href = 'dashboard/quotes.html';
          }, 1500);
        }
      });
    }

    // 3. Book a Measurement Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      // Restrict past dates
      const dateInput = bookingForm.querySelector('#booking-date');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
      }

      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = bookingForm.querySelector('#booking-name');
        const emailInput = bookingForm.querySelector('#booking-email');
        const phoneInput = bookingForm.querySelector('#booking-phone');
        const addressInput = bookingForm.querySelector('#booking-address');
        const dateInput = bookingForm.querySelector('#booking-date');
        const slotSelect = bookingForm.querySelector('#booking-slot');

        if (!validateName(nameInput.value)) { setFieldError(nameInput, 'Name must be at least 3 characters'); isValid = false; } else clearFieldError(nameInput);
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) { setFieldError(emailInput, 'Valid email required'); isValid = false; } else clearFieldError(emailInput);
        if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) { setFieldError(phoneInput, 'Enter a 10-digit phone number'); isValid = false; } else clearFieldError(phoneInput);
        if (!addressInput.value.trim()) { setFieldError(addressInput, 'Property address required'); isValid = false; } else clearFieldError(addressInput);
        if (!dateInput.value) { setFieldError(dateInput, 'Select preferred appointment date'); isValid = false; } else clearFieldError(dateInput);

        if (isValid) {
          const newApt = window.VitravaPortal?.bookMeasurement({
            date: dateInput.value,
            timeSlot: slotSelect?.value || '09:00 AM – 11:00 AM'
          });

          bookingForm.reset();
          ToastSystem.show(`Measurement Appointment Confirmed! Assigned reference: ${newApt?.id || 'APT-1050'}.`, 'success');
          setTimeout(() => {
            window.location.href = 'dashboard/appointments.html';
          }, 1500);
        }
      });
    }

    // 4. Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const emailInput = loginForm.querySelector('#login-email');
        const passInput = loginForm.querySelector('#login-password');

        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
          setFieldError(emailInput, 'Please enter a valid email');
          isValid = false;
        } else clearFieldError(emailInput);

        if (!passInput.value.trim() || passInput.value.length < 6) {
          setFieldError(passInput, 'Password must be at least 6 characters');
          isValid = false;
        } else clearFieldError(passInput);

        if (isValid) {
          loginForm.reset();
          passInput.setAttribute('type', 'password');
          const passwordToggle = loginForm.querySelector('[data-action="toggle-password"]');
          if (passwordToggle) {
            passwordToggle.textContent = 'Show';
            passwordToggle.setAttribute('aria-label', 'Show password');
          }
          ToastSystem.show('Login successful!', 'success');
        }
      });
    }

    // Password Show/Hide Toggle
    document.querySelectorAll('[data-action="toggle-password"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = btn.closest('.form-group')?.querySelector('input[type="password"], input[type="text"]');
        if (input) {
          const isPassword = input.getAttribute('type') === 'password';
          input.setAttribute('type', isPassword ? 'text' : 'password');
          btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
          if (btn.classList.contains('auth-card__password-toggle')) {
            btn.textContent = isPassword ? 'Hide' : 'Show';
          }
        }
      });
    });

    // 5. Registration Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const nameInput = registerForm.querySelector('#reg-name');
        const emailInput = registerForm.querySelector('#reg-email');
        const phoneInput = registerForm.querySelector('#reg-phone');
        const passInput = registerForm.querySelector('#reg-password');
        const confirmPassInput = registerForm.querySelector('#reg-password-confirm');
        const termsCheckbox = registerForm.querySelector('#reg-terms');

        if (!validateName(nameInput.value)) { setFieldError(nameInput, 'Name must be at least 3 characters'); isValid = false; } else clearFieldError(nameInput);
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) { setFieldError(emailInput, 'Valid email required'); isValid = false; } else clearFieldError(emailInput);
        if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) { setFieldError(phoneInput, 'Enter a 10-digit phone number'); isValid = false; } else clearFieldError(phoneInput);

        if (!passInput.value || passInput.value.length < 8) {
          setFieldError(passInput, 'Password must be at least 8 characters');
          isValid = false;
        } else clearFieldError(passInput);

        if (passInput.value !== confirmPassInput.value) {
          setFieldError(confirmPassInput, 'Passwords do not match');
          isValid = false;
        } else clearFieldError(confirmPassInput);

        if (termsCheckbox && !termsCheckbox.checked) {
          ToastSystem.show('You must agree to the Terms of Service to register.', 'error');
          isValid = false;
        }

        if (isValid) {
          ToastSystem.show('Account created successfully! Redirecting to login...', 'success');
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 1200);
        }
      });
    }

    // 6. Forgot Password Form
    const forgotForm = document.getElementById('forgot-form');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = forgotForm.querySelector('#forgot-email');
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
          setFieldError(emailInput, 'Please provide a valid account email');
          return;
        }
        clearFieldError(emailInput);
        forgotForm.reset();
        ToastSystem.show('Password reset instructions sent! Please check your inbox.', 'success');
      });
    }

    // 7. Profile Form (Portal)
    const profileForm = document.getElementById('portal-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = profileForm.querySelector('#profile-name');
        const emailInput = profileForm.querySelector('#profile-email');
        const phoneInput = profileForm.querySelector('#profile-phone');
        const address = profileForm.querySelector('#profile-address')?.value;

        let isValid = true;
        if (!validateName(nameInput.value)) { setFieldError(nameInput, 'Name must be at least 3 characters'); isValid = false; } else clearFieldError(nameInput);
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) { setFieldError(emailInput, 'Please provide a valid email address'); isValid = false; } else clearFieldError(emailInput);
        if (!validatePhone(phoneInput.value)) { setFieldError(phoneInput, 'Enter a 10-digit phone number'); isValid = false; } else clearFieldError(phoneInput);
        if (!isValid) return;

        window.VitravaPortal?.updateProfile({ name: nameInput.value.trim(), email: emailInput.value.trim(), phone: phoneInput.value, address });
        ToastSystem.show('Profile and contact preferences updated successfully!', 'success');
      });
    }
  }

  /* ==========================================================================
     8. CLIENT PORTAL DYNAMIC VIEWS & ACTIONS
     ========================================================================== */
  function initPortalInteractions() {
    // Quote Approval in Portal
    document.addEventListener('click', (e) => {
      const approveBtn = e.target.closest('[data-action="approve-quote"]');
      if (approveBtn) {
        e.preventDefault();
        const quoteId = approveBtn.getAttribute('data-quote-id');
        window.VitravaPortal?.approveQuote(quoteId);
        approveBtn.textContent = 'Approved ✓';
        approveBtn.classList.remove('btn-primary');
        approveBtn.classList.add('btn-secondary');
        approveBtn.disabled = true;
        ToastSystem.show(`Quote ${quoteId} approved! Custom fabrication order confirmed.`, 'success');
      }

      // Appointment Cancellation in Portal
      const cancelAptBtn = e.target.closest('[data-action="cancel-appointment"]');
      if (cancelAptBtn) {
        e.preventDefault();
        const aptId = cancelAptBtn.getAttribute('data-appointment-id');
        if (confirm(`Are you sure you want to cancel appointment ${aptId}?`)) {
          window.VitravaPortal?.cancelAppointment(aptId);
          const card = cancelAptBtn.closest('.appointment-card');
          if (card) {
            const badge = card.querySelector('.badge');
            if (badge) {
              badge.textContent = 'Cancelled';
              badge.className = 'badge badge-muted';
            }
          }
          ToastSystem.show(`Appointment ${aptId} has been cancelled.`, 'info');
        }
      }

      // Reschedule Appointment in Portal
      const rescheduleBtn = e.target.closest('[data-action="reschedule-appointment"]');
      if (rescheduleBtn) {
        e.preventDefault();
        const aptId = rescheduleBtn.getAttribute('data-appointment-id');
        const modal = document.getElementById('reschedule-modal');
        if (modal) {
          modal.setAttribute('data-target-apt', aptId);
          ModalController.open('reschedule-modal');
        }
      }
    });

    // Handle Reschedule Modal Form Submission
    const rescheduleForm = document.getElementById('reschedule-form');
    if (rescheduleForm) {
      rescheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modal = document.getElementById('reschedule-modal');
        const aptId = modal?.getAttribute('data-target-apt');
        const newDate = rescheduleForm.querySelector('#reschedule-date')?.value;
        const newTime = rescheduleForm.querySelector('#reschedule-time')?.value;

        if (aptId && newDate && newTime) {
          window.VitravaPortal?.rescheduleAppointment(aptId, newDate, newTime);
          ModalController.close('reschedule-modal');
          ToastSystem.show(`Appointment ${aptId} rescheduled to ${newDate} (${newTime})`, 'success');
          setTimeout(() => window.location.reload(), 1000);
        }
      });
    }
  }

  // Master Initializer
  document.addEventListener('DOMContentLoaded', () => {
    ModalController.init();
    initNavigation();
    initComparisonSliders();
    initFilteringAndSearch();
    initFormValidation();
    initPortalInteractions();
  });
})();
