//Aquí crearemos middleWares para, mediante la utilización de tokens restringir el acceso a diferentes puntos de las web. Usaremos JWT y dayJs (QUIZÁS).

const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { getUsuarioById } = require('../models/usuarios.model')

const checkToken = async (req, res, next) => {

    //Primero comprobamos si el token viene incluido en la cabezera Authentication

    if (!req.headers['authorization']) {
        return res.json({ error: 'Se necesita la cabecera Authorization' })
    }

    const token = req.headers['authorization'];

    //Comprobamos si el token es correcto
    let obj;
    try {
        obj = jwt.verify(token, 'randomKey');
    } catch (error) {
        return res.json({ error: 'El token es incorrecto' })
    }

    //Comprobamos si el token esta caducado
    const currentDate = dayjs().unix();
    if (currentDate > obj.caducidad) {
        return res.json({ error: 'El token está caducado' })
    }

    //Recuperamos el usuario

    const usuario = await getUsuarioById(obj.usuario_id);

    req.user = usuario;

    next();

}

module.exports = { checkToken }