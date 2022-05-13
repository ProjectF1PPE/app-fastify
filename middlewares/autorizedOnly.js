const jwt = require('jsonwebtoken');
const fs = require("fs");

const adminpassword = fs.readFileSync('./admin-password.hash', {
    encoding: 'utf8'
});

const authorizedOnly = async (request, reply) => {
    const authorization = request.headers.authorization;

    if (!authorization || !jwt.verify(authorization, adminpassword)) {
        return reply.unauthorized("Vous n'êtes pas autorisé !");
    }

    reply.code(204);
};

module.exports = authorizedOnly;