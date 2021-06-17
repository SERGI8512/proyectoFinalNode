const router = require('express').Router();

const { getAllUsers, newUsuario, getUsuarioById, getUsersEdad, getUsuarioByGenero, deleteUsuarioById, updateUsuario } = require('../../models/usuarios.model');

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;

        const rows = await getAllUsers(parseInt(limit), parseInt(page));
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.json({ error: 'NO VA' })
    }
});

router.post('/new', async (req, res) => {
    const result = await newUsuario(req.body);
    res.json(result);
});

router.get('/:usuarioId', async (req, res) => {
    const usuario = await getUsuarioById(req.params.usuarioId);
    res.json(usuario);
});

router.get('/genero/:usuarioGenero', async (req, res) => {
    const usuarios = await getUsuarioByGenero(req.params.usuarioGenero);
    res.json(usuarios);
});

router.get('/mayor/:pEdadMin/menor/:pEdadMax', async (req, res) => {
    const usuarios = await getUsersEdad(req.params.pEdadMin, req.params.pEdadMax);
    res.json(usuarios);
});

router.delete('/:usuarioId', async (req, res) => {
    const result = await deleteUsuarioById(req.params.usuarioId);
    res.json(result);
});

router.put('/update/:usuarioId', async (req, res) => {
    try {
        const usuario = await updateUsuario(req.params.usuarioId, req.body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;