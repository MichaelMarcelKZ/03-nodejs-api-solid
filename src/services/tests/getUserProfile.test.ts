import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'

import { GetUserProfileService } from '../getUserProfileService'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let usersRepository: InMemoryUsersRepository
let getUserProfileService: GetUserProfileService

describe('Get User Profile Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        getUserProfileService = new GetUserProfileService(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('test@123', 6)
        })

        const { user } = await getUserProfileService.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('John Doe')
    })

    it('should not be able to get user profile if it does not exists', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('test@123', 6)
        })

        await expect(() =>
            getUserProfileService.execute({
                userId: 'anyOtherIDThatDoesNotExists'
            })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})