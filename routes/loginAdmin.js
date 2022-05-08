const {
    loginAdmin,
} = require('../controllers/loginAdmin')

const S = require('fluent-json-schema');

const loginAdminOpts = {
    schema: S.object().prop('password', S.string()),
    handler: loginAdmin,
}

function loginRoutes(fastify, options, done) {
    fastify.post('/api/admin/login', loginAdminOpts)
    done()
}

module.exports = loginRoutes