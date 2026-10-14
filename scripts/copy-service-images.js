const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\gokul\\.gemini\\antigravity\\brain\\1d096916-f575-4c2f-a076-7cbdc628d4e3';
const targetDir = path.join(__dirname, '..', 'assets', 'images', 'services');

const copies = [
  // 1. Residential Replacement
  { src: path.join(brainDir, 'residential_replacement_main_1791974705053.jpg'), dest: 'residential-replacement-main.jpg' },
  { src: path.join(brainDir, 'residential_replacement_secondary_1791974726600.jpg'), dest: 'residential-replacement-secondary.jpg' },
  // 2. Energy Efficiency Assessment
  { src: path.join(brainDir, 'service_assessment_1_1791953977948.jpg'), dest: 'energy-assessment-main.jpg' },
  { src: path.join(targetDir, 'service-energy-assessment.jpg'), dest: 'energy-assessment-secondary.jpg' },
  // 3. Custom Window Measurement
  { src: path.join(brainDir, 'custom_measurement_main_1791974706094.jpg'), dest: 'custom-measurement-main.jpg' },
  { src: path.join(targetDir, 'service-custom-measurement.jpg'), dest: 'custom-measurement-secondary.jpg' },
  // 4. Master Certified Installation
  { src: path.join(targetDir, 'service-replacement-1.jpg'), dest: 'certified-installation-main.jpg' },
  { src: path.join(targetDir, 'service-master-installation.jpg'), dest: 'certified-installation-secondary.jpg' },
  // 5. Weatherproofing & Air Sealing
  { src: path.join(brainDir, 'weatherproofing_main_1791974705055.jpg'), dest: 'weatherproofing-main.jpg' },
  { src: path.join(brainDir, 'weatherproofing_secondary_1791974727293.jpg'), dest: 'weatherproofing-secondary.jpg' },
  // 6. Warranty & Aftercare
  { src: path.join(targetDir, 'service-warranty-aftercare.jpg'), dest: 'warranty-aftercare-main.jpg' },
  { src: path.join(targetDir, 'Residential Window Replacement.jpg'), dest: 'warranty-aftercare-secondary.jpg' }
];

copies.forEach(({ src, dest }) => {
  if (!fs.existsSync(src)) {
    throw new Error(`Source file not found: ${src}`);
  }
  const destPath = path.join(targetDir, dest);
  fs.copyFileSync(src, destPath);
  const sizeKb = (fs.statSync(destPath).size / 1024).toFixed(0);
  console.log(`Successfully placed: ${dest} (${sizeKb} KB)`);
});
