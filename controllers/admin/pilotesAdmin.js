const pool = require('../../database');

const getPilotes = async (req, reply) => {
    const [pilotes, pilotesFields] = await pool.query('SELECT id, nom, prenom, ordre, idEcurie, idPays from pilote');
    const [ecuries, ecuriesFields] = await pool.query('SELECT id, nom from ecurie');
    const [pays, paysFields] = await pool.query('SELECT id, nom from pays');

    let data = [];
    data.pilotes = pilotes;
    data.ecuries = ecuries;
    data.pays = pays;

    reply.send(data);
}

const postPilote = async (req, reply) => {
    const body = req.body;
    console.log(body);

    await pool.query('INSERT INTO pilote(id, nom, prenom, dateNaissance, ordre, idPays, idEcurie) values(?, ?, ?, ?, ?, ?, ?)',
        [body.id, body.nom, body.prenom, body.dateNaissance, body.ordre, body.idPays, body.idEcurie], err => reply.send(err));

    reply.code(204);
}

const deletePilote = async (req, reply) => {
    const body = req.body;
    console.log(body);

    await pool.query('DELETE FROM resultat where idPilote=?', [body.id], err => reply.send(err));
    await pool.query('DELETE FROM pilote where id=?', [body.id], err => reply.send(err));

    reply.code(204);
}

const putPilote = async (req, reply) => {
    const body = req.body;
    console.log(body);

    await pool.query('UPDATE pilote SET nom=?, prenom=?, dateNaissance=?, ordre=?, idPays=?, idEcurie=? where id=?',
        [body.nom, body.prenom, body.dateNaissance, body.ordre, body.idPays, body.idEcurie, body.id], err => reply.send(err));

    reply.code(204);
}

module.exports = {
    getPilotes,
    postPilote,
    deletePilote,
    putPilote
}