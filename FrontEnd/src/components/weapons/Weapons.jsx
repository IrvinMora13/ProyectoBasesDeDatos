import React, { useState, useEffect } from 'react';
import './weapons.css';

const Weapons = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/Weapons');
        const result = await response.json();
        setData(result);
        setLoading(false);
        setFilteredData(result); 
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
        setError('Error al obtener datos del servidor');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchWeapons = () => {
    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        (typeof value === 'string' || typeof value === 'number') &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Weapons Data Table</h1>
      <div>
        <label>Buscar Arma: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchWeapons}>Buscar</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Weapons ID</th>
              <th>Weapons Name</th>
              <th>Damage</th>
              <th>Magazine</th>
              <th>Recoil</th>
              <th>Stability</th>
              <th>Accuracy</th>
              <th>Firing mode</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
                <td>{item[4]}</td>
                <td>{item[5]}</td>
                <td>{item[6]}</td>
                <td>{item[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Weapons;
