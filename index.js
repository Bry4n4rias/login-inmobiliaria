const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConection } = require('./db/config');
require('dotenv').config();

// crear el server
const app = express();

// Conexion a BD
dbConection();

// diretorio publico
app.use(express.static('public'));

// Cors
app.use(cors());

// lectura y parseo del bofy
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Manejar las demas rutas,
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${4000}`);
});
