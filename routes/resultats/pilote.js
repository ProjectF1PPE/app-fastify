const {
    getResultatsPilotes
} = require('../../controllers/resultats/pilotes')

const Pilote = {
    type: 'object',
    properties: {
        place: { type: 'number' },
        id: { type: 'number' },
        idPays: { type: 'string' },
        nom: { type: 'string' },
        ecurie: { type: 'string' },
        points: { type: 'number' },
    },
}

const getPilotesOpts = {
    schema: {
        querystring: {
            gp: { type: 'integer' }
        },
        response: {
            200: {
                type: 'array',
                pilotes: Pilote,
            },
        },
    },
    handler: getResultatsPilotes,
}

function piloteRoutes(fastify, options, done) {
    fastify.get('/api/resultats/pilotes/:gp', getPilotesOpts)

    done()
}

module.exports = piloteRoutes