import React, { useState, useEffect } from 'react';
import './skills.css';

const Skills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/Skills');
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
      <h1>Tabla de Datos</h1>
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
            {data.map((item) => (
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
