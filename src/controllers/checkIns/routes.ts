import { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated'

import { checkInController } from './checkInController'
import { validateCheckInController } from './validateCheckInController'
import { listUserCheckInsHistoryController } from './listUserCheckInsHistoryController'
import { getUserMetricsController } from './getUserMetricsController'

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', ensureAuthenticated)

    app.get('/check-ins/history', listUserCheckInsHistoryController)
    app.get('/check-ins/metrics', getUserMetricsController)

    app.post('/gyms/:gymId/check-in', checkInController)
    app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}