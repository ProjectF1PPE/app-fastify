const {
    getEcuries, postEcurie,
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

const postEcurieOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: postEcurie,
}

function adminEcuriesRoutes(fastify, options, done) {
    fastify.get('/api/admin/ecuries', getEcuriesOpts)
    fastify.post('/api/admin/ecurie', postEcurieOpts)

    done()
}

module.exports = adminEcuriesRoutes