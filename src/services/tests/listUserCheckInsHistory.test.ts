import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'

import { ListUserCheckInsHistoryService } from '../listUserCheckInsHistoryService'
import { CheckIn } from '@prisma/client'

let checkInsRepository: InMemoryCheckInsRepository
let listUserCheckInsHistory: ListUserCheckInsHistoryService

describe('List User Check-In History Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        listUserCheckInsHistory = new ListUserCheckInsHistoryService(checkInsRepository)
    })

    it('shoud be able to list user check-in history', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkIns } = await listUserCheckInsHistory.execute({
            userId: 'user-01',
            page: 1,
        })
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual(expect.any(Array<CheckIn>))
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })
        ])
    })

    it('shoud be able to list user check-in history in pages', async () => {
        for (let index = 1; index <= 22; index++) {
            await checkInsRepository.create({
                gym_id: `gym-${index}`,
                user_id: 'user-01',
            })
        }

        const { checkIns } = await listUserCheckInsHistory.execute({
            userId: 'user-01',
            page: 2,
        })
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual(expect.any(Array<CheckIn>))
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' }),
        ])
    })
})