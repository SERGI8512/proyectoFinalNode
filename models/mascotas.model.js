///En este fichero vamos a meter todos los métodos de acceso a la base de datos para la tabla mascotas.

const getAllMascotas = (limit, page) => {

    const prom = new Promise((resolve, reject) => {
        db.query('select * from mascota limit ?, ?', [limit * (page - 1), limit], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
    return prom;
};

const newMascota = ({ nombre, especie, raza, peso, sexo, edad, caracter, cuidadosEspeciales, queCome, fk_cliente, masSobre }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into mascota (nombre, especie, raza, peso, sexo, edad, caracter, cuidadosEspeciales, queCome, fk_cliente, masSobre) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, especie, raza, peso, sexo, edad, caracter, cuidadosEspeciales, queCome, fk_cliente, masSobre],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        )
    });
};

const getMascotasById = (pMascotaId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from mascota where id = ?',
            [pMascotaId],
            (err, rows) => {
                if (err) reject(err);
                if (rows.length !== 1) resolve(null);
                resolve(rows[0]);
            })
    });
};

const getMascotasByEspecie = (pMascotaEspecie) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM mascota where mascota.especie = ?',
            [pMascotaEspecie],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
    });
};

const deleteMascotaById = (pMascotaId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from mascota where id = ?', [pMascotaId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const updateMascota = (pMascotaId, { nombre, especie, raza, peso, sexo, edad, caracter, cuidadosEspeciales, queCome, masSobre, fk_cliente }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE mascota SET nombre = ?, especie = ?, raza = ?, peso = ?, sexo = ?, edad = ?, caracter = ?, cuidadosEspeciales = ?, queCome = ?, masSobre = ?, fk_cliente = ? WHERE id = ?',
            [nombre, especie, raza, peso, sexo, edad, caracter, cuidadosEspeciales, queCome, masSobre, fk_cliente, pMascotaId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
};

const getMascotasByClienteId = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from mascota where fk_cliente = ?',
            [pClienteId],
            (err, rows) => {
                if (err) reject(err);
                /*  if (rows.length !== 1) resolve(null); */
                resolve(rows);
            })
    });
};




module.exports = {
    getAllMascotas,
    newMascota,
    getMascotasById,
    getMascotasByEspecie,
    deleteMascotaById,
    updateMascota,
    getMascotasByClienteId
}