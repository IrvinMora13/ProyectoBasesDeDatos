import React, { useState, useEffect } from 'react';
import './skills.css';

const Skills = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/Skills');
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

  const handleSearchSkills = () => {
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
      <h1>Skills Data Table</h1>
      <div>
        <label>Buscar Skill: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchSkills}>Buscar</button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Skill ID</th>
              <th>Skill Name</th>
              <th>Skill Tree</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Skills;
