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
    fastify.get('/ecuries', getEcuriesOpts)

    fastify.get('/ecuries/:id', getEcurieOpts)

    fastify.post('/ecuries', postEcurieOpts)

    fastify.delete('/ecuries/:id', deleteEcurieOpts)

    fastify.put('/ecuries/:id', updateEcurieOpts)

    done()
}

module.exports = ecurieRoutes