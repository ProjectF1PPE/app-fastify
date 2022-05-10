const {
    addResultat
} = require('../../controllers/admin/resultatsAdmin')

const Resultat = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        place: { type: 'integer' },
    },
}

const addResultatOpts = {
    schema: {
        body: {
            gp: { type: 'integer' },
            bonus: { type: 'integer' },
            classement: {
                type: 'array',
                items: Resultat
            }
        }
    },
    handler: addResultat,
}

function resultatRoutes(fastify, options, done) {
    fastify.post('/api/admin/resultats', addResultatOpts)

    done()
}

module.exports = resultatRoutes