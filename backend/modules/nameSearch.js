const axios = require('axios');
const cheerio = require('cheerio');

async function nameSearch(name) {
  const query = encodeURIComponent(name);
  const sources = [
    { name: 'LinkedIn', url: `https://www.linkedin.com/pub/dir?firstName=${query}&lastName=&type=topnav` },
    { name: 'Facebook', url: `https://www.facebook.com/public/${query.replace(/%20/g, '.')}` },
    { name: 'Whitepages', url: `https://www.whitepages.com/name/${query.replace(/%20/g, '-')}` },
    { name: 'Google Search', url: `https://www.google.com/search?q=${query}+osint` }
  ];

  // For name search, we mostly provide links as automated scraping of these 
  // platforms is highly restricted and requires advanced evasion.
  return sources.map(source => ({
    platform: source.name,
    url: source.url,
    status: 'link generated'
  }));
}

module.exports = nameSearch;
