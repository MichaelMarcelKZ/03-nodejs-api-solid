import { makeSearchGymsService } from '@/services/factories/makeSearchGymsService'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function searchGymsController(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsParamsSchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { q, page } = searchGymsParamsSchema.parse(request.params)

    const createGymService = makeSearchGymsService()

    const { gyms } = await createGymService.execute({ query: q, page })

    return reply.status(201).send({
        gyms
    })
}