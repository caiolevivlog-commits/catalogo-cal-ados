import fs from 'fs';

async function findEndpoints() {
  const url = 'https://deo.shopeemobile.com/shopee/shopee-affiliateplatform-live-sg/linktreeh5/static/js/app.596b9783.js';
  const res = await fetch(url);
  const code = await res.text();
  
  // Search for get( or post( calls
  const matches = code.match(/m\.(get|post)\(['"`]([^'"`]+)['"`]/g) || [];
  console.log('API calls via m:', matches);

  // Search for keywords like "storefront", "collection", "tree"
  const regex = /['"`]\/[^'"`]*(storefront|collection|link|item|affiliate|showcase)[^'"`]*['"`]/gi;
  const pathMatches = code.match(regex) || [];
  console.log('Path matches:', Array.from(new Set(pathMatches)));
}

findEndpoints().catch(console.error);
