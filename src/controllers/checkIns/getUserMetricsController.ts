import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetUserMetricsService } from '@/services/factories/makeGetUserMetricsService'

export async function getUserMetricsController(request: FastifyRequest, reply: FastifyReply) {
    const getUserMetricsService = makeGetUserMetricsService()

    const { checkInsCount } = await getUserMetricsService.execute({
        userId: request.user.sub
    })

    return reply.status(200).send({
        checkInsCount
    })
}