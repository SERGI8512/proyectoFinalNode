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

const newCliente = ({ nombre, apellidos, email, direccion, edad, genero, telefono, password }) => {
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

const getClienteByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {

        db.query('select * from usuarios where email = ?', [pEmail], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    });
};

const getCuidadorByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {

        db.query('select * from cuidadores where email = ?', [pEmail], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    });
};

const getUsuarioById = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from usuarios where id = ?',
            [pUsuarioId],
            (err, rows) => {
                if (err) reject(err);
                if (rows.length !== 1) resolve(null);
                resolve(rows[0]);
            })
    });
};

const getCuidadorById = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from cuidadores where id = ?',
            [pUsuarioId],
            (err, rows) => {
                if (err) reject(err);
                if (rows.length !== 1) resolve(null);
                resolve(rows[0]);
            })
    });
};

const getUsuarioByGenero = (pUsuarioGenero) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from usuarios where genero = ?',
            [pUsuarioGenero],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
    });
};

const getUsersEdad = (pEdadMin, pEdadMax) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from usuarios where usuarios.edad > ? && usuarios.edad < ?', [pEdadMin, pEdadMax],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
    });
};

const deleteUsuarioById = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from usuarios where id = ?', [pUsuarioId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const updateUsuario = (pUsuarioId, { nombre, apellidos, email, direccion, edad, genero, telefono, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, direccion = ?, edad = ?, genero = ?, telefono = ?, password = ? WHERE id = ?',
            [nombre, apellidos, email, direccion, edad, genero, telefono, password, pUsuarioId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
};

module.exports = {
    getAllUsers,
    newCliente,
    getClienteByEmail,
    getCuidadorByEmail,
    getUsuarioById,
    getCuidadorById,
    getUsersEdad,
    getUsuarioByGenero,
    deleteUsuarioById,
    updateUsuario,
    newCuidador
}