import { CheckInsRepository } from '@/repositories/checkInsRepository'

interface GetUserMetricsProps {
    userId: string
}

interface GetUserMetricsResult {
    checkInsCount: number
}

export class GetUserMetricsService {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId }: GetUserMetricsProps): Promise<GetUserMetricsResult> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return { checkInsCount }
    }
}