import { GymsRepository } from '@/repositories/gymsRepository'

import { Gym } from '@prisma/client'

interface SearchGymProps {
    query: string
    page: number
}

interface SearchGymReturn {
    gyms: Gym[]
}

export class SearchGymService {
    constructor(private gymsRepository: GymsRepository) {

    }

    async execute({ query, page }: SearchGymProps): Promise<SearchGymReturn> {
        const gyms = await this.gymsRepository.findManyByTitle(query, page)

        return {
            gyms
        }
    }

}

