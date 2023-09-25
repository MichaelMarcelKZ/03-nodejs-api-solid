import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'

import { env } from './env'
import { ZodError } from 'zod'

import { usersRoutes } from './controllers/users/routes'
import { gymsRoutes } from './controllers/gyms/routes'
import { checkInsRoutes } from './controllers/checkIns/routes'


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: error.format()
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
})