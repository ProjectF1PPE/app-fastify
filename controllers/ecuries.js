const pool = require('../database');

const getEcuries = async (req, reply) => {
    const [rows, fields] = await pool.query('SELECT ecurie.id as idEcurie, ecurie.nom as nomEcurie, ecurie.photo, pays.id as idPays, pays.nom as nomPays from ecurie join pays on ecurie.idPays = pays.id');
    const [pilotes, pilotesFields] = await pool.query('SELECT id, nom, prenom, ordre, idEcurie from pilote');

    let result = [];

    for (const ecurie of rows) {
        let p = [];
        for (const pilote of pilotes) {
            if (pilote.idEcurie == ecurie.idEcurie) {
                p.push({
                    'ordre': pilote.ordre,
                    'nom': pilote.nom + ' ' + pilote.prenom
                });
            }
        }

        result.push({
            'idEcurie': ecurie.idEcurie,
            'nomEcurie': ecurie.nomEcurie,
            "idPays": ecurie.idPays,
            'nomPays': ecurie.nomPays,
            'pilotes': p
        });
    }

    reply.send(result);
}

const getEcurie = async (req, reply) => {
    const { id } = req.params
    const [ecurie, fields] = await pool.query('SELECT id, nom, photo, idPays FROM ecurie where id = ?', [id]);
    reply.send(...ecurie);
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

    const [rows, fields] = await pool.query("DELETE FROM ecurie where id = ?", [id]);
    reply.send({
        message: "L'ecurie " + id + " a été supprimé."
    });
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