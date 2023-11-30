const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  user: 'Payday',
  password: 'Payday',
  connectString: 'localhost:1521/xepdb1',

  events: true,
  error: (error) => console.log(`oracledb error: ${error.message}`)
};

app.get('/', (req, res) => {
    res.send('¡Bienvenido a tu aplicación Express con Oracle DB!');
});

app.get('/api/data/:category', async (req, res) => {
    const { category } = req.params;
  
    try {
        
        const connection = await oracledb.getConnection(dbConfig);
        const allowedCategories = ['Skills', 'Weapons', 'Loadout', 'UserTrials','Outfit'];

        if (!allowedCategories.includes(category)) {
        res.status(400).send('Categoría no válida');
        return;
        }
        const result = await connection.execute(`SELECT * FROM ${category}`);

  
        console.log('Consulta ejecutada con éxito');
        await connection.close();
        console.log('Conexión cerrada correctamente');
        res.json(result.rows);
      
    }   catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/api/data/:category', async (req, res) => {
  const { category } = req.params;
  const { body } = req;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const allowedCategories = ['Skills', 'Weapons', 'Loadout', 'UserTrials', 'Outfit'];
    console.log('Cuerpo de la solicitud:', req.body);

    if (!allowedCategories.includes(category)) {
      res.status(400).send('Categoría no válida');
      return;
    }

    if (!body || Object.keys(body).length === 0) {
      res.status(400).send('Cuerpo de la solicitud vacío o no válido');
      return;
    }

    const columns = Object.keys(body).join(', ');
    const values = Object.values(body).map(value => `'${value}'`).join(', ');

    const insertQuery = `INSERT INTO ${category} (${columns.replace(/FIRING_MODE/g, '"FIRING_MODE"')}) VALUES (${values})`;

    await connection.execute(insertQuery);

    console.log('Solicitud POST recibida para la categoría', category);

    await connection.close();
    console.log('Conexión cerrada correctamente');

    res.status(200).send('Datos agregados correctamente');
  } catch (error) {
    console.error('Error al manejar la solicitud POST:', error.message);
    console.error('Detalles del cuerpo de la solicitud2:', req.body);
    res.status(500).send('Error interno del servidor');
  }
});


app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
