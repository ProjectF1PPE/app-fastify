const {
    getGP,
} = require('../controllers/resultatsGP')

const GP = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        nom: { type: 'string' }
    },
}

const getGPOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                gp: GP,
            },
        },
    },
    handler: getGP,
}

function resultatsGPRoutes(fastify, options, done) {
    fastify.get('/api/resultats/gp', getGPOpts)
    done()
}

module.exports = resultatsGPRoutes