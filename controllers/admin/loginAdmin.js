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
    const rememberMe = body.rememberMe;

    const match = await bcrypt.compare(password, adminpassword);

    if (match) {
        let options =  {};

        if (!rememberMe) {
            options.expiresIn = "3h";
        }

        reply.send(jwt.sign({}, adminpassword, options));
    } else {
        reply.badRequest('Wrong password');
    }
}

module.exports = {
    loginAdmin
}