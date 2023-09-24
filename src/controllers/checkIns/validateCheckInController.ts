import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInService } from '@/services/factories/makeValidateCheckInService'

export async function validateCheckInController(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    })


    const { checkInId } = validateCheckInParamsSchema.parse(request.params)

    const validateCheckInService = makeValidateCheckInService()

    const { checkIn } = await validateCheckInService.execute({
        checkInId
    })

    return reply.status(200).send({
        checkIn
    })
}