import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyProps, GymsRepository } from '../gymsRepository'
import { prisma } from '@/database/prisma'

export class PrismaGymsRepository implements GymsRepository {
    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }

    async findById(gymId: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id: gymId
            }
        })

        return gym
    }

    async findManyByTitle(title: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive'
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }

    async findManyNearby({ latitude, longitude }: FindManyNearbyProps) {
        const gyms: Gym[] = await prisma.$queryRaw`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }

}