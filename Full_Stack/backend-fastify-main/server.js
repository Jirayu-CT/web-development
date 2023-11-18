const fastify = require('fastify')({
    logger: true
})

fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/cors'), { 
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    maxAge: 86400,
    preflightContinue: false
})



fastify.register(require('./routes'))

// Run the server!
const start = async () => {
    try {
        await fastify.listen({
            port: 3001
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()