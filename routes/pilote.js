const {
    getPilotes
} = require('../controllers/pilotes')

const Pilote = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        nom: { type: 'string' },
        prenom: { type : 'string'},
        idPays: {type:'string'}
    },
}

const getPilotesOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Pilote,
            },
        },
    },
    handler: getPilotes,
}

function piloteRoutes(fastify, options, done) {
    fastify.get('/api/pilotes', getPilotesOpts)

    done()
}

module.exports = piloteRoutes