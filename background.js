// Common multi-part TLDs that need special handling
const MULTI_PART_TLDS = new Set([
  'co.uk', 'org.uk', 'me.uk', 'ac.uk', 'gov.uk',
  'co.nz', 'org.nz', 'net.nz', 'govt.nz',
  'com.au', 'net.au', 'org.au', 'edu.au', 'gov.au',
  'co.jp', 'or.jp', 'ne.jp', 'ac.jp', 'go.jp',
  'com.br', 'org.br', 'net.br', 'gov.br',
  'co.in', 'org.in', 'net.in', 'gov.in',
  'co.za', 'org.za', 'net.za', 'gov.za',
  'com.mx', 'org.mx', 'gob.mx',
  'com.cn', 'org.cn', 'net.cn', 'gov.cn',
  'co.kr', 'or.kr', 'go.kr',
  'com.sg', 'org.sg', 'net.sg', 'gov.sg',
  'com.hk', 'org.hk', 'net.hk', 'gov.hk',
  'co.il', 'org.il', 'net.il', 'gov.il',
  'com.tr', 'org.tr', 'net.tr', 'gov.tr',
  'com.pl', 'org.pl', 'net.pl', 'gov.pl',
  'co.th', 'or.th', 'go.th',
  'com.tw', 'org.tw', 'net.tw', 'gov.tw',
  'com.my', 'org.my', 'net.my', 'gov.my',
  'com.ar', 'org.ar', 'net.ar', 'gov.ar',
  'co.id', 'or.id', 'go.id',
  'com.ph', 'org.ph', 'net.ph', 'gov.ph',
  'com.vn', 'org.vn', 'net.vn', 'gov.vn',
  'co.ve', 'com.ve', 'org.ve',
  'com.co', 'org.co', 'net.co', 'gov.co',
  'com.pe', 'org.pe', 'net.pe', 'gob.pe',
  'com.ua', 'org.ua', 'net.ua', 'gov.ua',
  'com.eg', 'org.eg', 'net.eg', 'gov.eg',
  'co.ke', 'or.ke', 'go.ke',
  'com.ng', 'org.ng', 'net.ng', 'gov.ng'
]);

function getTopLevelDomain(hostname) {
  const parts = hostname.split('.');

  // Already at top level or invalid
  if (parts.length <= 2) {
    return hostname;
  }

  // Check for multi-part TLD
  const lastTwo = parts.slice(-2).join('.');
  if (MULTI_PART_TLDS.has(lastTwo)) {
    // Need domain + multi-part TLD (e.g., example.co.uk)
    return parts.slice(-3).join('.');
  }

  // Standard TLD - return last two parts (e.g., example.com)
  return parts.slice(-2).join('.');
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;

  try {
    const url = new URL(tab.url);

    // Only handle http/https URLs
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return;
    }

    const topLevelDomain = getTopLevelDomain(url.hostname);
    const newUrl = `${url.protocol}//${topLevelDomain}`;

    // Navigate to the top-level domain
    chrome.tabs.update(tab.id, { url: newUrl });
  } catch (e) {
    // Invalid URL, do nothing
  }
});
