const router = require('express').Router();

const { getAllUsers } = require('../../models/usuarios.model');

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


module.exports = router;