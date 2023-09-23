import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { ValidateCheckInService } from '../validateCheckInService'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'
import { LateCheckInValidationError } from '../errors/lateCheckInValidationError'

let validateCheckInService: ValidateCheckInService
let checkInsRepository: InMemoryCheckInsRepository

describe('Check-in Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        validateCheckInService = new ValidateCheckInService(checkInsRepository)

        // await gymsRepository.create({
        //     id: 'gym01',
        //     title: 'JS Gym',
        //     description: '',
        //     phone: '',
        //     latitude: -26.8091442,
        //     longitude: -49.2740054
        // })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('shoud be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await validateCheckInService.execute({
            checkInId: createdCheckIn.id,
        })
        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('shoud not be able to validate an inexistent check-in', async () => {
        await expect(() =>
            validateCheckInService.execute({
                checkInId: 'inexistentCheckInId',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('shoud not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21

        vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

        await expect(() =>
            validateCheckInService.execute({
                checkInId: createdCheckIn.id,
            })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)

        expect(checkInsRepository.items[0].validated_at).toEqual(null)
    })
})