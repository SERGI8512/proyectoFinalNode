const router = require('express').Router();

const { checkToken } = require('./middleWares');

const apiUsuariosRouter = require('./api/usuarios');
const apiCuidadoresRouter = require('./api/cuidadores');
const apiMascotasRouter = require('./api/mascotas')

router.use('/usuarios', checkToken, apiUsuariosRouter);
router.use('/cuidadores', apiCuidadoresRouter);
router.use('/mascotas', apiMascotasRouter);

module.exports = router;

