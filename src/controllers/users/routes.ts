import { FastifyInstance } from 'fastify'

import { registerController } from './registerController'
import { authenticateController } from './authenticateController'
import { getUserProfileController } from './getUserProfileController'
import { refreshTokenController } from './refreshTokenController'

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    app.patch('/token/refresh', refreshTokenController)

    /** Authenticated */
    app.get('/profile', { onRequest: [ensureAuthenticated] }, getUserProfileController)
}