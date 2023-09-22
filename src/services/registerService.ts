import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/usersRepository'

import { UserAlreadyExitsError } from './errors/userAlreadyExistsError'
import { User } from '@prisma/client'

interface RegisterServiceProps {
    name: string
    email: string
    password: string
}

interface RegisterServiceReturn {
    user: User
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ name, email, password }: RegisterServiceProps): Promise<RegisterServiceReturn> {
        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userEmailAlreadyExists) {
            throw new UserAlreadyExitsError()
        }

        const passwordHash = await hash(password, 6)

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        })

        return {
            user
        }
    }

}

