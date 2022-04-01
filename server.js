const fastify = require('fastify')({
    logger: true
});
const path = require("path");

fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api'}
    }
});

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '.'),
    prefix: '/'
});

fastify.get('/', async (request, reply) => {
    reply.sendFile('index.html');
});

fastify.get('/ecuries', async (request, reply) => {
    reply.sendFile('ecurie/ecuries.html');
});

fastify.get('/gp', async (request, reply) => {
    reply.sendFile('gp/gp.html');
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