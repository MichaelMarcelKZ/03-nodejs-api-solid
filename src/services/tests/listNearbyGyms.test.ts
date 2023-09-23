import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { ListNearbyGymsService } from '../listNearbyGymsService'

import { Gym } from '@prisma/client'

let gymsRepository: InMemoryGymsRepository
let listNearbyGymsService: ListNearbyGymsService

describe('List Nearby Gyms Service', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        listNearbyGymsService = new ListNearbyGymsService(gymsRepository)
    })

    it('shoud be able to list nearby gyms', async () => {

        // Less than 10km
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -26.8091442,
            longitude: -49.2740054
        })

        // Less than 10km
        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: '',
            phone: '',
            latitude: -26.8251665,
            longitude: -49.2818106
        })

        // More than 10km
        await gymsRepository.create({
            title: 'NodeJS Gym',
            description: '',
            phone: '',
            latitude: -26.8983549,
            longitude: -49.1232994
        })

        const { gyms } = await listNearbyGymsService.execute({
            userLatitude: -26.8109062,
            userLongitude: -49.2682977
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual(expect.any(Array<Gym>))
    })
})