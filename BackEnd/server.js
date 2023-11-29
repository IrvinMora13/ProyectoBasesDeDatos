const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

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
      const result = await connection.execute(`SELECT * FROM ${category}`);

  
      console.log('Consulta ejecutada con éxito');
      await connection.close();
      console.log('Conexión cerrada correctamente');
      res.json(result.rows);
      
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error.message);
      res.status(500).send('Error interno del servidor');
    }
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
