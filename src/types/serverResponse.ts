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

export type BusinessData = {
  name: string;
  photo: string;
  phone: string;
  county: string;
  isOnline: boolean;
  location: string;
  maps: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  website: string;
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
