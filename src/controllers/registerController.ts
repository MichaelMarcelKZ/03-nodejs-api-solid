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
        return reply.status(201).send()
    } catch (err) {
        if (err instanceof HTTPSolidError) {
            console.log('Entrou aqui!')
            return reply.status((err as HTTPSolidError).code).send({ message: err.message })
        }

        return reply.status(500).send()
    }
}