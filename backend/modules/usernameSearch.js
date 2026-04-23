const axios = require('axios');

const platforms = [
  { name: 'GitHub', url: 'https://github.com/{}' },
  { name: 'Twitter', url: 'https://twitter.com/{}' },
  { name: 'Instagram', url: 'https://www.instagram.com/{}' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/{}' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/{}' },
  { name: 'Tumblr', url: 'https://{}.tumblr.com' },
  { name: 'YouTube', url: 'https://www.youtube.com/@{}' },
  { name: 'Twitch', url: 'https://www.twitch.tv/{}' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@{}' },
  { name: 'Snapchat', url: 'https://www.snapchat.com/add/{}' }
];

async function usernameSearch(username) {
  const results = [];
  const promises = platforms.map(async (platform) => {
    const url = platform.url.replace('{}', username);
    try {
      const response = await axios.get(url, {
        timeout: 5000,
        validateStatus: (status) => status < 500, // Handle 404 as "not found"
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (response.status === 200) {
        results.push({ platform: platform.name, url, status: 'found' });
      } else {
        results.push({ platform: platform.name, url, status: 'not found' });
      }
    } catch (error) {
      results.push({ platform: platform.name, url, status: 'error', error: error.message });
    }
  });

  await Promise.all(promises);
  return results;
}

module.exports = usernameSearch;
