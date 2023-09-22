import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'

import { AuthenticateService } from '../authenticateService'

import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'

let usersRepository: InMemoryUsersRepository
let authenticateService: AuthenticateService

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        authenticateService = new AuthenticateService(usersRepository)
    })

    it('should be able to authencate an user', async () => {
        const password = 'test@123'
        const hashedPassword = await hash(password, 6)
        const email = 'johndoe@example.com'

        await usersRepository.create({
            name: 'John Doe',
            email,
            password: hashedPassword
        })

        const { user } = await authenticateService.execute({
            email,
            password,
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authencate with wrong email', async () => {
        const password = 'test@123'
        const hashedPassword = await hash(password, 6)
        const email = 'johndoe@example.com'

        await usersRepository.create({
            name: 'John Doe',
            email,
            password: hashedPassword
        })

        await expect(() =>
            authenticateService.execute({
                email: 'johndoe2@example.com',
                password,
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authencate with wrong password', async () => {
        const password = 'test@123'
        const hashedPassword = await hash(password, 6)
        const email = 'johndoe@example.com'

        await usersRepository.create({
            name: 'John Doe',
            email,
            password: hashedPassword
        })

        await expect(() =>
            authenticateService.execute({
                email,
                password: 'test@1234',
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})