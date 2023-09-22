import { FastifyInstance } from 'fastify'
import { registerController } from '@/controllers/registerController'
import { authenticateController } from './controllers/authenticateController'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)
}