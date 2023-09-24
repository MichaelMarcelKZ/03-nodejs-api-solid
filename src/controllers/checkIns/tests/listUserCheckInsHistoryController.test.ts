import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll, vi, afterEach, beforeEach } from 'vitest'

import { createUserAndAuthenticate } from '@/utils/tests/createAndAuthenticateUser'
import { prisma } from '@/database/prisma'

describe('List User Check-ins History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to list all user check-ins', async () => {
        const { token } = await createUserAndAuthenticate(app)

        const user = await prisma.user.findFirstOrThrow()

        const createGymResponse = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Some description',
                phone: '11423894823',
                latitude: -26.8091442,
                longitude: -49.2740054
            })

        const { gym } = createGymResponse.body

        vi.setSystemTime(new Date(2023, 0, 1, 15, 0))

        await request(app.server)
            .post(`/gyms/${gym.id}/check-in`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -26.8090442,
                longitude: -49.2740054
            })

        vi.setSystemTime(new Date(2023, 0, 2, 15, 0))

        await request(app.server)
            .post(`/gyms/${gym.id}/check-in`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -26.8090342,
                longitude: -49.2740054
            })

        const response = await request(app.server)
            .get('/check-ins/history')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toHaveLength(2)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            })
        ])
    })
})