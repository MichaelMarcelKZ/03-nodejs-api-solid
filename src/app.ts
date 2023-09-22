import fastify from 'fastify'

import { register } from './controllers/register'

export const app = fastify()

app.post('/users', register)