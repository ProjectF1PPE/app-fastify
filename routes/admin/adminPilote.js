const {
    getPilotes,
    postPilote,
} = require('../../controllers/admin/pilotesAdmin')

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
    handler: postPilote,
}

function adminPilotesRoutes(fastify, options, done) {
    fastify.get('/api/admin/pilotes', getPilotesOpts)
    fastify.post('/api/admin/pilotes', postPiloteOpts)

    done()
}

module.exports = adminPilotesRoutes