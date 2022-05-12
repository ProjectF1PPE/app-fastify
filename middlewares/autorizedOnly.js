const jwt = require('jsonwebtoken');
const fs = require("fs");

const adminpassword = fs.readFileSync('./admin-password.hash', {
    encoding: 'utf8'
});

const authorizedOnly = async (request, reply) => {
    console.log(request.headers);

    const authorization = request.headers.authorization;

    console.log(authorization);

    if (!authorization) {
        return reply.unauthorized("Not authorized !");
    }

    if (!jwt.verify(authorization, adminpassword)) {
        return reply.unauthorized("Pas authorized !");
    }

    reply.code(204);
};

module.exports = authorizedOnly;