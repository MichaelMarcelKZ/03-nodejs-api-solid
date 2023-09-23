import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { CreateGymService } from '../createGymService'

export function makeListNearbyGymsService(): CreateGymService {
    const gymsRepository = new PrismaGymsRepository()
    const createGymService = new CreateGymService(gymsRepository)

    return createGymService
}