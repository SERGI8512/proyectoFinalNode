const router = require('express').Router()

const apiUsuariosRouter = require('./api/usuarios');
const apiCuidadoresRouter = require('./api/cuidadores');
const apiMascotasRouter = require('./api/mascotas')

router.use('/usuarios', apiUsuariosRouter);
router.use('/cuidadores', apiCuidadoresRouter);
router.use('/mascotas', apiMascotasRouter);

module.exports = router;

