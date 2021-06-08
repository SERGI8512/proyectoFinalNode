const router = require('express').Router();

const { getAllCuidadores } = require('../../models/cuidadores.model');

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


module.exports = router;