const pool = require('../../database');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const adminpassword = fs.readFileSync('./admin-password.hash', {
    encoding: 'utf8'
});

const loginAdmin = async (req, reply) => {
    const body = req.body;
    const password = body.password;

    const match = await bcrypt.compare(password, adminpassword);

    if (match) {
        let options =  {};

        reply.send(jwt.sign({}, adminpassword, options));
    } else {
        reply.code(400).message('Mauvais mot de passe');
    }
}

module.exports = {
    loginAdmin
}