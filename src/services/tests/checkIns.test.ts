import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'

import { CheckInService } from '../checkInService'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'

import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '../errors/maxNumberOfCheckInsError'
import { MaxDistanceError } from '../errors/maxDistanceError'

let checkInService: CheckInService
let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository

describe('Check-in Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        checkInService = new CheckInService(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym01',
            title: 'JS Gym',
            description: '',
            phone: '',
            latitude: -26.8091442,
            longitude: -49.2740054
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('shoud be able to check in', async () => {


        const { checkIn } = await checkInService.execute({
            gymId: 'gym01',
            userId: 'user01',
            userLatitude: -26.8091442,
            userLongitude: -49.2740054,
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('shoud not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2020, 2, 15, 15, 0, 0))

        await checkInService.execute({
            gymId: 'gym01',
            userId: 'user01',
            userLatitude: -26.8091442,
            userLongitude: -49.2740054,
        })

        await expect(
            checkInService.execute({
                gymId: 'gym01',
                userId: 'user01',
                userLatitude: -26.8091442,
                userLongitude: -49.2740054,
            })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('shoud be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2020, 2, 15, 15, 0, 0))

        await checkInService.execute({
            gymId: 'gym01',
            userId: 'user01',
            userLatitude: -26.8091442,
            userLongitude: -49.2740054,
        })

        vi.setSystemTime(new Date(2020, 2, 16, 15, 0, 0))

        const { checkIn } = await checkInService.execute({
            gymId: 'gym01',
            userId: 'user01',
            userLatitude: -26.8091442,
            userLongitude: -49.2740054,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('shoud not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym02',
            title: 'JS Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-26.8078037),
            longitude: new Decimal(-49.2504449)
        })

        await expect(() =>
            checkInService.execute({
                gymId: 'gym02',
                userId: 'user01',
                userLatitude: -26.8091442,
                userLongitude: -49.2740054,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError)

    })
})