const router = require('express').Router();

const { getAllCuidadores, newCuidador, getCuidadorById, getCuidadoresEdad, getCuidadorByGenero, deleteCuidadorById, updateCuidador } = require('../../models/cuidadores.model');

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;

        const rows = await getAllCuidadores(parseInt(limit), parseInt(page));
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.json({ error: 'api/cuidadores NO FUNCIONA' })
    }
});

router.post('/new', async (req, res) => {
    const result = await newCuidador(req.body);
    res.json(result);
});

router.get('/:cuidadorId', async (req, res) => {
    const cuidador = await getCuidadorById(req.params.cuidadorId);
    res.json(cuidador);
});

router.get('/genero/:cuidadorGenero', async (req, res) => {
    const cuidadores = await getCuidadorByGenero(req.params.cuidadorGenero);
    res.json(cuidadores);
});

router.get('/mayor/:pEdadMin/menor/:pEdadMax', async (req, res) => {
    const cuidadores = await getCuidadoresEdad(req.params.pEdadMin, req.params.pEdadMax);
    res.json(cuidadores);
});

router.delete('/:cuidadorId', async (req, res) => {
    const result = await deleteCuidadorById(req.params.cuidadorId);
    res.json(result);
});

router.put('/update/:cuidadorId', async (req, res) => {
    try {
        const cuidador = await updateCuidador(req.params.cuidadorId, req.body);
        res.json(cuidador);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;