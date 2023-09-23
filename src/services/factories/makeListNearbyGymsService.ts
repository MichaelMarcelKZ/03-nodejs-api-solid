import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { ListNearbyGymsService } from '../listNearbyGymsService'

export function makeListNearbyGymsService(): ListNearbyGymsService {
    const gymsRepository = new PrismaGymsRepository()
    const listNearbyGymsService = new ListNearbyGymsService(gymsRepository)

    return listNearbyGymsService
}