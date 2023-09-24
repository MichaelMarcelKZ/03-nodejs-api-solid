import { makeGetUserProfileService } from '@/services/factories/makeGetUserProfileService'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getUserProfileService = makeGetUserProfileService()

    const { user } = await getUserProfileService.execute({
        userId: request.user.sub
    })

    return reply.status(200).send({
        user: {
            ...user,
            password: undefined,
        }
    })
}