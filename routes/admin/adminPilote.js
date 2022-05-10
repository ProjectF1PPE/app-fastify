const {
    getPilotes,
    postPilote,
} = require('../../controllers/admin/pilotesAdmin')

const authorizedOnly = require('../../middlewares/autorizedOnly');

const Pilote = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        nom: { type: 'string' },
        photo: { type: 'string' },
        idPays: { type: 'string' },
    },
}

const getPilotesOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    //preHandler: authorizedOnly,
    handler: getPilotes,
}

const postPiloteOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    //preHandler: authorizedOnly,
    handler: postPilote,
}

function adminPilotesRoutes(fastify, options, done) {
    fastify.get('/api/admin/pilotes', getPilotesOpts)
    fastify.post('/api/admin/pilotes', postPiloteOpts)

    done()
}

module.exports = adminPilotesRoutes