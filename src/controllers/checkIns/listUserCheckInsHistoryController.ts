import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeListUserCheckInsHistoryService } from '@/services/factories/makeListUserCheckInsHistoryService'

export async function listUserCheckInsHistoryController(request: FastifyRequest, reply: FastifyReply) {
    const listUserCheckInsHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = listUserCheckInsHistoryQuerySchema.parse(request.query)

    const listUserCheckInsHistoryService = makeListUserCheckInsHistoryService()

    const { checkIns } = await listUserCheckInsHistoryService.execute({
        userId: request.user.sub,
        page
    })

    return reply.status(201).send({
        checkIns
    })
}