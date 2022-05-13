const {
    getGP, postGP, deleteGP, putGP
} = require('../../controllers/admin/gpAdmin')

/*
const authorizedOnly = require('../../middlewares/autorizedOnly');
const authorizationSchema = require('../../schemas/authorizationSchema');
 */

const GP = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        nom: { type: 'string' },
        photo: { type: 'string' },
        idPays: { type: 'string' },
    },
}

const getGPOpts = {
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
    handler: getGP,
}

const postGPOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: postGP,
}

const deleteGPOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: deleteGP,
}

const putGPOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: putGP,
}

function adminGPROutes(fastify, options, done) {
    fastify.get('/api/admin/gp', getGP)
    fastify.post('/api/admin/gp', postGPOpts)
    fastify.delete('/api/admin/gp', deleteGPOpts)
    fastify.put('/api/admin/gp', putGPOpts)

    done()
}

module.exports = adminGPROutes