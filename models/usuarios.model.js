///En este fichero vamos a meter todos los métodos de acceso a la base de datos para la tabla usuarios.

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM BD_proyectoFinal.usuarios;', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    getAllUsers
}