import fs from 'fs';

const links = JSON.parse(fs.readFileSync('shopee_raw_links.json', 'utf8'));

// Print all 86 links with index, linkId, linkName, and image
links.forEach((item, i) => {
  console.log(`${i+1}. [${item.linkId}] "${item.linkName}" => ${item.image}`);
});
