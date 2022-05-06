const pool = require('../../../database');

const getEcuries = async (req, reply) => {
    const [ecuries, ecuriesFields] = await pool.query('SELECT id, nom, photo, idPays from ecurie');
    const [pilotes, pilotesFields] = await pool.query('SELECT id, nom, prenom, ordre, idEcurie from pilote');
    const [pays, paysFields] = await pool.query('SELECT id, nom from pays');

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

const addResultat = async (req, reply) => {
    const { gp, bonus, classement } = req.body;

    const bareme = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0];

    /*
    const result = {
        gp: '2',
        bonus: idPilote or null
        classement: [
            {
                id: "22",
                place: 2
            }
        ]
    }
     */

    for (let pilote of classement) {
        let points;
        if (pilote.place > 10 || pilote.place === -1) {
            points = 0;
        } else {
            points = bareme[pilote.place - 1];
        }

        if (bonus != null && bonus === pilote.id) {
            points++;
        }

        await pool.query("INSERT into resultat(idPilote, idGP, place, point) values (?, ?, ?, ?)", [pilote.id, gp, pilote.place, points]);
    }

    reply.code(204);
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
    addResultat,
    deleteEcurie,
    updateEcurie,
}