import { FastifyInstance } from 'fastify'
import { registerController } from '@/controllers/registerController'
import { authenticateController } from './controllers/authenticateController'
import { getUserProfileController } from './controllers/getUserProfileController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    /** Authenticated */
    app.get('/profile', { onRequest: [ensureAuthenticated] }, getUserProfileController)
}