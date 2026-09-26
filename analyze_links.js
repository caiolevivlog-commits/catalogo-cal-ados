import fs from 'fs';

const links = JSON.parse(fs.readFileSync('shopee_raw_links.json', 'utf8'));
console.log('Total items in storefront:', links.length);

// Group by common model names / keywords
const groups = {};
for (const item of links) {
  // Normalize title
  const title = item.linkName.trim();
  console.log(`[${item.linkId}] ${title} -> img: ${item.image}`);
}
