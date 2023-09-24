import { FastifyInstance } from 'fastify'
import { registerController } from './registerController'
import { authenticateController } from './authenticateController'
import { getUserProfileController } from './getUserProfileController'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    /** Authenticated */
    app.get('/profile', { onRequest: [ensureAuthenticated] }, getUserProfileController)
}