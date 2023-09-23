import { GymsRepository } from '@/repositories/gymsRepository'

import { Gym } from '@prisma/client'

interface CreateGymProps {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymReturn {
    gym: Gym
}

export class CreateGymService {
    constructor(private gymsRepository: GymsRepository) {

    }

    async execute({ title, description, phone, latitude, longitude }: CreateGymProps): Promise<CreateGymReturn> {
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym
        }
    }

}

