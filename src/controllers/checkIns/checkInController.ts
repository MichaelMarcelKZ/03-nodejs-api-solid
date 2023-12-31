import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCheckInService } from '@/services/factories/makeCheckInService'

export async function checkInController(request: FastifyRequest, reply: FastifyReply) {
    const checkInParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const checkInBodySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { gymId } = checkInParamsSchema.parse(request.params)
    const { latitude, longitude } = checkInBodySchema.parse(request.body)

    const checkInService = makeCheckInService()

    const { checkIn } = await checkInService.execute({
        userId: request.user.sub,
        gymId,
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(201).send({
        checkIn,
    })
}