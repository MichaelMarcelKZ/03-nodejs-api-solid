import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { createUserAndAuthenticate } from '@/utils/tests/createAndAuthenticateUser'

describe('List Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {
        const { token } = await createUserAndAuthenticate(app)

        // Less than 10km
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: '',
                phone: '',
                latitude: -26.8091442,
                longitude: -49.2740054
            })

        // Less than 10km
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: '',
                phone: '',
                latitude: -26.8251665,
                longitude: -49.2818106
            })

        // More than 10km
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'NodeJS Gym',
                description: '',
                phone: '',
                latitude: -26.8983549,
                longitude: -49.1232994
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -26.8109062,
                longitude: -49.2682977,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(2)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            }),
            expect.objectContaining({
                title: 'TypeScript Gym'
            }),
        ])
    })
})