import fs from 'fs';

async function main() {
  const html = fs.readFileSync('storefront.html', 'utf8');
  const bundleMatches = html.match(/https:\/\/[^"'\s]+\.js/g) || [];
  const unique = Array.from(new Set(bundleMatches));
  console.log('JS bundles found:', unique);

  // Check for API endpoints in the bundles
  for (const url of unique) {
    if (url.includes('main') || url.includes('app') || url.includes('pages') || url.includes('index')) {
      const res = await fetch(url);
      const code = await res.text();
      console.log('Fetched bundle:', url, 'Length:', code.length);
      const apiMatches = code.match(/\/api\/[a-zA-Z0-9_\-\/]+/g) || [];
      console.log('APIs in bundle:', Array.from(new Set(apiMatches)).slice(0, 10));
      
      const graphqlMatches = code.match(/https:\/\/[^"'\s]*graphql[^"'\s]*/g) || [];
      console.log('Graphql in bundle:', Array.from(new Set(graphqlMatches)));
      
      const collshpMatches = code.match(/https:\/\/collshp\.com\/api\/[^"'\s]+/g) || [];
      console.log('Collshp APIs:', Array.from(new Set(collshpMatches)));
    }
  }
}

main().catch(console.error);
