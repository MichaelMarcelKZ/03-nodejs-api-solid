import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'

import { SearchGymsService } from '../searchGymsService'
import { Gym } from '@prisma/client'

let gymsRepository: InMemoryGymsRepository
let searchGymsService: SearchGymsService

describe('Search Gyms Service', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        searchGymsService = new SearchGymsService(gymsRepository)
    })

    it('shoud be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -26.8091442,
            longitude: -49.2740054
        })

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: '',
            phone: '',
            latitude: -26.8091442,
            longitude: -49.2740054
        })

        const { gyms } = await searchGymsService.execute({
            query: 'javascript',
            page: 1,
        })
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual(expect.any(Array<Gym>))
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym' })
        ])
    })

    it('shoud be able to search paginated gyms', async () => {
        for (let index = 1; index <= 22; index++) {
            await gymsRepository.create({
                title: `JavaScript Gym-${index}`,
                description: '',
                phone: '',
                latitude: -26.8091442,
                longitude: -49.2740054
            })
        }

        const { gyms } = await searchGymsService.execute({
            query: 'javaScript',
            page: 2,
        })
        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual(expect.any(Array<Gym>))
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym-21' }),
            expect.objectContaining({ title: 'JavaScript Gym-22' }),
        ])
    })
})