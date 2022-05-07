const pool = require('../database');

const getPilotes = async (req, reply) => {
    const [rows, fields] = await pool.query("SELECT id, nom, prenom, ordre, idPays from pilote order by id");
    reply.send(rows);
}

module.exports = {
    getPilotes
}