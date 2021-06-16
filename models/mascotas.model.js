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
}

module.exports = {
    getAllMascotas,
    newMascota
}