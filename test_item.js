import fs from 'fs';

async function testItemDetail() {
  const testUrl = 'https://s.shopee.com.br/4AxITMTrDk';
  try {
    const res = await fetch(testUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    console.log('Redirected to:', res.url);
    const html = await res.text();
    console.log('HTML size:', html.length);
    // Look for itemid and shopid in url or html
    const itemMatch = res.url.match(/i\.([0-9]+)\.([0-9]+)/) || res.url.match(/-i\.([0-9]+)\.([0-9]+)/);
    console.log('Item match from URL:', itemMatch);

    // Look for image variations in html
    const imgMatches = html.match(/https:\/\/[^"'\s]*img\.susercontent\.com\/[^"'\s]*/g) || [];
    console.log('Image matches found in item page:', Array.from(new Set(imgMatches)).slice(0, 10));
  } catch (e) {
    console.error(e);
  }
}

testItemDetail().catch(console.error);
