const pool = require('../database');

const getResultatsPilotes = async (req, reply) => {
    const { gp } = req.query;
    const [rows, fields] = await pool.query('SELECT idPilote, nom, prenom, place, point, idPays from resultat join pilote on pilote.id = idPilote where idGP=?  order by place', [gp]);
    reply.send(rows);
}

module.exports = {
    getResultatsPilotes
}