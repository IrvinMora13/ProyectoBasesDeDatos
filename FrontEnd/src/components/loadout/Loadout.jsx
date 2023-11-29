import React, { useState, useEffect } from 'react';
import './loadout.css';

const Loadout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loadoutID, setLoadoutID] = useState('');
  const [type, setType] = useState('');
  const [outfitID, setOutfitID] = useState('');
  const [skillID, setSkillID] = useState('');
  const [weaponID, setWeaponID] = useState('');

  // Datos para las opciones de Outfit ID
  const [outfitOptions, setOutfitOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      loadoutID,
      type,
      outfitID,
      skillID,
      weaponID,
    };

    try {
      const response = await fetch('http://localhost:3001/api/data/Loadout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Error al registrar datos en el servidor:', response.statusText);
      }
    } catch (error) {
      console.error('Error al registrar datos en el servidor:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data/Loadout');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener datos del servidor:', error);
      setError('Error al obtener datos del servidor');
      setLoading(false);
    }
  };

  const fetchOutfitOptions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data/Outfit');
      const result = await response.json();
      setOutfitOptions(result.map(item => item.Outfit_ID));
    } catch (error) {
      console.error('Error al obtener opciones de Outfit ID:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchOutfitOptions();
  }, []);

  return (
    <div>
      <h1>Loadout Data Table</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Loadout ID:
          <input type="text" value={loadoutID} onChange={(e) => setLoadoutID(e.target.value)} required />
        </label>
        <label>
          Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </label>
        <label>
          Outfit ID:
          <select value={outfitID} onChange={(e) => setOutfitID(e.target.value)} required>
            <option value="">Seleccionar...</option>
            {outfitOptions.map(option => (
              <option key={option} value={option} selected={outfitID === option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Skill ID:
          <input type="text" value={skillID} onChange={(e) => setSkillID(e.target.value)} required />
        </label>
        <label>
          Weapon ID:
          <input type="text" value={weaponID} onChange={(e) => setWeaponID(e.target.value)} required />
        </label>
        <button type="submit">Registrar</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Loadout ID</th>
              <th>Type</th>
              <th>Outfit ID</th>
              <th>Skill ID</th>
              <th>Weapon ID</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Loadout;
