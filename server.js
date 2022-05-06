const fastify = require('fastify')({
    logger: true
});
const path = require("path");
const fastifyStatic = require("fastify-static");

const mysql = require('mysql2');

/*
fastify.register(require('fastify-mysql'), {
    promise: true,
    connectionString: 'mysql://root:3M75B4fKWbsr@casf1_db_1:3306/f1'
});

 */

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

fastify.register(require('./routes/ecurie'));
fastify.register(require('./routes/gp'));
fastify.register(require('./routes/pilote'));
fastify.register(require('./routes/resultats/gp'));
fastify.register(require('./routes/resultats/pilote'));

/*
fastify.mysql.query('SELECT * from ecurie', (err, result) => {
    client.release();
    reply.send(result);
    //reply.send(err || result);
});

/*
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'pages'),
    prefix: '/pages/',
    list: true,
    decorateReply: false
})

 */

/*
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'pages'),
    prefix: '/pages/',
    decorateReply: false
})

/*
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'pages', 'gp', 'circuit'),
    prefix: '/pages/gp/circuit/',
    list: true,
    decorateReply: false
})

/*
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'pages'),
    decorateReply: false
});

/*
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'pages', 'ecurie'),
    decorateReply: false
});

/*

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'pages', 'pilote'),
    decorateReply: false
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'modules', 'footer'),
    decorateReply: false
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public', 'modules', 'navbar'),
    decorateReply: false
});
 */

fastify.get('/insomnia', async (request, reply) => {
    reply.sendFile('insomnia.json');
});

fastify.get('/', async (request, reply) => {
    reply.sendFile('index.html');
});

/*
fastify.get('/ecuries', async (request, reply) => {
    reply.sendFile('ecuries.html', path.join(__dirname, 'public', 'pages', 'ecurie'));
});

 */

fastify.get('/ecuries', async (request, reply) => {
    reply.sendFile('pages/ecurie/ecuries.html');
});

fastify.get('/pilotes', async (request, reply) => {
    reply.sendFile('pages/pilote/pilotes.html');
});

fastify.get('/gp', async (request, reply) => {
    reply.sendFile('pages/gp/gp.html');
});


fastify.get('/admin/ecurie', async (request, reply) => {
    reply.sendFile('pages/ecurie/admin/ecurieAdmin.html');
});

/*
fastify.get('/ecurie', async (request, reply) => {
    const connection = await fastify.mysql.getConnection()
    const [rows] = await connection.query('Select id, nom, prenom, ordre from pilote order by id')
    connection.release()
    return rows[0]
});
 */

const start = async () => {
    try {
        await fastify.listen(8080, '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()