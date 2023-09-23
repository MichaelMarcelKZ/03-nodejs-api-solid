import { CheckInsRepository } from '@/repositories/checkInsRepository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface ValidateCheckInProps {
    checkInId: string
}

interface ValidateCheckInResult {
    checkIn: CheckIn
}

export class ValidateCheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ checkInId }: ValidateCheckInProps): Promise<ValidateCheckInResult> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return { checkIn }
    }
}