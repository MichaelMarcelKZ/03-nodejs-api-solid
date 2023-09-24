import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createUserAndAuthenticate(app: FastifyInstance) {
    await request(app.server)
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com.br',
            password: 'test@123',
        })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'johndoe@example.com.br',
            password: 'test@123',
        })

    const { token } = authResponse.body

    return {
        token
    }
}