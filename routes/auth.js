const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// MIDDLEWARES

// crear nuevo usaurio
router.post(
  '/new', // usamos el exprees validator para los campos con check
  // si algo de esto pasa error pasa a los controllers
  [check('name', 'El nombre es obligatorio').not().isEmpty()], // en este caso no puede estar vacio
  [check('email', 'El email es obligatorio').isEmail()], // en este caos debe ser email valido
  [check('password', 'El password es obligatorio').isLength({ min: 6 })], // en esta caso debe ser minimo de 6 caracteres,
  validarCampos,
  crearUsuario
);

// Login nuevo usaurio
router.post(
  '/',
  // usamos el exprees validator para los campos con check
  // si algo de esto pasa error pasa a los controllers
  [check('email', 'El email es obligatorio').isEmail()], // en este caos debe ser email valido
  [check('password', 'El password es obligatorio').isLength({ min: 6 })], // en esta caso debe ser minimo de 6 caracteres
  validarCampos,
  loginUsuario
);

// Validar y revalidar token
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
