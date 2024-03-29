const fastify = require('fastify')({
    logger: true
});
const path = require("path");
const fastifyStatic = require("fastify-static");

fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api'}
    }
});

fastify.register(require('@fastify/sensible'));

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
});

fastify.register(require('./routes/ecurie'));
fastify.register(require('./routes/gp'));
fastify.register(require('./routes/pays'));
fastify.register(require('./routes/pilote'));
fastify.register(require('./routes/resultatsGP'));
fastify.register(require('./routes/resultatsPilote'));

fastify.register(require('./routes/admin/adminEcurie'));
fastify.register(require('./routes/admin/adminGP'));
fastify.register(require('./routes/admin/adminPilote'));
fastify.register(require('./routes/admin/loginAdmin'));
fastify.register(require('./routes/admin/resultat'));
fastify.register(require('./routes/admin/authorization'));

fastify.get('/insomnia', async (request, reply) => {
    reply.sendFile('insomnia.json');
});

fastify.get('/', async (request, reply) => {
    reply.sendFile('index.html');
});

fastify.get('/ecuries', async (request, reply) => {
    reply.sendFile('pages/ecurie/ecuries.html');
});

fastify.get('/pilotes', async (request, reply) => {
    reply.sendFile('pages/pilote/pilotes.html');
});

fastify.get('/gp', async (request, reply) => {
    reply.sendFile('pages/gp/gp.html');
});

fastify.get('/classement/pilotes', async (request, reply) => {
    reply.sendFile('pages/resultat/pilote/resultat.html');
});

fastify.get('/classement/ecuries', async (request, reply) => {
    reply.sendFile('pages/resultat/ecurie/resultat.html');
});

fastify.get('/admin', async (request, reply) => {
    reply.sendFile('/indexAdmin.html');
});

fastify.get('/admin/ecurie', async (request, reply) => {
    reply.sendFile('pages/ecurie/admin/ecurieAdmin.html');
});

fastify.get('/admin/pilote', async (request, reply) => {
    reply.sendFile('pages/pilote/admin/pilote.html');
});

fastify.get('/admin/gp', async (request, reply) => {
    reply.sendFile('pages/gp/admin/gp.html');
});

fastify.get('/admin/classement/pilotes', async (request, reply) => {
    reply.sendFile('pages/resultat/pilote/admin/resultat.html');
});

fastify.get('/admin/classement/ecuries', async (request, reply) => {
    reply.sendFile('pages/resultat/ecurie/admin/resultat.html');
});

const start = async () => {
    try {
        await fastify.listen(8080, '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()