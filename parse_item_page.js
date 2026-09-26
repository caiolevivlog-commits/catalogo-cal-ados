import fs from 'fs';

async function parseOpannlp() {
  const testUrl = 'https://shopee.com.br/opaanlp/1360804916/58211841384?__mobile__=1';
  const res = await fetch(testUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  });
  console.log('Status:', res.status, 'URL:', res.url);
  const html = await res.text();
  console.log('HTML length:', html.length);
  // Match any image IDs or susercontent
  const suserMatches = html.match(/br-11134[0-9a-zA-Z_\-]+/g) || [];
  console.log('Shopee image IDs in HTML:', Array.from(new Set(suserMatches)).slice(0, 10));

  // Match any JSON data in script
  const jsonScripts = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  console.log('ld+json count:', jsonScripts?.length);
  if (jsonScripts) {
    console.log(jsonScripts[0]);
  }
}

parseOpannlp().catch(console.error);
