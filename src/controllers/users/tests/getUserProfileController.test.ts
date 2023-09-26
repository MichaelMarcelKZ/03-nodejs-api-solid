import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { createUserAndAuthenticate } from '@/utils/tests/createAndAuthenticateUser'

describe('Get User Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        const { token } = await createUserAndAuthenticate(app, false)

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
                role: 'MEMBER'
            }
        })
    })
})