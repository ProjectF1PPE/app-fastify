const fastify = require('fastify')({
    logger: true
});
const path = require("path");
const fastifyStatic = require("fastify-static");

/*
fastify.register(require('fastify-mysql'), {
    promise: true,
    connectionString: 'mysql://debian:3M75B4fKWbsr@localhost/mysql'
})

 */

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
    reply.sendFile('pages/ecurie/ecuries.html');
});

fastify.get('/pilotes', async (request, reply) => {
    reply.sendFile('pilote/pilote.html');
});

fastify.get('/ecurie', async (request, reply) => {
    const connection = await fastify.mysql.getConnection()
    const [rows] = await connection.query('Select id, nom, prenom, ordre from pilote order by id')
    connection.release()
    return rows[0]
});

fastify.get('/pilote', async (request, reply) => {
    const connection = await fastify.mysql.getConnection()
    const [rows] = await connection.query('Select id, nom, prenom, ordre from pilote order by id')
    connection.release()
    return rows[0]
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