export type Pagination = {
  hasNextPage: boolean;
};

export type CampaignsRes = {
  campaigns: {
    id: string;
    rewards: string[];
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
  reward: string[];
  business: {
    name: string;
    photo: string;
    phone: string;
    isOnline: boolean;
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    website: string;
    addresses: Address[],
  };
};

export type CreateCampaignRes = {
  success: boolean;
};

type Address = {
  phone: string,
  county: string,
  location: string,
  maps: string
}

export type BusinessData = {
  name: string;
  photo: string;
  phone: string;
  isOnline: boolean;
  facebook: string;
  instagram: string;
  tiktok: string;
  website: string;
  youtube: string;
  addresses: Address[];
};

export type BusinessOwnerRes = BusinessData & {
  campaign?: {
    id: string;
    startAt: string;
    endAt: string;
    rewards: {
      id: string;
      options: string[];
      createdAt: string;
    }[];
  };
};

export type RewardsRes = {
  rewards: { id: string; rewards: string[] }[];
};

export type AdvocateCampaignsRes = {
  campaign: {
    id: string;
    endAt: string;
    business: string;
    reward: { id: string; options: string[] }[];
  };
}[];

export type ValidateRewardRes = { valid: boolean; reward: string[] };

export type CampaignAnalyticsRes = {
  id: string;
  createdAt: string;
  sales: number;
  rewards: number;
  advocates: number;
}[];
