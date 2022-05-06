const pool = require('../database');

const getResultatsPilotes = async (req, reply) => {
    const [ecuries, ecuriesFields] = await pool.query('SELECT id, nom, photo, idPays from ecurie');
    const [pilotes, pilotesFields] = await pool.query('SELECT id, nom, prenom, ordre, idEcurie from pilote');
    const [pays, paysFields] = await pool.query('SELECT id, nom from pays');

    // place
    // idPilote
    // nom+prenom pilote
    // id pays
    // points

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