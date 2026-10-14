/**
 * VITRAVA — Energy Savings Calculator Engine
 * Live interactive thermal and financial modeling engine.
 * Calculates energy loss reduction, annual rupee savings, 5-yr & 10-yr ROI, and payback period.
 */

(function () {
  'use strict';

  // Transparent illustrative calculation coefficients
  const MODEL_ASSUMPTIONS = {
    // Fraction of total HVAC heating/cooling bill attributed to window envelope
    climateWindowLoadFraction: {
      northern: 0.38, // Severe heating climate: 38% HVAC load through windows
      central: 0.32,  // Mixed climate: 32% HVAC load through windows
      southern: 0.34  // High solar heat gain climate: 34% HVAC load through windows
    },
    // Thermal heat loss rate relative to baseline
    glazingUValues: {
      single: { uFactor: 1.15, label: 'Single-Pane Clear (Drafty)' },
      double_old: { uFactor: 0.65, label: 'Aging Clear Dual-Pane (15+ yrs)' },
      aluminum_slider: { uFactor: 0.85, label: 'Uninsulated Metal Frame' }
    },
    // New Vitrava replacement performance
    vitravaGlazing: {
      dual_argon: { uFactor: 0.26, reductionRatio: 0.58, label: 'Performance Dual-Pane Low-E Argon' },
      triple_krypton: { uFactor: 0.16, reductionRatio: 0.74, label: 'Signature Triple-Pane Krypton Ultra-Low-E' }
    },
    // Average annual energy cost inflation rate
    energyInflationRate: 0.035
  };

  class EnergyCalculator {
    constructor(container) {
      this.container = container;
      this.form = container.querySelector('#energy-calculator-form');
      if (!this.form) return;

      this.cacheDom();
      this.bindEvents();
      this.calculate(); // Initial run
    }

    cacheDom() {
      // Inputs
      this.windowCountInput = this.form.querySelector('#calc-window-count');
      this.windowCountVal = this.form.querySelector('#calc-window-count-val');
      this.windowSizeSelect = this.form.querySelector('#calc-window-size');
      this.existingGlazingSelect = this.form.querySelector('#calc-existing-glazing');
      this.proposedGlazingSelect = this.form.querySelector('#calc-proposed-glazing');
      this.climateSelect = this.form.querySelector('#calc-climate-zone');
      this.hvacBillInput = this.form.querySelector('#calc-hvac-bill');
      this.projectBudgetInput = this.form.querySelector('#calc-project-budget');
      this.resetBtn = this.form.querySelector('#calc-reset-btn');
      this.printBtn = this.container.querySelector('#calc-print-btn');

      // Outputs
      this.annualSavingsEl = this.container.querySelector('#out-annual-savings');
      this.fiveYearSavingsEl = this.container.querySelector('#out-5yr-savings');
      this.tenYearSavingsEl = this.container.querySelector('#out-10yr-savings');
      this.lossReductionEl = this.container.querySelector('#out-loss-reduction');
      this.paybackYearsEl = this.container.querySelector('#out-payback-years');
      this.co2OffsetEl = this.container.querySelector('#out-co2-offset');

      // Visual Comparison Bars
      this.barLossOldEl = this.container.querySelector('#bar-loss-old');
      this.barLossNewEl = this.container.querySelector('#bar-loss-new');
      this.barLabelOldEl = this.container.querySelector('#bar-label-old');
      this.barLabelNewEl = this.container.querySelector('#bar-label-new');
    }

    bindEvents() {
      // Input event listeners for immediate recalculation
      const inputs = [
        this.windowCountInput,
        this.windowSizeSelect,
        this.existingGlazingSelect,
        this.proposedGlazingSelect,
        this.climateSelect,
        this.hvacBillInput,
        this.projectBudgetInput
      ];

      inputs.forEach((input) => {
        if (!input) return;
        input.addEventListener('input', () => this.calculate());
        input.addEventListener('change', () => this.calculate());
      });

      // Synchronize slider counter display
      if (this.windowCountInput && this.windowCountVal) {
        this.windowCountInput.addEventListener('input', (e) => {
          this.windowCountVal.textContent = e.target.value;
        });
      }

      // Reset
      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.form.reset();
          if (this.windowCountVal && this.windowCountInput) {
            this.windowCountVal.textContent = this.windowCountInput.value;
          }
          this.calculate();
          if (window.VitravaToast) {
            window.VitravaToast.show('Calculator inputs reset to defaults', 'info');
          }
        });
      }

      // Print-friendly report
      if (this.printBtn) {
        this.printBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.print();
        });
      }
    }

    calculate() {
      const windowCount = parseInt(this.windowCountInput?.value || 15, 10);
      const sizeMultiplier = parseFloat(this.windowSizeSelect?.value || 1.0);
      const existingKey = this.existingGlazingSelect?.value || 'single';
      const proposedKey = this.proposedGlazingSelect?.value || 'triple_krypton';
      const climateKey = this.climateSelect?.value || 'northern';
      const annualHvacBill = Math.max(500, parseFloat(this.hvacBillInput?.value || 2800));
      const projectBudget = parseFloat(this.projectBudgetInput?.value || 0);

      const climateFraction = MODEL_ASSUMPTIONS.climateWindowLoadFraction[climateKey] || 0.35;
      const oldU = MODEL_ASSUMPTIONS.glazingUValues[existingKey]?.uFactor || 1.0;
      const proposedData = MODEL_ASSUMPTIONS.vitravaGlazing[proposedKey] || MODEL_ASSUMPTIONS.vitravaGlazing.triple_krypton;
      const newU = proposedData.uFactor;

      // Reduction efficiency between existing and proposed window U-factor
      const rawImprovement = Math.max(0.2, (oldU - newU) / oldU);
      // Window coverage factor (normal home has ~20 windows total)
      const coverageRatio = Math.min(1.2, (windowCount * sizeMultiplier) / 18);

      // Estimated energy loss reduction percentage
      const windowLossReductionPct = Math.round(rawImprovement * 100);

      // Annual rupee savings calculation
      // Savings = (Total HVAC Bill * Window Load Fraction) * Window Thermal Improvement * Window Coverage
      const annualBaseWindowCost = annualHvacBill * climateFraction;
      const annualSavings = Math.round(annualBaseWindowCost * rawImprovement * Math.min(1.0, coverageRatio));

      // 5-Year and 10-Year cumulative savings with compounding energy inflation
      let fiveYearTotal = 0;
      let tenYearTotal = 0;
      let currentYearSavings = annualSavings;

      for (let y = 1; y <= 10; y++) {
        if (y <= 5) fiveYearTotal += currentYearSavings;
        tenYearTotal += currentYearSavings;
        currentYearSavings *= 1 + MODEL_ASSUMPTIONS.energyInflationRate;
      }

      fiveYearTotal = Math.round(fiveYearTotal);
      tenYearTotal = Math.round(tenYearTotal);

      // Payback calculation
      let paybackYears = 'N/A';
      if (projectBudget > 0 && annualSavings > 0) {
        const years = (projectBudget / annualSavings).toFixed(1);
        paybackYears = `${years} yrs`;
      }

      // Carbon offset calculation (~0.85 lbs CO2 per currency unit saved in grid power/gas)
      const co2LbsAnnual = Math.round(annualSavings * 2.8);

      // Render Outputs
      this.updateOutput(this.annualSavingsEl, `₹${annualSavings.toLocaleString()}`);
      this.updateOutput(this.fiveYearSavingsEl, `₹${fiveYearTotal.toLocaleString()}`);
      this.updateOutput(this.tenYearSavingsEl, `₹${tenYearTotal.toLocaleString()}`);
      this.updateOutput(this.lossReductionEl, `${windowLossReductionPct}%`);
      this.updateOutput(this.paybackYearsEl, paybackYears);
      this.updateOutput(this.co2OffsetEl, `${co2LbsAnnual.toLocaleString()} lbs/yr`);

      // Update Visual Comparison Bars
      if (this.barLossOldEl && this.barLossNewEl) {
        const oldHeatLossPct = 100;
        const newHeatLossPct = Math.max(22, 100 - windowLossReductionPct);

        this.barLossOldEl.style.width = '100%';
        this.barLossNewEl.style.width = `${newHeatLossPct}%`;

        if (this.barLabelOldEl) this.barLabelOldEl.textContent = '100% Thermal Waste Baseline';
        if (this.barLabelNewEl) this.barLabelNewEl.textContent = `${newHeatLossPct}% Residual Loss (${windowLossReductionPct}% Thermal Energy Retained)`;
      }
    }

    updateOutput(element, value) {
      if (!element) return;
      if (element.textContent !== value) {
        element.textContent = value;
        element.classList.add('calc-updated');
        setTimeout(() => element.classList.remove('calc-updated'), 300);
      }
    }
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-widget="energy-calculator"]').forEach((container) => {
      new EnergyCalculator(container);
    });
  });

  window.VitravaEnergyCalculator = EnergyCalculator;
})();
