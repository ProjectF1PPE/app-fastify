const pool = require('../../database');

const getPilotes = async (req, reply) => {
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

const postPilote = async (req, reply) => {
    const body = req.body;
    console.log(body);

    const [rows, fields] = await pool.query('INSERT INTO pilote(id, nom, prenom, ordre, idPays, idEcurie) values(?, ?, ?, ?, ?, ?)',
        [body.id, body.nom, body.prenom, body.ordre, body.idPays, body.idEcurie]);

    reply.code(204);
}

const putPilote = async (req, reply) => {
    const body = req.body;
    console.log(body);

    const [rows, fields] = await pool.query('INSERT INTO ecurie(nom, idPays) values(?, ?)', [body.nom, body.idPays]);

    reply.code(204);
}

module.exports = {
    getPilotes,
    postPilote
}