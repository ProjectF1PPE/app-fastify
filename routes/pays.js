const {
    getPays,
} = require('../controllers/pays')

const Pays = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        nom: { type: 'string' }
    },
}

const getPaysOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Pays,
            },
        },
    },
    handler: getPays,
}

function paysRoutes(fastify, options, done) {
    fastify.get('/api/pays', getPaysOpts)
    done()
}

module.exports = paysRoutes