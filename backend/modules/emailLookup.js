const axios = require('axios');

async function emailLookup(email) {
  // Real email OSINT often requires complex platform-specific logic
  // For this prototype, we'll implement a few simulated/basic checks
  const results = [
    { platform: 'Gravatar', status: 'checking...' },
    { platform: 'HaveIBeenPwned', status: 'checking...' }
  ];

  try {
    // Gravatar check
    const md5 = require('crypto').createHash('md5').update(email.toLowerCase()).digest('hex');
    const gravatarRes = await axios.get(`https://www.gravatar.com/avatar/${md5}?d=404`, {
      validateStatus: s => s < 500
    });
    results[0].status = gravatarRes.status === 200 ? 'found' : 'not found';
    results[0].url = `https://www.gravatar.com/${md5}`;

    // Note: HaveIBeenPwned requires an API key now, so we'll just link to it
    results[1].status = 'manual check required';
    results[1].url = `https://haveibeenpwned.com/account/${email}`;

  } catch (error) {
    console.error('Email lookup error:', error);
  }

  return results;
}

module.exports = emailLookup;
