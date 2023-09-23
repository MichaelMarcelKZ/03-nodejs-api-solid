import { GymsRepository } from '@/repositories/gymsRepository'

import { Gym } from '@prisma/client'

interface ListNearbyGymsProps {
    userLatitude: number
    userLongitude: number
}

interface ListNearbyGymsReturn {
    gyms: Gym[]
}

export class ListNearbyGymsService {
    constructor(private gymsRepository: GymsRepository) {

    }

    async execute({ userLatitude, userLongitude }: ListNearbyGymsProps): Promise<ListNearbyGymsReturn> {
        const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude })

        return {
            gyms
        }
    }

}

