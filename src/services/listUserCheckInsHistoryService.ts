import { CheckInsRepository } from '@/repositories/checkInsRepository'

import { CheckIn } from '@prisma/client'

interface ListUserCheckInsHistoryProps {
    userId: string
    page: number
}

interface ListUserCheckInsHistoryResult {
    checkIns: CheckIn[]
}

export class ListUserCheckInsHistoryService {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId, page }: ListUserCheckInsHistoryProps): Promise<ListUserCheckInsHistoryResult> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return { checkIns }
    }
}