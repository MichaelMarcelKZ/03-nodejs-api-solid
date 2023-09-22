import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { HTTPSolidError } from '@/services/errors/httpSolidError'
import { AuthenticateService } from '@/services/authenticateService'


export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const usersRepository = new PrismaUsersRepository()
        const authenticateService = new AuthenticateService(usersRepository)

        await authenticateService.execute({ email, password })
    } catch (err) {
        if (err instanceof HTTPSolidError) {
            console.log('Entrou aqui!')
            return reply.status(err.code).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send()
}