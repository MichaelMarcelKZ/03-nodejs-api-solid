import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { HTTPSolidError } from '@/services/errors/httpSolidError'
import { makeAuthenticateService } from '@/services/factories/makeAuthenticateService'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateService = makeAuthenticateService()

        const { user } = await authenticateService.execute({ email, password })
        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            },
        })

        return reply.status(200).send({
            token
        })
    } catch (err) {
        if (err instanceof HTTPSolidError) {
            console.log('Entrou aqui!')
            return reply.status(err.code).send({ message: err.message })
        }

        throw err
    }
}