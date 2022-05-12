const pool = require('../../database');

const getEcuries = async (req, reply) => {
    const [rows, fields] = await pool.query('SELECT ecurie.id as idEcurie, ecurie.nom as nomEcurie, ecurie.photo, pays.id as idPays, pays.nom as nomPays from ecurie join pays on ecurie.idPays = pays.id');
    const [pilotes, pilotesFields] = await pool.query('SELECT id, nom, prenom, ordre, idEcurie from pilote');

    let result = [];

    for (const ecurie of rows) {
        let p = [];
        for (const pilote of pilotes) {
            if (pilote.idEcurie === ecurie.idEcurie) {
                p.push({
                    'id': pilote.id,
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

const postEcurie = async (req, reply) => {
    const body = req.body;
    console.log(body);

    const [rows, fields] = await pool.query('INSERT INTO ecurie(nom, photo, idPays) values(?, ?, ?)', [body.nom, body.photo, body.idPays]);

    reply.code(204);
}

const deleteEcurie = async (req, reply) => {
    const body = req.body;
    console.log(body);

    const [rows, fields] = await pool.query('DELETE FROM ecurie where id=?', [body.id]);

    reply.code(204);
}

const putEcurie = async (req, reply) => {
    const body = req.body;
    console.log(body.data);

    if (body.data.nom !== undefined) {
        const [rows, fields] = await pool.query('UPDATE ecurie SET nom=? where id=?', [body.data.nom, body.data.id]);
    }

    if (body.data.idPays !== undefined) {
        const [rows, fields] = await pool.query('UPDATE ecurie SET idPays=? where id=?', [body.data.idPays, body.data.id]);
    }

    if (body.data.pilotes !== undefined) {
        for (let pilote of body.data.pilotes) {
            console.log("update " + body.data.id + " - " + pilote.ordre + " - " + pilote.id);
            await pool.query('UPDATE pilote SET idEcurie=?, ordre=? where id=?', [body.data.id, pilote.ordre, pilote.id]);
        }
    }

    reply.code(204);
}

module.exports = {
    getEcuries,
    postEcurie,
    deleteEcurie,
    putEcurie
}