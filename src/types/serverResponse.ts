export type Pagination = {
    hasNextPage: boolean
}

export type CampaignsRes = {
    campaigns: {
        id: string,
        rewards: string[],
        remainingDays: number,
        business: {
            slug: string,
            name: string,
            photo: string,
        }
    }[],
    pagination: Pagination,
}