import { prisma } from '@/database/prisma'
import { Role } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createUserAndAuthenticate(app: FastifyInstance, isAdmin = true) {
    await request(app.server)
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com.br',
            password: 'test@123',
        })

    if (isAdmin) {
        const user = await prisma.user.findFirst()

        await prisma.user.update({
            where: {
                id: user?.id
            },
            data: {
                role: Role.ADMIN
            }
        })
    }

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