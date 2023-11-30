import React, { useState, useEffect } from 'react';
import './weapons.css';

const Weapons = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    WeaponsId: '',
    WeaponsName: '',
    Damage: '',
    Magazine: '',
    Recoil: '',
    Stability: '',
    Accuracy: '',
    FIRING_MODE: ''
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/data/Weapons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchData();

        setFormData({
          WeaponsId: '',
          WeaponsName: '',
          Damage: '',
          Magazine: '',
          Recoil: '',
          Stability: '',
          Accuracy: '',
          FIRING_MODE: ''
        });
      } else {
        console.error('Error al enviar datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
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
      {/* Formulario para agregar nuevos datos */}
      <form onSubmit={handleSubmit}>
      <label>Weapons ID:</label>
        <input
          type="number"
          name="WeaponsId"
          value={formData.WeaponsId}
          onChange={handleInputChange}
        />
        <label>Weapons Name:</label>
        <input
          type="text"
          name="WeaponsName"
          value={formData.WeaponsName}
          onChange={handleInputChange}
        />
        <label>Damage:</label>
        <input
          type="number"
          name="Damage"
          value={formData.Damage}
          onChange={handleInputChange}
        />
        <label>Magazine:</label>
        <input
          type="text"
          name="Magazine"
          value={formData.Magazine}
          onChange={handleInputChange}
        />
        <label>Recoil:</label>
        <input
          type="text"
          name="Recoil"
          value={formData.Recoil}
          onChange={handleInputChange}
        />
        <label>Stability:</label>
        <input
          type="text"
          name="Stability"
          value={formData.Stability}
          onChange={handleInputChange}
        />
        <label>Accuracy:</label>
        <input
          type="text"
          name="Accuracy"
          value={formData.Accuracy}
          onChange={handleInputChange}
        />
        <label>FiringMode:</label>
        <input
          type="text"
          name="FiringMode"
          value={formData.FiringMode}
          onChange={handleInputChange}
        />
        {/* Agrega los demás campos del formulario según tus necesidades */}
        <button type="submit">Agregar</button>
      </form>
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
