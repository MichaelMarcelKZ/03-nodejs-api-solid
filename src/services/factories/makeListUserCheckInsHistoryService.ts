import { ListUserCheckInsHistoryService } from '../listUserCheckInsHistoryService'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeListNearbyGymsService(): ListUserCheckInsHistoryService {
    const checkInsRepository = new PrismaCheckInsRepository()
    const listUserCheckInsHistoryService = new ListUserCheckInsHistoryService(checkInsRepository)

    return listUserCheckInsHistoryService
}