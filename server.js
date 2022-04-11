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
    root: path.join(__dirname, 'public')
})

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public/scripts'),
    prefix: '/scripts/',
    decorateReply: false
});

fastify.get('/', async (request, reply) => {
    reply.sendFile('index.html');
});

fastify.get('/ecuries', async (request, reply) => {
    reply.sendFile('ecurie/ecuries.html');
});

fastify.get('/pilotes', async (request, reply) => {
    reply.sendFile('pilote/pilote.html');
});

fastify.get('/ecurie', async (request, reply) => {
    return {
        id: 'zdzdz',
        name: 'zdzdz'
    }
});

fastify.get('/pilote', async (request, reply) => {
    return [
        {id: "23", nom: "Serein", prenom: "ENzo", description: 'Beau pilote'},
        {id: "22", nom: "Tsunoda", prenom: "Yuki", description: 'Magnifique pilote'}
    ]
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