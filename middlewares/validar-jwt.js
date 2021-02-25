const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
  // leemos el token q viene en el header de la request
  const token = req.header('x-token');

  // si no hay token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Error en el token',
    });
  }

  // verficamos la firma del token
  try {
    // desestructuramos el token, donde esta el paylad con la id y el name
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEDD);
    // esta es la forma de pasarla la info uid y name hacia el auth controllers
    req.uid = uid;
    req.name = name;
    console.log(name);
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token invalido',
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
