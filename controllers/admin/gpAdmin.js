const pool = require('../../database');

const getGP = async (req, reply) => {
    const [rows, fields] = await pool.query('SELECT grandprix.id as id, ville, date, pays.id as idPays ' +
        'from grandprix join pays on grandprix.idPays = pays.id');

    reply.send(rows);
}

const postGP = async (req, reply) => {
    const body = req.body;
    console.log(body);

    await pool.query('INSERT INTO grandprix(ville, date, idPays) values(?, ?, ?)', [body.ville, body.date, body.idPays], err => reply.send(err));

    reply.code(204);
}

const deleteGP = async (req, reply) => {
    const body = req.body;
    console.log(body);

    await pool.query('DELETE FROM resultat where idGP=?', [body.id], err => reply.send(err));
    await pool.query('DELETE FROM grandprix where id=?', [body.id], err => reply.send(err));

    reply.code(204);
}

const putGP = async (req, reply) => {
    const body = req.body;
    console.log(body);

    if (body.circuit !== undefined) {
        await pool.query('UPDATE grandprix SET ville=? where id=?', [body.circuit, body.id], err => reply.send(err));
    }

    if (body.date !== undefined) {
        await pool.query('UPDATE grandprix SET date=? where id=?', [body.date, body.id], err => reply.send(err));
    }

    if (body.idPays !== undefined) {
        await pool.query('UPDATE grandprix SET idPays=? where id=?', [body.idPays, body.id], err => reply.send(err));
    }

    reply.code(204);
}

module.exports = {
    getGP,
    postGP,
    deleteGP,
    putGP
}