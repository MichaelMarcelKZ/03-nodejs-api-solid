import { makeListNearbyGymsService } from '@/services/factories/makeListNearbyGymsService'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function listNearbyGymsController(request: FastifyRequest, reply: FastifyReply) {
    const listNearbyGymsParamsSchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = listNearbyGymsParamsSchema.parse(request.params)

    const listNearbyGymsService = makeListNearbyGymsService()

    const { gyms } = await listNearbyGymsService.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(201).send({
        gyms
    })
}