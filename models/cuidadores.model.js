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
};

const getCuidadorById = (pCuidadorId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from cuidadores where id = ?',
            [pCuidadorId],
            (err, rows) => {
                if (err) reject(err);
                if (rows.length !== 1) resolve(null);
                resolve(rows[0]);
            })
    });
};

const getCuidadorByGenero = (pCuidadorGenero) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from cuidadores where genero = ?',
            [pCuidadorGenero],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
    });
};

const getCuidadoresEdad = (pEdadMin, pEdadMax) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from cuidadores where cuidadores.edad > ? && cuidadores.edad < ?', [pEdadMin, pEdadMax],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
    });
};

const deleteCuidadorById = (pCuidadorId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from cuidadores where id = ?', [pCuidadorId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const updateCuidador = (pCuidadorId, { nombre, apellido, experimentado, razasAdmitidas, email, direccion, edad, telefono, genero, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE cuidadores SET nombre = ?, apellido = ?, experimentado = ?, razasAdmitidas = ?, email = ?, direccion = ?, edad = ?, telefono = ?, genero = ?, password = ? WHERE id = ?',
            [nombre, apellido, experimentado, razasAdmitidas, email, direccion, edad, telefono, genero, password, pCuidadorId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
};

module.exports = {
    getAllCuidadores,
    newCuidador,
    getCuidadorById,
    getCuidadoresEdad,
    getCuidadorByGenero,
    deleteCuidadorById,
    updateCuidador
}