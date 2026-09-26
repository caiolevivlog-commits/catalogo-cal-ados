import fs from 'fs';

async function checkBaseInfo() {
  const url = 'https://collshp.com/api/v3/gql/graphql';
  const query = `
    query getBaseInfoAndLinks($urlSuffix: String!) {
      landingPageBaseInfo(urlSuffix: $urlSuffix) {
        title
        description
        avatar
        background
      }
      landingPageLinkList(urlSuffix: $urlSuffix, pageSize: "100", pageNum: "1") {
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
      landingPageGroupList(urlSuffix: $urlSuffix) {
        groupList {
          groupId
          groupName
        }
      }
    }
  `;

  const payload = {
    operationName: 'getBaseInfoAndLinks',
    query: query,
    variables: {
      urlSuffix: '_caiolevii014'
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

  const data = await res.json();
  fs.writeFileSync('shopee_base_info.json', JSON.stringify(data, null, 2));
  console.log('Groups:', data.data?.landingPageGroupList?.groupList);
  console.log('Total Links:', data.data?.landingPageLinkList?.totalCount);
}

checkBaseInfo().catch(console.error);
