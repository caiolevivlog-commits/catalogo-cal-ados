import fs from 'fs';

async function findGql() {
  const url = 'https://deo.shopeemobile.com/shopee/shopee-affiliateplatform-live-sg/linktreeh5/static/js/app.596b9783.js';
  const res = await fetch(url);
  const code = await res.text();
  
  // Find where /gql/graphql is used
  const gqlIndex = code.indexOf('/gql/graphql');
  console.log('Context around /gql/graphql:');
  console.log(code.slice(Math.max(0, gqlIndex - 100), gqlIndex + 1200));
}

findGql().catch(console.error);
