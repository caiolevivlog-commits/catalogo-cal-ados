import fs from 'fs';

const links = JSON.parse(fs.readFileSync('shopee_raw_links.json', 'utf8'));

// Print lines 1 to 40
links.slice(0, 40).forEach((item, i) => {
  console.log(`${i+1}. [${item.linkId}] "${item.linkName}" => ${item.image}`);
});
