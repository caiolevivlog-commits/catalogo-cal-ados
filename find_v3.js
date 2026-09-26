import fs from 'fs';

async function findV3() {
  const url = 'https://deo.shopeemobile.com/shopee/shopee-affiliateplatform-live-sg/linktreeh5/static/js/app.596b9783.js';
  const res = await fetch(url);
  const code = await res.text();
  
  // Find where /api/v3 is used
  const v3Index = code.indexOf('/api/v3');
  console.log('Context around /api/v3:');
  console.log(code.slice(Math.max(0, v3Index - 200), v3Index + 400));
}

findV3().catch(console.error);
