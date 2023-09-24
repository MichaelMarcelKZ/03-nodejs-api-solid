import { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated'

import { createGymController } from './createGymController'
import { searchGymsController } from './searchGymsServiceController'
import { listNearbyGymsController } from './listNearbyGymsController'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', ensureAuthenticated)

    app.post('/gyms', createGymController)

    app.get('/gyms/search', searchGymsController)
    app.get('/gyms/nearby', listNearbyGymsController)
}