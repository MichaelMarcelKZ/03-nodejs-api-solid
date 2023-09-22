import { expect, it, describe } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterService } from '../registerService'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { UserAlreadyExitsError } from '../errors/userAlreadyExistsError'

describe('Register Service', () => {

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const password = 'test@123'

        const { user } = await registerService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password,
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const password = 'test@123'

        const { user } = await registerService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password,
        })

        const isPasswordCorrectlyHashed = await compare(password, user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const password = 'test@123'
        const email = 'johndoe@example.com'

        await registerService.execute({
            name: 'John Doe',
            email,
            password,
        })

        await expect(() =>
            registerService.execute({
                name: 'John Doe 2',
                email,
                password,
            })
        ).rejects.toBeInstanceOf(UserAlreadyExitsError)
    })

})