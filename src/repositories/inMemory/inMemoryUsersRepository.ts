import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../usersRepository'

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)
        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password: data.password,
            // eslint-disable-next-line camelcase
            created_at: new Date()
        }

        this.items.push(user)

        return user
    }
}