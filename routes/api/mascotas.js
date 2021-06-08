const router = require('express').Router();

const { getAllMascotas } = require('../../models/mascotas.model');

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

module.exports = router;