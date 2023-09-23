import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { GetUserProfileService } from '../getUserProfileService'

export function makeGetUserProfileService(): GetUserProfileService {
    const usersRepository = new PrismaUsersRepository()
    const getUserProfileService = new GetUserProfileService(usersRepository)

    return getUserProfileService
}