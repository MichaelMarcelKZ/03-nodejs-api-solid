import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { HTTPSolidError } from '@/services/errors/httpSolidError'
import { makeRegisterService } from '@/services/factories/makeRegisterService'


export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerService = makeRegisterService()

        await registerService.execute({ name, email, password })
    } catch (err) {
        if (err instanceof HTTPSolidError) {
            return reply.status(err.code).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}