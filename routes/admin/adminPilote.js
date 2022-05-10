const {
    getPilotes,
    postPilote, putPilote,
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

const putPiloteOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    //preHandler: authorizedOnly,
    handler: putPilote,
}

function adminPilotesRoutes(fastify, options, done) {
    fastify.get('/api/admin/pilotes', getPilotesOpts)
    fastify.post('/api/admin/pilote', postPiloteOpts)
    fastify.put('/api/admin/pilote', putPiloteOpts)

    done()
}

module.exports = adminPilotesRoutes