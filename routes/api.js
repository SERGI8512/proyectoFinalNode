const router = require('express').Router();

const { checkToken } = require('./middleWares');


const apiUsuariosRouter = require('./api/usuarios');
const apiClientesRouter = require('./api/clientes')
const apiCuidadoresRouter = require('./api/cuidadores');
const apiMascotasRouter = require('./api/mascotas')

router.use('/usuarios', apiUsuariosRouter);
router.use('/clientes', checkToken, apiClientesRouter);
router.use('/cuidadores', checkToken, apiCuidadoresRouter);
router.use('/mascotas', apiMascotasRouter);

module.exports = router;

