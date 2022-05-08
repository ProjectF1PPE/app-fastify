const {
    loginAdmin,
} = require('../controllers/loginAdmin')

const loginAdminOpts = {
    handler: loginAdmin,
}

function loginRoutes(fastify, options, done) {
    fastify.post('/api/admin/login', loginAdminOpts)
    done()
}

module.exports = loginRoutes