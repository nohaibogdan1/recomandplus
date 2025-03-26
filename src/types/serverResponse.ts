export type Pagination = {
  hasNextPage: boolean;
};

export type CampaignsRes = {
  campaigns: {
    id: string;
    reward: string;
    endAt: string;
    business: {
      name: string;
      photo: string;
    };
  }[];
  pagination: Pagination;
};

export type CampaignRes = {
  id: string;
  createdAt: string;
  startAt: string;
  endAt: string;
  months: number;
  businessId: string;
  reward: string;
  business: {
    name: string;
    photo: string;
    phone: string;
    county: string;
    isOnline: boolean;
    location: string;
    maps: string;
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    website: string | null;
  };
};

export type CreateCampaignRes = {
  success: boolean;
};

export type CampaignsOwnerRes = {
  current: {
    id: string;
    startAt: string;
    endAt: string;
    months: number;
    reward: string;
    business: string;
  };
  old: {
    id: string;
    startAt: string;
    endAt: string;
    months: number;
    reward: string;
    business: string;
  }[];
};

export type RewardsRes = {
  rewards: string[];
  status: {
    usedRecommandations: string;
    inProgress: number;
    xp: string;
    level: number;
  };
};
