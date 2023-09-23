import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyProps {
    latitude: number
    longitude: number
}

export interface GymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findById(gymId: string): Promise<Gym | null>
    findManyByTitle(title: string, page: number): Promise<Gym[]>
    findManyNearby(params: FindManyNearbyProps): Promise<Gym[]>
}