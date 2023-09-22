import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/usersRepository'

import { UserAlreadyExitsError } from './errors/userAlreadyExistsError'

interface RegisterServiceProps {
    name: string
    email: string
    password: string
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ name, email, password }: RegisterServiceProps) {
        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userEmailAlreadyExists) {
            throw new UserAlreadyExitsError()
        }

        const passwordHash = await hash(password, 6)

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        })
    }

}

