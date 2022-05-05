const {
    getPilotes
} = require('../controllers/pilotes')

const Pilote = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    },
}

const getPilotesOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                pilotes: Pilote,
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