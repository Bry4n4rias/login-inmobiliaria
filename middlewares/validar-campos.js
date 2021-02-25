const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
  // con el express validator cogemos el req y validamos que si los errores no estan vacios es pq hay error
  // y me devuelve el estado 400
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  // en los miidlewares si todo sale bien debemos ejecutar esta funcion para q pueda seguir con el siguiente codigo
  next();
};

module.exports = {
  validarCampos,
};
