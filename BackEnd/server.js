const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const dbConfig = {
  user: 'Hr',
  password: 'Hr',
  connectString: 'localhost:1521/xepdb1',

  events: true,
  error: (error) => console.log(`oracledb error: ${error.message}`)
};

app.get('/', (req, res) => {
    res.send('¡Bienvenido a tu aplicación Express con Oracle DB!');
});

// Ruta para obtener datos desde la base de datos
app.get('/api/data', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    console.log('Conexión exitosa a la base de datos');

    const result = await connection.execute('SELECT * FROM SKILLS');

    console.log('Consulta ejecutada con éxito');

    await connection.close();

    console.log('Conexión cerrada correctamente');

    console.log('Datos obtenidos de la base de datos:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
