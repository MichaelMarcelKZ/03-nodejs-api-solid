import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface GetUserProfileServiceProps {
    userId: string
}

interface GetUserProfileServiceResult {
    user: User
}

export class GetUserProfileService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ userId }: GetUserProfileServiceProps): Promise<GetUserProfileServiceResult> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}