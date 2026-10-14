/**
 * VITRAVA — Client Installation Portal Engine
 * Manages customer project simulation, milestones, appointment scheduling,
 * quote approval, document generation, and LocalStorage state persistence.
 */

(function () {
  'use strict';

  const PORTAL_STORAGE_KEY = 'vitrava-client-portal-v1';

  // Seed default demonstration project data
  const DEFAULT_PORTAL_DATA = {
    customer: {
      name: 'Alexander & Sarah Hayes',
      email: 'a.hayes@example.com',
      phone: '(555) 382-9104',
      address: '742 Evergreen Terrace, Oakridge Heights, OR 97201',
      preferredContact: 'email'
    },
    project: {
      id: 'VIT-2026-8841',
      title: 'Whole-Home Triple-Pane Window Replacement (16 Units)',
      windowStyles: '10 Casement, 4 Awning, 2 Panoramic Picture Windows',
      glazing: 'Signature Triple-Pane Krypton (U-0.16)',
      frameFinish: 'Architectural Matte Obsidian',
      totalInvestment: '₹18,450.00',
      depositPaid: '₹6,000.00',
      balanceDue: '₹12,450.00',
      currentStageIndex: 3, // 0-based index (Stage 4: Manufacturing)
      stageProgressPct: 68,
      stages: [
        { name: 'Initial Design Consultation', date: 'Oct 02, 2026', status: 'completed' },
        { name: 'Precision Laser Measurement', date: 'Oct 06, 2026', status: 'completed' },
        { name: 'Custom Specification & Quote Approved', date: 'Oct 08, 2026', status: 'completed' },
        { name: 'Factory Precision Manufacturing', date: 'In Progress (68%)', status: 'active' },
        { name: 'White-Glove Installation', date: 'Nov 02, 2026', status: 'scheduled' },
        { name: 'Final Inspection & 25-Yr Warranty', date: 'Nov 04, 2026', status: 'pending' }
      ]
    },
    appointments: [
      {
        id: 'APT-1049',
        type: 'White-Glove Window Installation',
        date: '2026-11-02',
        displayDate: 'Monday, Nov 02, 2026',
        timeSlot: '08:30 AM – 04:30 PM',
        specialist: 'David Chen, Master Certified Installer',
        status: 'Confirmed'
      },
      {
        id: 'APT-0982',
        type: 'Preliminary Laser Measurement',
        date: '2026-10-06',
        displayDate: 'Tuesday, Oct 06, 2026',
        timeSlot: '10:00 AM – 11:30 AM',
        specialist: 'Marcus Vance, Principal Architect',
        status: 'Completed'
      }
    ],
    quotes: [
      {
        id: 'QUO-4491',
        title: 'Whole-Home Signature Triple-Pane Package',
        date: 'Oct 07, 2026',
        units: 16,
        amount: '₹18,450.00',
        status: 'Approved',
        items: [
          { desc: '10x Vitrava Architectural Casement Windows (Triple-Glaze Krypton)', total: '₹11,500.00' },
          { desc: '4x Vitrava Top-Hinged Awning Windows (Bath & Kitchen)', total: '₹3,800.00' },
          { desc: '2x Architectural Fixed Picture Windows (Double-Height Great Room)', total: '₹2,400.00' },
          { desc: 'Certified AAMA 2400 Installation & Perimeter Foam Sealing', total: 'Included' },
          { desc: '25-Year Non-Prorated Transferable Warranty Certificate', total: 'Included' }
        ]
      },
      {
        id: 'QUO-4380',
        title: 'Alternate Option: Essential Double-Hung Package',
        date: 'Oct 05, 2026',
        units: 16,
        amount: '₹13,200.00',
        status: 'Archived',
        items: [
          { desc: '16x Vitrava Essential Double-Hung Windows (Dual-Glaze Argon)', total: '₹13,200.00' }
        ]
      }
    ],
    documents: [
      {
        id: 'DOC-WARR-01',
        title: '25-Year Transferable Lifetime Warranty Certificate',
        type: 'Warranty Deed',
        fileSize: '1.4 MB',
        date: 'Oct 08, 2026',
        verified: true
      },
      {
        id: 'DOC-SPEC-02',
        title: 'Architectural Window Specifications & NFRC Energy Ratings Sheet',
        type: 'Technical Spec',
        fileSize: '2.8 MB',
        date: 'Oct 08, 2026',
        verified: true
      },
      {
        id: 'DOC-CARE-03',
        title: 'Homeowner Maintenance & Hardware Care Handbook',
        type: 'Guide',
        fileSize: '850 KB',
        date: 'Oct 08, 2026',
        verified: true
      }
    ]
  };

  class ClientPortalManager {
    constructor() {
      this.data = this.loadData();
    }

    loadData() {
      try {
        const stored = localStorage.getItem(PORTAL_STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          // Update saved currency labels without changing amounts or customer data.
          const updateAmount = (record, key) => {
            if (typeof record?.[key] === 'string') {
              record[key] = record[key].replace(/^\$(?=\d)/, '₹');
            }
          };
          ['totalInvestment', 'depositPaid', 'balanceDue'].forEach((key) => updateAmount(data.project, key));
          data.quotes?.forEach((quote) => {
            updateAmount(quote, 'amount');
            quote.items?.forEach((item) => updateAmount(item, 'total'));
          });
          if (JSON.stringify(data) !== stored) this.saveData(data);
          return data;
        }
      } catch (e) {
        console.warn('Could not parse stored portal data, resetting to defaults.', e);
      }
      this.saveData(DEFAULT_PORTAL_DATA);
      return DEFAULT_PORTAL_DATA;
    }

    saveData(data) {
      this.data = data;
      localStorage.setItem(PORTAL_STORAGE_KEY, JSON.stringify(this.data));
    }

    // Public method to add an appointment from the public booking form
    bookMeasurement(bookingInfo) {
      const newApt = {
        id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'Complimentary In-Home Laser Measurement',
        date: bookingInfo.date,
        displayDate: bookingInfo.date,
        timeSlot: bookingInfo.timeSlot || '09:00 AM – 11:00 AM',
        specialist: 'Assigned Master Measurement Specialist',
        status: 'Confirmed'
      };

      this.data.appointments.unshift(newApt);
      this.saveData(this.data);
      return newApt;
    }

    // Public method to submit quote request
    submitQuoteRequest(quoteInfo) {
      const newQuote = {
        id: `QUO-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `${quoteInfo.windowStyle || 'Custom'} Window Replacement Package`,
        date: 'Just Now',
        units: parseInt(quoteInfo.windowCount || 10, 10),
        amount: `₹${(parseInt(quoteInfo.windowCount || 10, 10) * 850).toLocaleString()}.00`,
        status: 'Under Review',
        items: [
          { desc: `${quoteInfo.windowCount || 10}x Custom Windows (${quoteInfo.windowStyle || 'Selected Styles'})`, total: 'Calculated' },
          { desc: 'Complete Tear-out, Clean Disposal & AAMA Installation', total: 'Included' }
        ]
      };

      this.data.quotes.unshift(newQuote);
      this.saveData(this.data);
      return newQuote;
    }

    // Reschedule appointment
    rescheduleAppointment(aptId, newDate, newTime) {
      const apt = this.data.appointments.find((a) => a.id === aptId);
      if (apt) {
        apt.date = newDate;
        apt.displayDate = newDate;
        apt.timeSlot = newTime;
        apt.status = 'Rescheduled';
        this.saveData(this.data);
        return true;
      }
      return false;
    }

    // Cancel appointment
    cancelAppointment(aptId) {
      const apt = this.data.appointments.find((a) => a.id === aptId);
      if (apt) {
        apt.status = 'Cancelled';
        this.saveData(this.data);
        return true;
      }
      return false;
    }

    // Approve quote
    approveQuote(quoteId) {
      const quote = this.data.quotes.find((q) => q.id === quoteId);
      if (quote) {
        quote.status = 'Approved';
        this.saveData(this.data);
        return true;
      }
      return false;
    }

    // Update customer profile
    updateProfile(updatedCustomer) {
      this.data.customer = { ...this.data.customer, ...updatedCustomer };
      this.saveData(this.data);
      return true;
    }
  }

  window.VitravaPortal = new ClientPortalManager();
})();
