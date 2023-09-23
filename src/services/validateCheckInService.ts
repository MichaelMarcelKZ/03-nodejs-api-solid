import { CheckInsRepository } from '@/repositories/checkInsRepository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/lateCheckInValidationError'

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

        const validateDate = new Date()

        const distanceInMinutesFromCheckInCreation = dayjs(validateDate).diff(checkIn.created_at, 'minutes')

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = validateDate

        await this.checkInsRepository.save(checkIn)

        return { checkIn }
    }
}