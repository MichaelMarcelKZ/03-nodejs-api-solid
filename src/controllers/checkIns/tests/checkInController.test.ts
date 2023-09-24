import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { createUserAndAuthenticate } from '@/utils/tests/createAndAuthenticateUser'

describe('Create Check In (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create check in', async () => {
        const { token } = await createUserAndAuthenticate(app)

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

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-in`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -26.8090442,
                longitude: -49.2740054
            })

        expect(response.statusCode).toEqual(201)
    })
})