import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/find_similar_projects', {text: query});
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Project Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Project Id</th>
            <th style={{ width: '20%' }}>Title</th>
            <th style={{ width: '70%' }}>Abstract</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.title}</td>
              <td>{result.abstract}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
