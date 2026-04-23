import { useState } from 'react'
import axios from 'axios'
import { Search, Shield, Info, ExternalLink } from 'lucide-react'

interface Result {
  platform: string;
  url: string;
  status: string;
  error?: string;
}

function App() {
  const [type, setType] = useState('username');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResults([]);
    try {
      const response = await axios.post('/api/search', { type, query });
      setResults(response.data.results);
    } catch (error) {
      console.error('Search failed', error);
      alert('Search failed. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Open Hunt <Shield size={32} style={{ verticalAlign: 'middle', marginLeft: '10px' }} /></h1>
        <p>Advanced OSINT Intelligence Platform</p>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <div className="search-section">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="username">Username</option>
            <option value="email">Email Address</option>
            <option value="name">Full Name</option>
          </select>
          <input 
            type="text" 
            placeholder={`Enter ${type}...`} 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1 }}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? <span className="loader"></span> : <><Search size={20} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Hunt</>}
          </button>
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Info size={14} /> 
          {type === 'username' && "Searching 10+ social platforms for handle presence..."}
          {type === 'email' && "Checking Gravatar and public data breach records..."}
          {type === 'name' && "Generating deep search links for LinkedIn, Facebook, and more..."}
        </div>
      </div>

      {results.length > 0 && (
        <div className="results-grid">
          {results.map((res, index) => (
            <div key={index} className="glass-panel result-card">
              <h3>{res.platform}</h3>
              <div className={`status ${res.status.toLowerCase().replace(' ', '-')}`}>
                {res.status}
              </div>
              {res.url && (
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  {res.url} <ExternalLink size={12} />
                </a>
              )}
              {res.error && <div style={{ fontSize: '0.7rem', color: '#ff4d4d' }}>{res.error}</div>}
            </div>
          ))}
        </div>
      )}

      {loading && results.length === 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div className="loader" style={{ width: '40px', height: '40px' }}></div>
          <p style={{ marginTop: '1rem' }}>Initiating hunting modules...</p>
        </div>
      )}
    </div>
  )
}

export default App
