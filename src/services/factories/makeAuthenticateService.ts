import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { AuthenticateService } from '../authenticateService'

export function makeAuthenticateService(): AuthenticateService {
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    return authenticateService
}