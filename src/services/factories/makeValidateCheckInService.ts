import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { ValidateCheckInService } from '../validateCheckInService'

export function makeValidateCheckInService(): ValidateCheckInService {
    const checkInsRepository = new PrismaCheckInsRepository()
    const validateCheckInService = new ValidateCheckInService(checkInsRepository)

    return validateCheckInService
}