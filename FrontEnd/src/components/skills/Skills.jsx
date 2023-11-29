import React, { useState, useEffect } from 'react';
import './skills.css'

const Skills = () => {
  const [data, setData] = useState([{id:1234, nombre:'Hola', tree:'abcd'}]);

  useEffect(() => {
    // Aquí deberías realizar la lógica para obtener datos de la base de datos y actualizar el estado 'data'.
    // Por ejemplo, puedes usar fetch() para hacer una solicitud a una API.
    // La siguiente línea es un ejemplo ficticio:
    // fetch('url_de_tu_api').then(response => response.json()).then(data => setData(data));
  }, []); // El segundo parámetro [] significa que este efecto se ejecuta solo al montar el componente.

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
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.tree}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skills;
