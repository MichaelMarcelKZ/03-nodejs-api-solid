import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Get User Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com.br',
                password: 'test@123',
            })

        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'johndoe@example.com.br',
                password: 'test@123',
            })

        const { token } = authResponse.body

        const response = await request(app.server)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            user: {
                id: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
                created_at: expect.any(String),
            }
        })
    })
})