//Aquí configuramos la conexión con la base de datos: `BD_proyectoFinal`
//creamos la constante mysql y requerimos la librería de mysql:

const mysql = require('mysql');

//creamos constante pool y la igualamos al método createPool de mysql:

//Le pasamos las variables creadas en .env utilizando process.env (PREGUNTAR MARIO FUNCIONAMIENTO!!!)

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

global.db = pool;

