const response = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    // verificar si no exite un correo igual
    const usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'ya exoste un usuario con el email',
      });
    }

    // crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    // encriptar password
    const salt = bcrypt.genSaltSync(); // cantidad de vueltas del hash, por defecto 10
    dbUser.password = bcrypt.hashSync(password, salt);

    // generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name);

    // grabar usuario en BD
    await dbUser.save();

    // generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name: name,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: true,
      msg: 'Porfavor hable con el admin',
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const usuarioDB = await Usuario.findOne({ email: email });
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo no existe',
      });
    }
    // confirmar match del password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'password invalido',
      });
    }
    // generar el JWT
    const token = await generarJWT(usuarioDB.id, usuarioDB.name);

    // respuesta del servicio
    return res.json({
      ok: true,
      uid: usuarioDB.id,
      name: usuarioDB.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: 'Hable con el admin',
    });
  }
};

const revalidarToken = async (req, res) => {
  const { uid, name } = req;

  // generar el JWT
  const token = await generarJWT(uid, name);

  return res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
