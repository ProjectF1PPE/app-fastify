const authorizedOnly = require('../../middlewares/autorizedOnly');

const postAuthorizationOpts = {
    handler: authorizedOnly,
}

function authorizationRoutes(fastify, options, done) {
    fastify.post('/api/authorization', postAuthorizationOpts);

    done()
}

module.exports = authorizationRoutes