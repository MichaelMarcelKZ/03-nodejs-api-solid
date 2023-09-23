import { CheckInsRepository } from '@/repositories/checkInsRepository'

import { CheckIn } from '@prisma/client'

interface ListUserCheckInsHistoryProps {
    userId: string
}

interface ListUserCheckInsHistoryResult {
    checkIns: CheckIn[]
}

export class ListUserCheckInsHistory {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId }: ListUserCheckInsHistoryProps): Promise<ListUserCheckInsHistoryResult> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId)

        return { checkIns }
    }
}