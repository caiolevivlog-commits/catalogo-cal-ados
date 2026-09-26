import fs from 'fs';

const data = JSON.parse(fs.readFileSync('linklists_result.json', 'utf8'));
const list = data.data?.landingPageLinkList?.linkList || [];

// Deduplicate by link or itemId if any
const seenLinks = new Set();
const uniqueItems = [];

for (const item of list) {
  if (item.linkType !== 'ITEM') continue;
  if (seenLinks.has(item.link)) continue;
  seenLinks.add(item.link);
  uniqueItems.push(item);
}

console.log(`Unique items count: ${uniqueItems.length}`);

// Print all titles so we can see what they are
uniqueItems.forEach((item, i) => {
  console.log(`${i+1}. [${item.linkId}] ${item.linkName}`);
});
