const {
    loginAdmin,
} = require('../../controllers/admin/loginAdmin')

const S = require('fluent-json-schema');
const joi = require('joi');

const schema = joi.object({
    password: joi.string()
        .alphanum()
        .required(), /*
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
     */
});

const loginAdminOpts = {
    schema: S.object().prop('password', S.string()).prop('rememberMe', S.boolean()).required(['password']),
    handler: async (req, reply) => {
        try {
            await schema.validateAsync(req.body);
            await loginAdmin(req, reply);
        } catch (err) {
            return "Mauvais mot de passe";
        }
    },
}

function loginRoutes(fastify, options, done) {
    fastify.post('/api/admin/login', loginAdminOpts)
    done()
}

module.exports = loginRoutes