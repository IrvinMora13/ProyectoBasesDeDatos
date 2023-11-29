import React, { useState, useEffect } from 'react';
import './weapons.css';

const Weapons = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/Weapons');
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
          {/* Mapea los datos para crear filas en la tabla */}
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
    </div>
  );
};

export default Weapons;
