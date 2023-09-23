import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { SearchGymsService } from '../searchGymsService'

export function makeSearchGymsService(): SearchGymsService {
    const gymsRepository = new PrismaGymsRepository()
    const searchGymsService = new SearchGymsService(gymsRepository)

    return searchGymsService
}