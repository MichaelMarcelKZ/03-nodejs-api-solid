import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { RegisterService } from '@/services/registerService'
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { HTTPSolidError } from '@/services/errors/httpSolidError'


export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const usersRepository = new PrismaUsersRepository()
        const registerService = new RegisterService(usersRepository)

        await registerService.execute({ name, email, password })
    } catch (err) {
        if (err instanceof HTTPSolidError) {
            return reply.status(err.code).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}