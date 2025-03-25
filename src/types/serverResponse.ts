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

export type CampaignRes = {
    id: string,
    remainingDays: number,
    createdAt: string,
    startAt: string | null,
    endAt: string | null,
    months: number,
    businessId: string,
    rewards: string[],
    business: {
      name: string,
      photo: string,
      phone: string,
      county: string,
      isOnline: boolean,
      location: string,
      maps: string,
      facebook: string | null,
      instagram: string | null,
      tiktok: string | null,
      website: string | null
    },
}