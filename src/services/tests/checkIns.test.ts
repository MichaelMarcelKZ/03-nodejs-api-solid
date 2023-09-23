import { expect, it, describe, beforeEach } from 'vitest'

import { CheckInService } from '../checkInService'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'

let checkInService: CheckInService
let checkInsRepository: InMemoryCheckInsRepository

describe('Register Service', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        checkInService = new CheckInService(checkInsRepository)
    })

    it('shoud be able to check in', async () => {
        const { checkIn } = await checkInService.execute({
            gymId: 'gym01',
            userId: 'user01',
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })
})