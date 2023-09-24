import { ListUserCheckInsHistoryService } from '../listUserCheckInsHistoryService'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeListUserCheckInsHistoryService(): ListUserCheckInsHistoryService {
    const checkInsRepository = new PrismaCheckInsRepository()
    const listUserCheckInsHistoryService = new ListUserCheckInsHistoryService(checkInsRepository)

    return listUserCheckInsHistoryService
}