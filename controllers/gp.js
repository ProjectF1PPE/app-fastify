const mysql = require("mysql2");

const getGP = (req, reply) => {
    const connection = mysql.createConnection({
        host: 'casf1_db_1',
        user: 'root',
        password: '3M75B4fKWbsr',
        database: 'f1'
    })

    connection.connect();

    connection.query('SELECT id, ville, date, photo from grandprix order by id', (err, res, fields) => {
        /*if (err) {
            throw err;
        }

         */
        reply.send(res);
        console.log('err: ' + err);
        console.log('results: ' + res);
        console.log('fetched: ' + fields);
    })

    connection.end();
}

module.exports = {
    getGP
}