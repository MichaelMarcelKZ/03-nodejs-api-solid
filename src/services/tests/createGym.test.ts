import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { CreateGymService } from '../createGymService'

let gymsRepository: InMemoryGymsRepository
let createGymService: CreateGymService

describe('Create Gym Service', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        createGymService = new CreateGymService(gymsRepository)
    })

    it('should be able to register', async () => {
        const { gym } = await createGymService.execute({
            title: 'JS Gym',
            description: '',
            phone: '',
            latitude: -26.8091442,
            longitude: -49.2740054
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})