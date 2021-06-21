const router = require('express').Router();

const { checkTokenCliente, checkTokenCuidador } = require('./middleWares');


const apiUsuariosRouter = require('./api/usuarios');
const apiClientesRouter = require('./api/clientes')
const apiCuidadoresRouter = require('./api/cuidadores');
const apiMascotasRouter = require('./api/mascotas')

router.use('/usuarios', apiUsuariosRouter);
router.use('/clientes', checkTokenCliente, apiClientesRouter);
router.use('/cuidadores', checkTokenCuidador, apiCuidadoresRouter);
router.use('/mascotas', apiMascotasRouter);

module.exports = router;

