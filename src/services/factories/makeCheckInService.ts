import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'

import { CheckInService } from '../checkInService'

export function makeCheckInService(): CheckInService {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const checkInService = new CheckInService(checkInsRepository, gymsRepository)

    return checkInService
}