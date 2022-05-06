const pool = require('../database');

const getPays = async (req, reply) => {
    const [rows, fields] = await pool.query("SELECT id, nom from pays order by id");
    reply.send(rows);
}

module.exports = {
    getPays
}