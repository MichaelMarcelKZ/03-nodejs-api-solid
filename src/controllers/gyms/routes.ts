import { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', ensureAuthenticated)
}