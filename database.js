const mysql = require('mysql2/promise');

module.exports.DATABASE = mysql.createPool({
    "host": "casf1_db_1",
    "user": "root",
    "password": "3M75B4fKWbsr",
    "database": "f1",
    "port": "3306"
});