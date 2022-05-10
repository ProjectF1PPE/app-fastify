const {
    getEcuries, postEcurie, deleteEcurie, putEcurie
} = require('../../controllers/admin/ecuriesAdmin')

/*
const authorizedOnly = require('../../middlewares/autorizedOnly');
const authorizationSchema = require('../../schemas/authorizationSchema');


 */
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
            //...authorizationSchema.response
        },
        //headers: authorizationSchema.headers
    },
    //preHandler: authorizedOnly,
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

const deleteEcurieOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: deleteEcurie,
}

const putEcurieOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: putEcurie,
}

function adminEcuriesRoutes(fastify, options, done) {
    fastify.get('/api/admin/ecuries', getEcuriesOpts)
    fastify.post('/api/admin/ecurie', postEcurieOpts)
    fastify.delete('/api/admin/ecurie', deleteEcurieOpts)
    fastify.put('/api/admin/ecurie', putEcurieOpts)

    done()
}

module.exports = adminEcuriesRoutes