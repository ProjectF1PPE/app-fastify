const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    "host": "casf1_db_1",
    "user": "root",
    "password": "3M75B4fKWbsr",
    "database": "f1",
    "port": "3306"
})

module.exports = async () => {
    return connection;
};