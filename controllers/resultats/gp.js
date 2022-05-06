const pool = require('../../database');

const getGP = async (req, reply) => {
    const [rows, fields] = await pool.query("SELECT id, ville as nom from grandprix order by id");
    reply.send(rows);
}

module.exports = {
    getGP
}