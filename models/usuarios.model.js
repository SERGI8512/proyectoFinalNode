///En este fichero vamos a meter todos los métodos de acceso a la base de datos para la tabla usuarios.

const getAllUsers = (limit, page) => {

    const prom = new Promise((resolve, reject) => {
        db.query('select * from usuarios limit ?, ?', [limit * (page - 1), limit], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
    return prom;
};

const newUsuario = ({ nombre, apellidos, email, direccion, edad, genero, telefono, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into usuarios (nombre, apellidos, email, direccion, edad,  genero, telefono, password) values (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellidos, email, direccion, edad, genero, telefono, password],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        )
    });
}

module.exports = {
    getAllUsers,
    newUsuario
}