import { GymsRepository } from '@/repositories/gymsRepository'

import { Gym } from '@prisma/client'

interface SearchGymsProps {
    query: string
    page: number
}

interface SearchGymsReturn {
    gyms: Gym[]
}

export class SearchGymsService {
    constructor(private gymsRepository: GymsRepository) {

    }

    async execute({ query, page }: SearchGymsProps): Promise<SearchGymsReturn> {
        const gyms = await this.gymsRepository.findManyByTitle(query, page)

        return {
            gyms
        }
    }

}

