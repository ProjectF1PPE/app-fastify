const mysql = require("mysql2");

const getPilotes = (req, reply) => {
    const connection = mysql.createConnection({
        host: 'casf1_db_1',
        user: 'root',
        password: '3M75B4fKWbsr',
        database: 'f1'
    });

    connection.connect();

    connection.query('SELECT id, nom, prenom, ordre, dateNaissance from pilote order by id', (err, res, fields) => {
        reply.send(res);
    });

    connection.end();
}

module.exports = {
    getPilotes
}