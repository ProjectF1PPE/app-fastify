const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'casf1_db_1',
    user: 'root',
    password: '3M75B4fKWbsr',
    database: 'f1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;