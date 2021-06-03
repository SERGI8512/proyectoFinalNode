const router = require('express').Router();

const { getAllUsers } = require('../../models/usuarios.model');

router.get('/', async (req, res) => {
    try {
        const rows = await getAllUsers();
        res.json(rows)
    } catch (err) {
        res.json({ error: 'NO VA' })
    }
})

module.exports = router;