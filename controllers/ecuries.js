const mysql = require("mysql2");

const getEcuries = (req, reply) => {
    const connection = mysql.createConnection({
        host: 'casf1_db_1',
        user: 'root',
        password: '3M75B4fKWbsr',
        database: 'f1'
    })

    connection.connect();

    connection.query('SELECT * from ecurie', (err, res, fields) => {
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

const getEcurie = (req, reply) => {
    const { id } = req.params

    const ecurie = ecuries.find((ecurie) => ecurie.id === id)

    reply.send(ecurie)
}

const addEcurie = (req, reply) => {
    const { name } = req.body
    const ecurie = {
        id: '1',
        name,
    }

    ecuries = [...ecuries, ecurie]

    reply.code(201).send(ecurie)
}

const deleteEcurie = (req, reply) => {
    const { id } = req.params

    ecuries = ecuries.filter((ecurie) => ecurie.id !== id)

    reply.send({ message: `Ecurie ${id} has been removed` })
}

const updateEcurie = (req, reply) => {
    const { id } = req.params
    const { name } = req.body

    ecuries = ecuries.map((ecurie) => (ecurie.id === id ? { id, name } : ecurie))

    ecurie = ecuries.find((ecurie) => ecurie.id === id)

    reply.send(ecurie)
}

module.exports = {
    getEcuries,
    getEcurie,
    addEcurie,
    deleteEcurie,
    updateEcurie,
}