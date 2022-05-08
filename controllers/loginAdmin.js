const pool = require('../database');
const bcrypt = require('bcrypt');

const loginAdmin = async (req, reply) => {
    const body = req.body;

    const passwordHash = await bcrypt.hash("ritelix", 12);

    const user = body.user;
    const password = body.password;

    const match = await bcrypt.compare(password, passwordHash);

    reply.send(match);
}

module.exports = {
    loginAdmin
}