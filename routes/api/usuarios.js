const router = require('express').Router();

const { getAllUsers, newUsuario } = require('../../models/usuarios.model');

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
})

module.exports = router;