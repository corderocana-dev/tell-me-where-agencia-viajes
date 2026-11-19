// Crea (o vuelve a crear) la base de datos con TellmeWhereDB.sql.
// Uso: npm run db:init
// ⚠️ El script SQL BORRA la base de datos "tellmewhere" si ya existe y la crea de nuevo con datos de ejemplo.
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async () => {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'TellmeWhereDB.sql'), 'utf8');

    let conexion;
    try {
        conexion = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true,
        });
        await conexion.query(sql);
        console.log('✅ Base de datos creada con los datos de ejemplo.');
    } catch (error) {
        console.error('❌ No se pudo crear la base de datos:', error.message);
        process.exitCode = 1;
    } finally {
        if (conexion) await conexion.end();
    }
})();
