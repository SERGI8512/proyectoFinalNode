///En este fichero vamos a meter todos los métodos de acceso a la base de datos para la tabla cuidadores.

const getAllCuidadores = (limit, page) => {

    const prom = new Promise((resolve, reject) => {
        db.query('select * from cuidadores limit ?, ?', [limit * (page - 1), limit], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
    return prom;
};

const newCuidador = ({ nombre, apellido, experimentado, razasAdmitidas, email, direccion, edad, telefono, genero, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into cuidadores (nombre, apellido, experimentado, razasAdmitidas, email, direccion, edad, telefono, genero, password) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, experimentado, razasAdmitidas, email, direccion, edad, telefono, genero, password],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        )
    });
}
module.exports = {
    getAllCuidadores,
    newCuidador
}