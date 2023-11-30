import React, { useState, useEffect } from 'react';
import './loadout.css';

const Loadout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('');
  const [outfitIDs, setOutfitIDs] = useState([]);
  const [skillIDs, setSkillIDs] = useState([]);
  const [weaponIDs, setWeaponIDs] = useState([]);

  const [outfitOptions, setOutfitOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [weaponOptions, setWeaponOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      loadoutID: data.length + 1,
      type,
      outfitIDs,
      skillIDs,
      weaponIDs,
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

  const fetchOptions = async (tableName, setOptionsFunction) => {
    try {
      const response = await fetch(`http://localhost:3001/api/data/${tableName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(`Options for ${tableName}:`, result);
  
      if (Array.isArray(result)) {
        const ids = result.map(item => item[`${tableName}ID`]);
        console.log(`IDs for ${tableName}:`, ids);
        setOptionsFunction(ids);
      } else {
        console.error(`Invalid response format for ${tableName}. Expected an array.`);
      }
    } catch (error) {
      console.error(`Error fetching ${tableName} options:`, error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchOptions('Outfit', setOutfitOptions);
    fetchOptions('Skills', setSkillOptions);
    fetchOptions('Weapons', setWeaponOptions);
  }, []);

  return (
    <div>
      <h1>Loadout Data Table</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Loadout ID:
          <input type="text" value={data.length + 1} readOnly />
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Seleccionar...</option>
            <option value="Stealth">Stealth</option>
            <option value="Loud">Loud</option>
          </select>
        </label>
        <label>
          Outfit ID:
          <select className='select'
            multiple
            value={outfitIDs}
            onChange={(e) => setOutfitIDs(Array.from(e.target.selectedOptions, option => option.value))}
            required
          >
            {outfitOptions.map((option, index) => (
              <option key={`${option}-${index}`} value={option}>
                {option}
              </option>
            ))}
        </select>
        </label>
        <label>
          Skill ID:
          <select className='select'
            multiple
            defaultValue={skillIDs}
            onChange={(e) => setSkillIDs(Array.from(e.target.selectedOptions, option => option.value))}
            required
          >
            {skillOptions.map((option, index) => (
              <option key={`${option}-${index}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Weapon ID:
          <select className='select'
              multiple
              value={weaponIDs}
              onChange={(e) => setWeaponIDs(Array.from(e.target.selectedOptions, option => option.value))}
              required
            >
              {weaponOptions.map((option, index) => (
              <option key={`${option}-${index}`} value={option}>
                {option}
              </option>
            ))}
        </select>
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
              <tr key={item.loadoutID}>
                <td>{item.loadoutID}</td>
                <td>{item.type}</td>
                <td>{item.outfitID}</td>
                <td>{item.skillID}</td>
                <td>{item.weaponID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Loadout;
