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
module.exports = {
    getAllMascotas
}