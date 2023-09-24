import { makeListNearbyGymsService } from '@/services/factories/makeListNearbyGymsService'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function listNearbyGymsController(request: FastifyRequest, reply: FastifyReply) {
    const listNearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = listNearbyGymsQuerySchema.parse(request.query)

    const listNearbyGymsService = makeListNearbyGymsService()

    const { gyms } = await listNearbyGymsService.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(200).send({
        gyms
    })
}