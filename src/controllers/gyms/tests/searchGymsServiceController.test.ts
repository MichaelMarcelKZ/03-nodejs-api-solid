import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { createUserAndAuthenticate } from '@/utils/tests/createAndAuthenticateUser'

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search gyms by title ', async () => {
        const { token } = await createUserAndAuthenticate(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Some description',
                phone: '11423894823',
                latitude: -26.8091442,
                longitude: -49.2740054
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'Some description',
                phone: '11423894823',
                latitude: -26.8091442,
                longitude: -49.2740054
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q: 'type'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'TypeScript Gym'
            })
        ])
    })
})