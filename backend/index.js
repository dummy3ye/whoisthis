const express = require('express');
const cors = require('cors');
const usernameSearch = require('./modules/usernameSearch');
const emailLookup = require('./modules/emailLookup');
const nameSearch = require('./modules/nameSearch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/search', async (req, res) => {
  const { type, query } = req.body;

  if (!type || !query) {
    return res.status(400).json({ error: 'Type and query are required' });
  }

  let results = [];
  try {
    switch (type) {
      case 'username':
        results = await usernameSearch(query);
        break;
      case 'email':
        results = await emailLookup(query);
        break;
      case 'name':
        results = await nameSearch(query);
        break;
      default:
        return res.status(400).json({ error: 'Invalid search type' });
    }
    res.json({ type, query, results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
