const members = require('../controllers/memberController')
const config = require('../config.js')
const {
    create
} = require('domain')

async function routes(fastify, options, next) {
    fastify.register(require('@fastify/jwt'), {
        secret: config.jwt_secret
    })

    // fastify.addHook("onRequest", async (request, reply) => {
    //     try {
    //         await request.jwtVerify()
    //     } catch (err) {
    //         reply.send({
    //             status: 'error',
    //             message: 'กรุณาเข้าสู่ระบบก่อนทำรายการ'

    //         })
    //     }
    // })

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    fastify.post('/signup', (req, reply) => {
        let payload = {
            member_id: 1,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            create: Date.now()
        }
        const token = fastify.jwt.sign({
            payload
        })
        reply.send({
            token
        })
    })

    fastify.get('/', async (request, reply) => {
        return {
            hello: 'world !! this is my api',
            version: '1.0.0'
        }
    })

    fastify.get('/member', members.getMember)
    fastify.post('/member', members.addMember)

    next()
}

module.exports = routes