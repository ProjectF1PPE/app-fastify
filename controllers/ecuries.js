let ecuries = require('../Ecuries')

const mysql = require('../database');

const getEcuries = (req, reply) => {
    const connection = mysql.DATABASE.getConnection((err, client) => {
        client.execute('SELECT * from ecurie', (err, result) => {
            client.release();
            reply.send(result);
            //reply.send(err || result);
        });
    });
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