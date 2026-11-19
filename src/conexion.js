// Conexión a la base de datos MySQL/MariaDB.
// Los datos de acceso se leen del archivo .env (nunca se escriben en el código).
const mysql = require('mysql2');

// Un "pool" reutiliza conexiones y se recupera solo si la base de datos se reinicia.
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'tellmewhere',
    waitForConnections: true,
    connectionLimit: 10,
});

// Comprobación al arrancar: avisa del problema sin tumbar el servidor.
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ No se pudo conectar a la base de datos:', err.message);
        console.error('   Revisa que MySQL/MariaDB esté encendido y los datos del archivo .env.');
        return;
    }
    console.log('✅ Conectado a la base de datos');
    connection.release();
});

module.exports = pool;
