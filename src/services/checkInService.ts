import { CheckInsRepository } from '@/repositories/checkInsRepository'
import { GymsRepository } from '@/repositories/gymsRepository'

import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'

interface CheckInServiceProps {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInServiceResult {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository) { }

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInServiceProps): Promise<CheckInServiceResult> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        // calculate distance between user and gym
        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error('Distance can not be more than 100 meters')
        }


        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new Error('Cannot check in twice on same day')
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return { checkIn }
    }
}