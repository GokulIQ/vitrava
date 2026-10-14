const https = require('https');

function searchCommons(query, limit = 10) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|dimensions&format=json`;
  
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'VitravaWindowResearch/1.0 (info@vitrava.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          const results = [];
          for (const p of pages) {
            if (p.imageinfo && p.imageinfo[0]) {
              const info = p.imageinfo[0];
              const title = p.title;
              if (/\.(jpg|jpeg|png)$/i.test(title)) {
                results.push({
                  title,
                  width: info.width,
                  height: info.height,
                  size: info.size,
                  url: info.url
                });
              }
            }
          }
          resolve(results);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

const query = process.argv[2] || 'casement window';
searchCommons(query, 12).then(res => {
  console.log(`Found ${res.length} images for query "${query}":`);
  res.forEach((r, idx) => {
    console.log(`[${idx + 1}] ${r.title} (${r.width}x${r.height})`);
    console.log(`    URL: ${r.url}`);
  });
}).catch(console.error);
