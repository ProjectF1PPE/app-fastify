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

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
});

fastify.register(require('./routes/ecurie/ecurie'));
fastify.register(require('./routes/ecurie/admin/adminEcurie'));
fastify.register(require('./routes/gp'));
fastify.register(require('./routes/pilote'));
fastify.register(require('./routes/pays'));
fastify.register(require('./routes/resultats/gp'));
fastify.register(require('./routes/resultats/pilote'));
fastify.register(require('./routes/resultats/admin/resultat'));
fastify.register(require('./routes/loginAdmin'));


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
    reply.sendFile('pages/classement/classementPilote.html');
});

fastify.get('/admin/ecurie', async (request, reply) => {
    reply.sendFile('pages/ecurie/admin/ecurieAdmin.html');
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