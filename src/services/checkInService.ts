import { CheckInsRepository } from '@/repositories/checkInsRepository'
import { CheckIn } from '@prisma/client'

interface CheckInServiceProps {
    userId: string
    gymId: string
}

interface CheckInServiceResult {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({ userId, gymId }: CheckInServiceProps): Promise<CheckInServiceResult> {
        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return { checkIn }
    }
}