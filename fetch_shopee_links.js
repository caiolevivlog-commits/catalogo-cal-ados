import fs from 'fs';

async function fetchLinks() {
  const url = 'https://collshp.com/api/v3/gql/graphql';
  const query = `
    query getLinkLists(
      $urlSuffix: String!
      $pageSize: String
      $pageNum: String
      $groupId: String
      $linkNameKeyword: String
    ) {
      landingPageLinkList(
        urlSuffix: $urlSuffix
        pageSize: $pageSize
        pageNum: $pageNum
        groupId: $groupId
        linkNameKeyword: $linkNameKeyword
      ) {
        totalCount
        linkList {
          linkId
          link
          linkName
          image
          linkType
          groupIds
        }
      }
    }
  `;

  const payload = {
    operationName: 'getLinkLists',
    query: query,
    variables: {
      urlSuffix: '_caiolevii014',
      pageSize: '100',
      pageNum: '1',
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    body: JSON.stringify(payload)
  });

  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Data keys:', Object.keys(data));
  if (data.data) {
    const list = data.data.landingPageLinkList?.linkList || [];
    console.log('Total links returned:', list.length);
    fs.writeFileSync('shopee_raw_links.json', JSON.stringify(list, null, 2));
    console.log('First 3 items:', list.slice(0, 3));
  } else {
    console.log('Error/Response:', JSON.stringify(data));
  }
}

fetchLinks().catch(console.error);
