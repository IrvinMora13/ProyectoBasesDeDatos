import React, { useState, useEffect } from 'react';
import './skills.css';

const Skills = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/Skills');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Tabla de Datos</h1>
      <table>
        <thead>
          <tr>
            <th>Skill ID</th>
            <th>Skill Name</th>
            <th>Skill Tree</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapea los datos para crear filas en la tabla */}
          {data.map((item) => (
            <tr key={item[0]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skills;
