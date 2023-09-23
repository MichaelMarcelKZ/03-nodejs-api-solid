import { GetUserMetricsService } from '../getUserMetricsService'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeGetUserMetricsService(): GetUserMetricsService {
    const checkInsRepository = new PrismaCheckInsRepository()
    const getUserMetricsService = new GetUserMetricsService(checkInsRepository)

    return getUserMetricsService
}