import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CampaignsRes } from "@/types/serverResponse";

type DbResponse = {
  campaign_id: string;
  campaign_created_at: string;
  campaign_start_at: string;
  campaign_end_at: string;
  campaign_months: number;
  campaign_reward1: string;
  campaign_reward2: string;
  campaign_reward3: string;
  business_id: string;
  business_name: string;
  business_county: string;
  business_is_online: boolean;
  business_photo: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("p")) || 1;
  const onlineParam = searchParams.get("online");
  const counties = searchParams.get("counties")?.split(",");
  const limit = 22;
  const offset = (page - 1) * limit;

  console.log("HEHHEOI", counties, onlineParam, page);

  const supabase = await createClient();

  let data, campaignsError;
  if (onlineParam === "true") {
    const r = await supabase.rpc("get_filtered_campaigns_o", {
      counties: counties?.[0] ? counties : [],
      online: true,
      offsetn: offset,
      limitn: limit,
    });
    data = r.data;
    campaignsError = r.error;
  } else {
    const r = await supabase.rpc("get_filtered_campaigns", {
      counties: counties?.[0] ? counties : [],
      offsetn: offset,
      limitn: limit,
    });
    data = r.data;
    campaignsError = r.error;
  }

  console.log("data", data.length, data[0]);
  console.error("campaignsError", campaignsError);

  if (!data) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const campaigns = (data as DbResponse[]).map((c) => ({
    id: c.campaign_id,
    remainingDays: 100,
    createdAt: c.campaign_created_at,
    startAt: c.campaign_start_at,
    endAt: c.campaign_end_at,
    months: c.campaign_months,
    businessId: c.business_id,
    rewards: [c.campaign_reward1, c.campaign_reward2, c.campaign_reward3],
    business: {
      name: c.business_name,
      photo: c.business_photo,
      county: c.business_county,
      isOnline: c.business_is_online,
      slug: "sluggg",
    },
  }));

  const hasNextPage = data.length > 21;

  if (hasNextPage) {
    campaigns.pop();
  }

  const mapped: CampaignsRes = {
    campaigns,
    pagination: {
      hasNextPage,
    },
  };

  return NextResponse.json(mapped);
}
