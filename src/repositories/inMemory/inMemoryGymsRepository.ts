import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyProps, GymsRepository } from '../gymsRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'


export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString()),
        }

        this.items.push(gym)

        return gym
    }

    async findById(gymId: string) {
        const gym = this.items.find((item) => item.id === gymId)

        if (!gym) {
            return null
        }

        return gym
    }

    async findManyByTitle(title: string, page: number) {
        return this.items
            .filter((item) => item.title.toLowerCase().includes(title.toLowerCase()))
            .slice((page - 1) * 20, page * 20)
    }

    async findManyNearby(params: FindManyNearbyProps) {
        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates({
                latitude: item.latitude.toNumber(),
                longitude: item.longitude.toNumber()
            }, {
                latitude: params.latitude,
                longitude: params.longitude
            })

            const MAX_DISTANCE_TO_GYM_IN_KILOMETERS = 10

            return distance < MAX_DISTANCE_TO_GYM_IN_KILOMETERS
        })
    }
}