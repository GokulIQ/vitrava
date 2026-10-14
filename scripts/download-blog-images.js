const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'assets', 'images', 'blog');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 18 Curated, high-resolution architectural & residential window photographs
const images = [
  // 1. How Energy-Efficient Windows Reduce Heat Transfer
  {
    filename: 'heat-transfer-main.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    desc: 'Sunlit luxury living room with high-performance Low-E windows demonstrating thermal insulation'
  },
  {
    filename: 'heat-transfer-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    desc: 'Architectural interior showing radiant warmth retention and multi-pane insulated glazing'
  },

  // 2. Double vs Triple Glazing: Which Is Right for Your Home?
  {
    filename: 'double-vs-triple-main.jpg',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    desc: 'Architectural luxury residence with floor-to-ceiling multi-pane glazing'
  },
  {
    filename: 'double-vs-triple-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    desc: 'Nordic cold-climate living room enjoying draft-free radiant comfort through triple glazing'
  },

  // 3. 5 Warning Signs Your Windows Need Immediate Replacement
  {
    filename: 'warning-signs-main.jpg',
    url: 'https://images.unsplash.com/photo-1517865288-978fcb780652?auto=format&fit=crop&w=1600&q=85',
    desc: 'Residential window with severe seal failure showing condensation and moisture trapped on glass'
  },
  {
    filename: 'warning-signs-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85',
    desc: 'Old weathered residential window frame with cracked paint and failing seals needing replacement'
  },

  // 4. Understanding U-Factor and Solar Heat Gain (SHGC)
  {
    filename: 'u-factor-main.jpg',
    url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=85',
    desc: 'Sunbeams streaming through low-emissivity glass demonstrating controlled solar heat gain'
  },
  {
    filename: 'u-factor-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=85',
    desc: 'Architectural window array engineered for climate control and minimal U-factor thermal conductance'
  },

  // 5. Casement vs Double-Hung Windows
  {
    filename: 'casement-vs-doublehung-main.jpg',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    desc: 'Side-by-side residential window showcase showing contemporary casement and double-hung profiles'
  },
  {
    filename: 'casement-vs-doublehung-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
    desc: 'Open window providing whole-home natural ventilation with clean breezes and natural light'
  },

  // 6. How to Prepare for Window Installation
  {
    filename: 'prepare-installation-main.jpg',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
    desc: 'Home interior cleared and staged with open pathways ready for installation crew'
  },
  {
    filename: 'prepare-installation-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
    desc: 'Professional installation staging area with tools, protective equipment, and safety measures'
  },

  // 7. Window Frame Materials Compared
  {
    filename: 'frame-materials-main.jpg',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
    desc: 'Architectural studio with blueprints, frame profile cross-sections, and material specifications'
  },
  {
    filename: 'frame-materials-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    desc: 'Contemporary composite and aluminum-clad window frame details in a luxury modern home'
  },

  // 8. How to Reduce Drafts and Improve Comfort
  {
    filename: 'reduce-drafts-main.jpg',
    url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85',
    desc: 'Homeowner enjoying draft-free comfort and radiant warmth beside an expansive insulated window'
  },
  {
    filename: 'reduce-drafts-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    desc: 'Airtight architectural window perimeter sealing preventing cold air infiltration and heat loss'
  },

  // 9. Common Questions About Window Replacement Costs
  {
    filename: 'replacement-costs-main.jpg',
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=85',
    desc: 'Professional in-home window replacement consultation, estimate review, and transparent agreement'
  },
  {
    filename: 'replacement-costs-secondary.jpg',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=85',
    desc: 'Window replacement investment analysis, ROI calculations, and energy savings projection'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, (response) => {
      // Follow redirects if any (301, 302)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Server returned status code ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });
    request.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of 18 high-resolution architectural images for blog...`);
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const destPath = path.join(targetDir, img.filename);
    process.stdout.write(`[${i + 1}/18] Downloading ${img.filename}... `);
    try {
      await downloadFile(img.url, destPath);
      const sizeKb = (fs.statSync(destPath).size / 1024).toFixed(0);
      console.log(`OK (${sizeKb} KB)`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      process.exit(1);
    }
  }
  console.log(`\nAll 18 blog images successfully downloaded into assets/images/blog/!`);
}

run();
