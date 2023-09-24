import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { CreateGymService } from '../createGymService'

export function makeCreateGymService(): CreateGymService {
    const gymsRepository = new PrismaGymsRepository()
    const createGymService = new CreateGymService(gymsRepository)

    return createGymService
}