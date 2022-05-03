const {
    getEcuries,
    getEcurie,
    addEcurie,
    deleteEcurie,
    updateEcurie,
} = require('../controllers/ecuries')

const Ecurie = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    },
}

const getEcuriesOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                ecuries: Ecurie,
            },
        },
    },
    handler: getEcuries,
}

const getEcurieOpts = {
    schema: {
        response: {
            200: Ecurie,
        },
    },
    handler: getEcurie,
}

const postEcurieOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
        response: {
            201: Ecurie,
        },
    },
    handler: addEcurie,
}

const deleteEcurieOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteEcurie,
}

const updateEcurieOpts = {
    schema: {
        response: {
            200: Ecurie,
        },
    },
    handler: updateEcurie,
}

function ecurieRoutes(fastify, options, done) {
    fastify.get('/api/ecuries', getEcuriesOpts)

    fastify.get('/api/ecuries/:id', getEcurieOpts)

    fastify.post('/api/ecuries', postEcurieOpts)

    fastify.delete('/api/ecuries/:id', deleteEcurieOpts)

    fastify.put('/api/ecuries/:id', updateEcurieOpts)

    done()
}

module.exports = ecurieRoutes