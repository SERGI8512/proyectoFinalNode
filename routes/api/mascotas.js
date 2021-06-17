const router = require('express').Router();

const { getAllMascotas, newMascota, getMascotasById, getMascotasByEspecie, deleteMascotaById, updateMascota } = require('../../models/mascotas.model');

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;

        const rows = await getAllMascotas(parseInt(limit), parseInt(page));
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.json({ error: '/api/mascotas NO VA' })
    }
});

router.post('/new', async (req, res) => {
    const result = await newMascota(req.body);
    res.json(result);
});

router.get('/:mascotaId', async (req, res) => {
    const mascota = await getMascotasById(req.params.mascotaId);
    res.json(mascota);
});

router.get('/especie/:mascotaEspecie', async (req, res) => {
    const mascotas = await getMascotasByEspecie(req.params.mascotaEspecie);
    res.json(mascotas);
});

router.delete('/:mascotaId', async (req, res) => {
    const result = await deleteMascotaById(req.params.mascotaId);
    res.json(result);
});

router.put('/update/:mascotaId', async (req, res) => {
    try {
        const mascota = await updateMascota(req.params.mascotaId, req.body);
        res.json(mascota);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;