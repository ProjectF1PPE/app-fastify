const mysql = require("mysql2/promise");

const getEcuries = async (req, reply) => {
    const connection = await mysql.createConnection({
        host: 'casf1_db_1',
        user: 'root',
        password: '3M75B4fKWbsr',
        database: 'f1'
    });

    connection.connect();

    const [ecuries, ecuriesFields] = await connection.query('SELECT id, nom, photo, idPays from ecurie');
    const [pilotes, pilotesFields] = await connection.query('SELECT id, nom, prenom, ordre, idEcurie from pilote');
    const [pays, paysFields] = await connection.query('SELECT id, nom from pays');

    let result = [];

    for (const ecurie of ecuries) {
        let nomPays = "Pays non trouvé";
        for (const unPays of pays) {
            if (unPays.id == ecurie.idPays) {
                nomPays = unPays.nom;
            }
        }

        let p = [];

        for (const pilote of pilotes) {
            if (pilote.idEcurie == ecurie.id) {
                p.push({
                    'ordre': pilote.ordre,
                    'nom': pilote.nom + ' ' + pilote.prenom
                });
            }
        }

        result.push({
            'id': ecurie.id,
            'nom': ecurie.nom,
            'nomPays': nomPays,
            'pilotes': p
        });
    }

    reply.send(result);
    connection.end();
}

const getEcurie = async (req, reply) => {
    const { id } = req.params

    const connection = await mysql.createConnection({
        host: 'casf1_db_1',
        user: 'root',
        password: '3M75B4fKWbsr',
        database: 'f1'
    });

    connection.connect();

    connection.query('SELECT id, nom, photo, idPays FROM ecurie where id = ?', [id], (err, res, fields) => {
        console.log(err);
        console.log(res);
        console.log(fields);
        reply.send(res);
    });

    connection.end();
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

const deleteEcurie = async (req, reply) => {
    const { id } = req.params

    const connection = await mysql.createConnection({
        host: 'casf1_db_1',
        user: 'root',
        password: '3M75B4fKWbsr',
        database: 'f1'
    });

    connection.connect();

    connection.query('DELETE FROM ecurie where id = ?', [id], (err, res, fields) => {
        reply.send({
            message: "L'ecurie " + id + " a été supprimé."
        });
    });

    connection.end();
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