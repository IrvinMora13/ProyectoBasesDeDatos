import React, { useState, useEffect } from 'react';
import './weapons.css';

const Weapons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/Weapons');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
        setError('Error al obtener datos del servidor');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Weapons Data Table</h1>
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
            {data.map((item) => (
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
