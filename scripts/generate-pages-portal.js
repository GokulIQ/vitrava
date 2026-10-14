const fs = require('fs');
const path = require('path');
const { wrapHtml, renderPortalSidebar, renderPortalUtilities, ICONS, getRelRoot } = require('./builder-core');

const depth = 1;
const root = getRelRoot(depth);

function renderDashboardTopbar() {
  return `
      <header class="portal-topbar no-print">
        <strong class="portal-topbar-greeting">Welcome Back</strong>
        ${renderPortalUtilities()}
      </header>`;
}

// 1. Overview Page (dashboard/overview.html)
function generateOverviewPage() {
  const bodyContent = `
  <div class="portal-layout">
    ${renderPortalSidebar(depth, 'overview')}
    <div class="portal-content">
      ${renderDashboardTopbar()}
      <!-- Portal Top Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.5rem;">CLIENT INSTALLATION PORTAL</span>
          <h1 class="text-h2">Project Overview</h1>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Here is the live status of your residential window project.</p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <a href="appointments.html" class="btn btn-secondary btn-sm">View Schedule</a>
          <a href="quotes.html" class="btn btn-primary btn-sm">Review Quote</a>
        </div>
      </div>

      <!-- Active Project Status Card -->
      <div class="card-arch" style="margin-bottom: 2rem; background: linear-gradient(135deg, var(--color-card) 0%, var(--color-card-muted) 100%);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span class="badge badge-citron">STAGE 4 OF 6: IN MANUFACTURING</span>
              <span style="font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-muted);">REF: #VIT-2026-8841</span>
            </div>
            <h2 class="text-h3">Whole-Home Triple-Pane Window Replacement (16 Units)</h2>
            <div style="color: var(--color-text-muted); font-size: 0.9rem;">742 Evergreen Terrace, Oakridge Heights, OR 97201</div>
          </div>
          <div style="text-align: end;">
            <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Fabrication Progress</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono);">68%</div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="calc-bar-track" style="height: 10px; margin-bottom: 1.5rem;">
          <div class="calc-bar-fill" style="width: 68%;"></div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Window Specification</span>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-text-main);">Signature Triple-Pane (U-0.16)</div>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Frame Finish</span>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-text-main);">Matte Obsidian Composite</div>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Estimated Delivery</span>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-primary);">October 28, 2026</div>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Scheduled Installation</span>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-text-main);">November 02, 2026</div>
          </div>
        </div>
      </div>

      <!-- Two-Column Grid: Next Appointment & Quick Actions -->
      <div class="portal-grid-2" style="margin-bottom: 2rem;">
        <!-- Next Appointment Box -->
        <div class="card-flat">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 class="text-h4">Next Confirmed Appointment</h3>
            <span class="badge badge-accent">CONFIRMED</span>
          </div>
          <div style="background-color: var(--color-card-muted); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0.25rem;">White-Glove Window Installation</div>
            <div style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Monday, November 02, 2026 &bull; 08:30 AM – 04:30 PM</div>
            <div style="font-size: 0.85rem; color: var(--color-text-muted);">Lead Installer: David Chen, Master Certified Installer</div>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button type="button" class="btn btn-secondary btn-sm" data-action="reschedule-appointment" data-appointment-id="APT-1049">Reschedule</button>
            <button type="button" class="btn btn-outline btn-sm" data-action="cancel-appointment" data-appointment-id="APT-1049">Cancel</button>
          </div>
        </div>

        <!-- Support & Assigned Team Box -->
        <div class="card-flat">
          <h3 class="text-h4" style="margin-bottom: 1rem;">Assigned Installation Concierge</h3>
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background-color: var(--color-primary); color: #FFF; display: grid; place-items: center; font-weight: 800; font-size: 1.25rem;">
              D
            </div>
            <div>
              <div style="font-weight: 700; font-size: 1rem;">David Chen</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">Master Installation Director &bull; AAMA Certified</div>
              <div style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600;">(800) 555-8487 ext 104</div>
            </div>
          </div>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 1rem;">
            Need to adjust delivery staging, add extra room protections, or discuss paint touch-ups? Contact David directly through your portal concierge.
          </p>
          <a href="mailto:d.chen@vitravawindows.com" class="btn btn-outline btn-sm" style="width: 100%;">Message Installation Team</a>
        </div>
      </div>

      <!-- Quick Shortcuts Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
        <a href="project.html" class="card-flat" style="display: block; text-decoration: none;">
          <div style="font-weight: 700; color: var(--color-text-main); margin-bottom: 0.25rem;">Project Milestones</div>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted);">View all 6 installation stages &rarr;</div>
        </a>
        <a href="quotes.html" class="card-flat" style="display: block; text-decoration: none;">
          <div style="font-weight: 700; color: var(--color-text-main); margin-bottom: 0.25rem;">Quotes &amp; Invoice</div>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Review balance: ₹12,450.00 &rarr;</div>
        </a>
        <a href="documents.html" class="card-flat" style="display: block; text-decoration: none;">
          <div style="font-weight: 700; color: var(--color-text-main); margin-bottom: 0.25rem;">25-Year Warranty Deed</div>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Download certificates &rarr;</div>
        </a>
        <a href="profile.html" class="card-flat" style="display: block; text-decoration: none;">
          <div style="font-weight: 700; color: var(--color-text-main); margin-bottom: 0.25rem;">Account Settings</div>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Edit address &amp; preferences &rarr;</div>
        </a>
      </div>
    </div>
  </div>

  <!-- Reschedule Modal -->
  <div id="reschedule-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="reschedule-modal-title">
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-dialog">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 id="reschedule-modal-title" class="text-h3">Reschedule Appointment</h3>
        <button type="button" class="btn btn-secondary btn-icon" data-modal-close aria-label="Close modal">${ICONS.close}</button>
      </div>
      <form id="reschedule-form">
        <div class="form-group">
          <label for="reschedule-date" class="form-label">Select New Date</label>
          <input type="date" id="reschedule-date" class="form-input" min="2026-10-15" required>
        </div>
        <div class="form-group">
          <label for="reschedule-time" class="form-label">Preferred Time Window</label>
          <select id="reschedule-time" class="form-select" required>
            <option value="08:30 AM – 11:30 AM">Morning (08:30 AM – 11:30 AM)</option>
            <option value="12:00 PM – 03:00 PM">Midday (12:00 PM – 03:00 PM)</option>
            <option value="03:00 PM – 06:00 PM">Afternoon (03:00 PM – 06:00 PM)</option>
            <option value="All Day (08:30 AM – 04:30 PM)" selected>Full Day Installation (08:30 AM – 04:30 PM)</option>
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary" data-modal-close>Cancel</button>
          <button type="submit" class="btn btn-primary">Confirm Reschedule</button>
        </div>
      </form>
    </div>
  </div>
  `;

  const html = wrapHtml(
    'Client Installation Portal — Overview',
    'Customer installation tracking portal for Vitrava high-performance window replacement projects.',
    bodyContent,
    depth,
    'portal'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'dashboard', 'overview.html'), html, 'utf8');
  // Also create dashboard/index.html that redirects to overview.html
  fs.writeFileSync(path.join(__dirname, '..', 'dashboard', 'index.html'), `<link rel="icon" type="image/svg+xml" sizes="any" href="../assets/images/common/favicon.svg">
<meta http-equiv="refresh" content="0; url=overview.html">`, 'utf8');
}

// 2. Project Stages Page (dashboard/project.html)
function generateProjectPage() {
  const bodyContent = `
  <div class="portal-layout">
    ${renderPortalSidebar(depth, 'project')}
    <div class="portal-content">
      ${renderDashboardTopbar()}
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.5rem;">STAGE TRACKER</span>
          <h1 class="text-h2">My Installation Project</h1>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Live milestone progression for Project #VIT-2026-8841.</p>
        </div>
        <a href="appointments.html" class="btn btn-primary btn-sm">Upcoming Dates</a>
      </div>

      <!-- 6-Stage Milestone Timeline -->
      <div class="card-arch" style="margin-bottom: 2.5rem;">
        <h3 class="text-h3" style="margin-bottom: 1.5rem;">Installation Milestone Timeline</h3>
        <div class="timeline">
          <div class="timeline-step is-completed">
            <div class="timeline-dot" style="background-color: var(--color-primary); border-color: var(--color-primary);"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <h4 style="font-weight: 700; color: var(--color-text-main);">1. Initial Architectural Consultation</h4>
              <span class="badge badge-accent">COMPLETED &bull; OCT 02</span>
            </div>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">Evaluated thermal camera heat loss, reviewed frame finish swatches, and established window layout.</p>
          </div>

          <div class="timeline-step is-completed">
            <div class="timeline-dot" style="background-color: var(--color-primary); border-color: var(--color-primary);"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <h4 style="font-weight: 700; color: var(--color-text-main);">2. Precision Laser Measurement</h4>
              <span class="badge badge-accent">COMPLETED &bull; OCT 06</span>
            </div>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">Sub-millimeter laser survey of all 16 rough openings, sill rebate angles, and wall depth clearances.</p>
          </div>

          <div class="timeline-step is-completed">
            <div class="timeline-dot" style="background-color: var(--color-primary); border-color: var(--color-primary);"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <h4 style="font-weight: 700; color: var(--color-text-main);">3. Custom Specification &amp; Quote Approved</h4>
              <span class="badge badge-accent">COMPLETED &bull; OCT 08</span>
            </div>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">Client approved Signature Triple-Pane Krypton configuration. Initial deposit processed (₹6,000.00).</p>
          </div>

          <div class="timeline-step is-active">
            <div class="timeline-dot" style="border-color: var(--color-highlight); background-color: var(--color-highlight);"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <h4 style="font-weight: 800; color: var(--color-primary);">4. Factory Precision Manufacturing (In Progress)</h4>
              <span class="badge badge-citron">ACTIVE &bull; 68% DONE</span>
            </div>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">Custom automated robotic assembly of composite frames, noble krypton gas chamber filling, and multi-point lock hardware calibration.</p>
          </div>

          <div class="timeline-step">
            <div class="timeline-dot"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <h4 style="font-weight: 700; color: var(--color-text-main);">5. White-Glove Installation</h4>
              <span class="badge badge-muted">SCHEDULED &bull; NOV 02</span>
            </div>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">AAMA 2400 certified master installation crew, surgical tear-out, low-expansion foam perimeter seal, and trim work.</p>
          </div>

          <div class="timeline-step">
            <div class="timeline-dot"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <h4 style="font-weight: 700; color: var(--color-text-main);">6. Final Quality Inspection &amp; 25-Year Warranty Handover</h4>
              <span class="badge badge-muted">PENDING &bull; NOV 04</span>
            </div>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">Multipoint sash inspection with homeowner, cleanup verification, and digital deed transfer.</p>
          </div>
        </div>
      </div>

      <!-- Detailed Window Inventory Table -->
      <div class="card-flat">
        <h3 class="text-h3" style="margin-bottom: 1rem;">Window Inventory &amp; Specifications (16 Units)</h3>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; min-width: 600px;">
            <thead>
              <tr style="border-bottom: 2px solid var(--color-border); color: var(--color-text-main);">
                <th style="padding: 0.75rem; text-align: start;">Unit ID</th>
                <th style="padding: 0.75rem; text-align: start;">Room Location</th>
                <th style="padding: 0.75rem; text-align: start;">Style</th>
                <th style="padding: 0.75rem; text-align: start;">Dimensions (W x H)</th>
                <th style="padding: 0.75rem; text-align: start;">Glazing</th>
                <th style="padding: 0.75rem; text-align: start;">Status</th>
              </tr>
            </thead>
            <tbody style="color: var(--color-text-muted);">
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-main);">W-01 to W-04</td>
                <td style="padding: 0.75rem;">Living Room South Facade</td>
                <td style="padding: 0.75rem;">Casement (Twin)</td>
                <td style="padding: 0.75rem;">71.8" x 59.5"</td>
                <td style="padding: 0.75rem;">Triple Krypton Low-E</td>
                <td style="padding: 0.75rem;"><span class="badge badge-accent">Framed</span></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-main);">W-05 to W-06</td>
                <td style="padding: 0.75rem;">Great Room Center</td>
                <td style="padding: 0.75rem;">Fixed Picture</td>
                <td style="padding: 0.75rem;">58.0" x 82.0"</td>
                <td style="padding: 0.75rem;">Triple Krypton Low-E</td>
                <td style="padding: 0.75rem;"><span class="badge badge-accent">Glazed</span></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-main);">W-07 to W-10</td>
                <td style="padding: 0.75rem;">Kitchen &amp; Dining Area</td>
                <td style="padding: 0.75rem;">Casement</td>
                <td style="padding: 0.75rem;">35.5" x 47.5"</td>
                <td style="padding: 0.75rem;">Triple Krypton Low-E</td>
                <td style="padding: 0.75rem;"><span class="badge badge-accent">Framed</span></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-main);">W-11 to W-14</td>
                <td style="padding: 0.75rem;">Master Suite &amp; Bedroom 2</td>
                <td style="padding: 0.75rem;">Casement (Acoustic)</td>
                <td style="padding: 0.75rem;">35.5" x 59.5"</td>
                <td style="padding: 0.75rem;">Acoustic Triple Glaze</td>
                <td style="padding: 0.75rem;"><span class="badge badge-accent">Assembly</span></td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-main);">W-15 to W-16</td>
                <td style="padding: 0.75rem;">Bathrooms (Upper Level)</td>
                <td style="padding: 0.75rem;">Awning (Rainproof)</td>
                <td style="padding: 0.75rem;">47.5" x 23.5"</td>
                <td style="padding: 0.75rem;">Obscure Privacy Triple</td>
                <td style="padding: 0.75rem;"><span class="badge badge-accent">Assembly</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `;

  const html = wrapHtml(
    'My Installation Project — Vitrava Client Portal',
    'Detailed 6-stage milestone tracker and inventory breakdown for Project #VIT-2026-8841.',
    bodyContent,
    depth,
    'portal'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'dashboard', 'project.html'), html, 'utf8');
}

// 3. Appointments Page (dashboard/appointments.html)
function generateAppointmentsPage() {
  const bodyContent = `
  <div class="portal-layout">
    ${renderPortalSidebar(depth, 'appointments')}
    <div class="portal-content">
      ${renderDashboardTopbar()}
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.5rem;">APPOINTMENTS</span>
          <h1 class="text-h2">Measurement &amp; Installation Schedule</h1>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Manage upcoming visits and review appointment history.</p>
        </div>
        <a href="${root}booking.html" class="btn btn-primary btn-sm">+ Book New Appointment</a>
      </div>

      <!-- Upcoming Appointments Cards -->
      <h3 class="text-h3" style="margin-bottom: 1.25rem;">Upcoming Visits</h3>
      <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 3rem;">
        <div class="card-flat appointment-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="badge badge-citron">CONFIRMED</span>
                <span style="font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-muted);">ID: #APT-1049</span>
              </div>
              <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-text-main);">White-Glove Window Installation</h4>
              <div style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem; margin-top: 0.25rem;">
                Monday, Nov 02, 2026 &bull; 08:30 AM – 04:30 PM (All Day)
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn btn-secondary btn-sm" data-action="reschedule-appointment" data-appointment-id="APT-1049">Reschedule</button>
              <button type="button" class="btn btn-outline btn-sm" data-action="cancel-appointment" data-appointment-id="APT-1049">Cancel</button>
            </div>
          </div>
          <div style="font-size: 0.875rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
            <strong>Assigned Lead:</strong> David Chen, Master Certified Installer &bull; <strong>Crew Size:</strong> 4 Technicians &bull; <strong>Scope:</strong> Complete 16-window tear-out and installation.
          </div>
        </div>
      </div>

      <!-- Past Appointment History -->
      <h3 class="text-h3" style="margin-bottom: 1.25rem;">Completed Visits</h3>
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div class="card-flat" style="opacity: 0.85;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <div>
              <span class="badge badge-muted">COMPLETED &bull; OCT 06, 2026</span>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-main); margin-top: 0.25rem;">Preliminary Laser Measurement</h4>
            </div>
            <span style="font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-muted);">#APT-0982</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--color-text-muted);">
            Specialist: Marcus Vance &bull; Completed 3-point digital measurement for all 16 window openings. Dimensions uploaded to factory CAD lines.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Reschedule Modal -->
  <div id="reschedule-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="reschedule-modal-title">
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-dialog">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 id="reschedule-modal-title" class="text-h3">Reschedule Appointment</h3>
        <button type="button" class="btn btn-secondary btn-icon" data-modal-close aria-label="Close modal">${ICONS.close}</button>
      </div>
      <form id="reschedule-form">
        <div class="form-group">
          <label for="reschedule-date" class="form-label">Select New Date</label>
          <input type="date" id="reschedule-date" class="form-input" min="2026-10-15" required>
        </div>
        <div class="form-group">
          <label for="reschedule-time" class="form-label">Preferred Time Window</label>
          <select id="reschedule-time" class="form-select" required>
            <option value="08:30 AM – 11:30 AM">Morning (08:30 AM – 11:30 AM)</option>
            <option value="12:00 PM – 03:00 PM">Midday (12:00 PM – 03:00 PM)</option>
            <option value="03:00 PM – 06:00 PM">Afternoon (03:00 PM – 06:00 PM)</option>
            <option value="All Day (08:30 AM – 04:30 PM)" selected>Full Day Installation (08:30 AM – 04:30 PM)</option>
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary" data-modal-close>Cancel</button>
          <button type="submit" class="btn btn-primary">Confirm Reschedule</button>
        </div>
      </form>
    </div>
  </div>
  `;

  const html = wrapHtml(
    'Measurement & Installation Schedule — Vitrava Client Portal',
    'Manage your measurement visits, review appointment history, and reschedule with a click.',
    bodyContent,
    depth,
    'portal'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'dashboard', 'appointments.html'), html, 'utf8');
}

// 4. Quotes Page (dashboard/quotes.html)
function generateQuotesPage() {
  const bodyContent = `
  <div class="portal-layout">
    ${renderPortalSidebar(depth, 'quotes')}
    <div class="portal-content">
      ${renderDashboardTopbar()}
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.5rem;">ESTIMATES &amp; INVOICES</span>
          <h1 class="text-h2">Quotes &amp; Financial Estimates</h1>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Review line-item specifications, approve proposals, and download official PDF summaries.</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="window.print();">Print Quote</button>
      </div>

      <!-- Active Quote Card -->
      <div class="card-arch" style="margin-bottom: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="badge badge-citron">APPROVED &bull; IN PRODUCTION</span>
              <span style="font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-muted);">REF: #QUO-4491</span>
            </div>
            <h2 class="text-h3">Whole-Home Signature Triple-Pane Package</h2>
            <div style="color: var(--color-text-muted); font-size: 0.875rem;">Issued: Oct 07, 2026 &bull; Valid for 60 Days Guaranteed</div>
          </div>
          <div style="text-align: end;">
            <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Total Project Investment</div>
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-mono); line-height: 1;">₹18,450.00</div>
          </div>
        </div>

        <!-- Line Item Breakdown -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 0.75rem;">Itemized Scope Breakdown:</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--color-card-muted); border-radius: var(--radius-sm); font-size: 0.9rem;">
              <span>10x Vitrava Architectural Casement Windows (Signature Triple-Pane Krypton, Obsidian Frame)</span>
              <strong style="font-family: var(--font-mono);">₹11,500.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--color-card-muted); border-radius: var(--radius-sm); font-size: 0.9rem;">
              <span>4x Vitrava Top-Hinged Awning Windows (Kitchen &amp; Spa Bathrooms)</span>
              <strong style="font-family: var(--font-mono);">₹3,800.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--color-card-muted); border-radius: var(--radius-sm); font-size: 0.9rem;">
              <span>2x Architectural Fixed Picture Windows (Double-Height Great Room View)</span>
              <strong style="font-family: var(--font-mono);">₹2,400.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--color-card-muted); border-radius: var(--radius-sm); font-size: 0.9rem;">
              <span>Certified AAMA 2400 Master Installation &amp; Low-Expansion Polyurethane Foam Barrier</span>
              <strong style="color: var(--color-primary); font-weight: 700;">INCLUDED</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--color-card-muted); border-radius: var(--radius-sm); font-size: 0.9rem;">
              <span>25-Year Non-Prorated Transferable Lifetime Warranty Deed &amp; Accidental Glass Coverage</span>
              <strong style="color: var(--color-primary); font-weight: 700;">INCLUDED</strong>
            </div>
          </div>
        </div>

        <!-- Payment Breakdown -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Total Quote</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-main); font-family: var(--font-mono);">₹18,450.00</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Deposit Paid (Oct 08)</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-success); font-family: var(--font-mono);">₹6,000.00</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Balance Due Upon Signoff</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary); font-family: var(--font-mono);">₹12,450.00</div>
          </div>
        </div>
      </div>

      <!-- Archived Quotes -->
      <h3 class="text-h3" style="margin-bottom: 1.25rem;">Archived Options &amp; Revisions</h3>
      <div class="card-flat" style="opacity: 0.75;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="badge badge-muted">ARCHIVED &bull; OCT 05, 2026</span>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--color-text-main); margin-top: 0.25rem;">Alternate Option: Essential Double-Hung Package</h4>
          </div>
          <div style="font-family: var(--font-mono); font-weight: 700; font-size: 1.15rem; color: var(--color-text-muted);">₹13,200.00</div>
        </div>
      </div>
    </div>
  </div>
  `;

  const html = wrapHtml(
    'Quotes & Estimates — Vitrava Client Portal',
    'Review your approved line-item window replacement estimates and payment records.',
    bodyContent,
    depth,
    'portal'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'dashboard', 'quotes.html'), html, 'utf8');
}

// 5. Documents Page (dashboard/documents.html)
function generateDocumentsPage() {
  const bodyContent = `
  <div class="portal-layout">
    ${renderPortalSidebar(depth, 'documents')}
    <div class="portal-content">
      ${renderDashboardTopbar()}
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.5rem;">CERTIFICATES &amp; MANUALS</span>
          <h1 class="text-h2">Warranty &amp; Documents</h1>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Access your transferable warranty deed, NFRC ratings sheets, and care manuals.</p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div class="card-flat" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: var(--color-primary-light); color: var(--color-primary); display: grid; place-items: center;">
              ${ICONS.shield}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="badge badge-citron">VERIFIED DEED</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); font-family: var(--font-mono);">#DOC-WARR-01</span>
              </div>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-main);">25-Year Transferable Lifetime Warranty Certificate</h4>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">PDF Document &bull; 1.4 MB &bull; Issued Oct 08, 2026</div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.print(); VitravaToast?.show('Opening Printable Warranty Deed...', 'info');">Download / Print Deed</button>
        </div>

        <div class="card-flat" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: var(--color-accent); color: var(--color-primary); display: grid; place-items: center;">
              ${ICONS.leaf}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="badge badge-accent">ENERGY STAR SPEC</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); font-family: var(--font-mono);">#DOC-SPEC-02</span>
              </div>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-main);">Architectural Window Specifications &amp; NFRC Energy Ratings</h4>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">PDF Document &bull; 2.8 MB &bull; Required for 25C Tax Credit Filing</div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.print(); VitravaToast?.show('Opening NFRC Specification Sheet...', 'info');">Download / Print Spec</button>
        </div>

        <div class="card-flat" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: var(--color-card-muted); color: var(--color-text-muted); display: grid; place-items: center;">
              ${ICONS.thermometer}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="badge badge-muted">HOMEOWNER GUIDE</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); font-family: var(--font-mono);">#DOC-CARE-03</span>
              </div>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-main);">Homeowner Maintenance &amp; Hardware Care Handbook</h4>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted);">PDF Document &bull; 850 KB &bull; Care tips &amp; lubrication guide</div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.print(); VitravaToast?.show('Opening Care Handbook...', 'info');">Download / Print Guide</button>
        </div>
      </div>
    </div>
  </div>
  `;

  const html = wrapHtml(
    'Warranty & Documents — Vitrava Client Portal',
    'Download and print your 25-Year transferable warranty deed and NFRC energy rating sheets.',
    bodyContent,
    depth,
    'portal'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'dashboard', 'documents.html'), html, 'utf8');
}

// 6. Profile & Settings Page (dashboard/profile.html)
function generateProfilePage() {
  const bodyContent = `
  <div class="portal-layout">
    ${renderPortalSidebar(depth, 'profile')}
    <div class="portal-content">
      ${renderDashboardTopbar()}
      <div class="portal-profile-heading">
        <span class="badge badge-teal" style="margin-bottom: 0.5rem;">ACCOUNT SETTINGS</span>
        <h1 class="text-h2">Profile &amp; Preferences</h1>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">Manage your homeowner contact details, notifications, and portal appearance.</p>
      </div>

      <div class="portal-profile-panels">
        <form id="portal-profile-form" class="card-arch" style="margin-bottom: 2rem;">
          <h3 class="text-h3" style="margin-bottom: 1.5rem;">Homeowner Contact Information</h3>
          
          <div class="form-group">
            <label for="profile-name" class="form-label">Full Name(s)</label>
            <input type="text" id="profile-name" class="form-input" value="Alexander &amp; Sarah Hayes" minlength="3" required>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="profile-email" class="form-label">Email Address</label>
              <input type="email" id="profile-email" class="form-input" value="a.hayes@example.com" required>
            </div>
            <div class="form-group">
              <label for="profile-phone" class="form-label">Phone Number</label>
              <input type="tel" id="profile-phone" class="form-input" value="5553829104" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required>
            </div>
          </div>

          <div class="form-group">
            <label for="profile-address" class="form-label">Installation Property Address</label>
            <input type="text" id="profile-address" class="form-input" value="742 Evergreen Terrace, Oakridge Heights, OR 97201" required>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary">Save Profile Changes</button>
          </div>
        </form>

      </div>
    </div>
  </div>
  `;

  const html = wrapHtml(
    'Profile & Settings — Vitrava Client Portal',
    'Update homeowner contact info and customize your Vitrava client portal appearance.',
    bodyContent,
    depth,
    'portal'
  );

  fs.writeFileSync(path.join(__dirname, '..', 'dashboard', 'profile.html'), html, 'utf8');
}

generateOverviewPage();
generateProjectPage();
generateAppointmentsPage();
generateQuotesPage();
generateDocumentsPage();
generateProfilePage();
console.log('Client installation portal (6 pages) generated successfully.');
