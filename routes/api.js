const router = require('express').Router()

const apiUsuariosRouter = require('./api/usuarios');
const apiCuidadoresRouter = require('./api/cuidadores');

router.use('/usuarios', apiUsuariosRouter);
router.use('/cuidadores', apiCuidadoresRouter);

module.exports = router;

