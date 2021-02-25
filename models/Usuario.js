const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// cuando se cree la colexion en la bd este es el nombre q tendra en plurl osea usuarios
module.exports = model('Usuario', UsuarioSchema);
