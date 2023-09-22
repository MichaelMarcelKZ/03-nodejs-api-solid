import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'

import { InvalidCredentialsError } from './errors/invalidCredentialsError'

import { compare } from 'bcryptjs'

interface AuthenticateServiceProps {
    email: string
    password: string
}

interface AuthenticateServiceResult {
    user: User
}

export class AuthenticateService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, password }: AuthenticateServiceProps): Promise<AuthenticateServiceResult> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}