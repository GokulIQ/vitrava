const { execSync } = require('child_process');
const path = require('path');

console.log('--- VITRAVA MASTER BUILD START ---');

console.log('1. Generating Architectural Vector & Image Assets...');
execSync('node scripts/generate-assets.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

console.log('2. Building Services Directory and 6 Detail Pages...');
execSync('node scripts/generate-pages-services.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

console.log('3. Building Products Catalog and 6 Detail Pages...');
execSync('node scripts/generate-pages-products.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

console.log('4. Building Projects Portfolio and 6 Case Studies...');
execSync('node scripts/generate-pages-projects.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

console.log('5. Building Blog Hub and 9 Unique Articles...');
execSync('node scripts/generate-pages-blog.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

console.log('6. Building Client Portal Pages (6 screens)...');
execSync('node scripts/generate-pages-portal.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

console.log('7. Building Core Pages (Home 01, Home 02, About, Calculator, Pricing, Contact, Quote, Booking, Auth)...');
execSync('node scripts/generate-pages-core.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

console.log('--- VITRAVA MASTER BUILD COMPLETED SUCCESSFULLY (51 Standalone HTML Pages) ---');
