const {
    getPilotes, postPilote, deletePilote, putPilote,
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

const deletePiloteOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    //preHandler: authorizedOnly,
    handler: deletePilote,
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
    fastify.get('/api/admin/pilote', getPilotesOpts)
    fastify.post('/api/admin/pilote', postPiloteOpts)
    fastify.delete('/api/admin/pilote', deletePiloteOpts)
    fastify.put('/api/admin/pilote', putPiloteOpts)

    done()
}

module.exports = adminPilotesRoutes