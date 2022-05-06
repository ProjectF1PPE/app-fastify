const {
    getEcuries,
} = require('../../../controllers/ecurie/admin/ecuriesAdmin')

const Ecurie = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        nom: { type: 'string' },
        photo: { type: 'string' },
        idPays: { type: 'string' },
    },
}

const getEcuriesOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: getEcuries,
}

function adminEcuriesRoutes(fastify, options, done) {
    fastify.get('/api/admin/ecuries', getEcuriesOpts)

    done()
}

module.exports = adminEcuriesRoutes