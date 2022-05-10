const {
    getResultatsPilotes
} = require('../controllers/resultatsPilotes')

const Pilote = {
    type: 'object',
    properties: {
        idPilote: { type: 'integer' },
        place: { type: 'integer' },
        point: { type: 'integer' },
        idPays: { type: 'string' },
        nom: { type: 'string' },
        prenom: { type: 'string' }
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
                items: Pilote,
            },
        },
    },
    handler: getResultatsPilotes,
}

function piloteRoutes(fastify, options, done) {
    fastify.get('/api/resultats/pilotes/', getPilotesOpts)

    done()
}

module.exports = piloteRoutes