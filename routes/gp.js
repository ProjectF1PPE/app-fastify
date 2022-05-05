const {
    getGP,
} = require('../controllers/gp')

const GP = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        ville: { type: 'string' },
        date: { type: 'date' },
        photo: { type: 'string' },
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

function pilotesRoutes(fastify, options, done) {
    fastify.get('/api/gp', getGPOpts)
    done()
}

module.exports = pilotesRoutes