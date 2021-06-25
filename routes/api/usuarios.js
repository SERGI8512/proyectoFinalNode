const { getAllUsers, newCliente, getClienteByEmail, getUsuarioById, getUsersEdad, getUsuarioByGenero, deleteUsuarioById, updateUsuario, newCuidador, getCuidadorByEmail } = require('../../models/usuarios.model');

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

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

router.post('/newCliente', [
    body('nombre', 'Debe introducir un nombre con un mínimo de 3 caracteres').exists().isLength({ min: 3 }),
    body('email', 'El formato del email introducido no es válido').isEmail()
], async (req, res) => {

    //Aquí validamos los datos de entrada con los validadores que hemos introducido arriba.

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Aquí comprobamos si el email introducido para registrarse ya existe, por tanto, si no existe nos devolerá null, si existe nos devuelve un objecto con el usuario que tenga ese email. 

    const cliente = await getClienteByEmail(req.body.email);
    if (cliente) {//cuando ponemos if (cliente) significa que no es null. Por eso no ponemos if (usuario !== null)
        return res.json({ error: 'El email ya se encuentra registrado' });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    newCliente(req.body)
        .then(result => res.json(result))
        .catch(error => console.log(error));
});

router.post('/newCuidador', [
    body('nombre', 'Debe introducir un nombre con un mínimo de 3 caracteres').exists().isLength({ min: 3 }),
    body('email', 'El formato del email introducido no es válido').isEmail()
], async (req, res) => {

    //Aquí validamos los datos de entrada con los validadores que hemos introducido arriba.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    //Aquí comprobamos si el email introducido para registrarse ya existe, por tanto, si no existe nos devolerá null, si existe nos devuelve un objecto con el usuario que tenga ese email. 

    const usuario = await getCuidadorByEmail(req.body.email);
    if (usuario) {//cuando ponemos if (usuaurio) significa que no es null. Por eso no ponemos if (usuario !== null)
        return res.json({ error: 'El email ya se encuentra registrado' });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    newCuidador(req.body)
        .then(result => res.json(result))
        .catch(error => console.log(error));
});

router.post('/loginCliente', async (req, res) => {

    //Primero comprobamos si existe el email:
    const usuario = await getClienteByEmail(req.body.email);
    if (usuario == null) {
        return res.json({ error: 'error en el email y/o password introducido' });
    }

    //Comprobamos ahora si las password coinciden. Usamos el método compareSync para esperar a que haga la comprobación y luego seguir adelante.
    const samePass = bcrypt.compareSync(req.body.password, usuario.password);
    if (samePass) {// esto es lo mismo que if(samePass === true)
        res.json({ usuario, token: createToken(usuario) });
    } else {
        res.json({ error: 'error en el email y/o password introducido' });
    }

});

router.post('/loginCuidador', async (req, res) => {

    //Primero comprobamos si existe el email:
    const usuario = await getCuidadorByEmail(req.body.email);
    if (usuario == null) {
        return res.json({ error: 'error 1 en el email y/o password introducido' });
    }

    //Comprobamos ahora si las password coinciden. Usamos el método compareSync para esperar a que haga la comprobación y luego seguir adelante.
    const samePass = bcrypt.compareSync(req.body.password, usuario.password);
    if (samePass) {// esto es lo mismo que if(samePass === true)
        res.json({ success: req.body.id, token: createToken(usuario) });
    } else {
        res.json({ error: 'error 2 en el email y/o password introducido' });
    }

});

function createToken(pUsuario) {
    const obj = {
        usuario_id: pUsuario.id,
        caducidad: dayjs().add(300, 'minutes').unix()
    }
    return jwt.sign(obj, 'randomKey');

}

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

/* router.post('/newCuidador', async (req, res) => {
    const result = await newCuidador(req.body);
    res.json(result);
}); */


module.exports = router;