import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CampaignsRes, CreateCampaignRes } from "@/types/serverResponse";

type DbResponse = {
  campaign_id: string;
  campaign_created_at: string;
  campaign_start_at: string;
  campaign_end_at: string;
  campaign_months: number;
  campaign_reward1: string;
  business_id: string;
  business_name: string;
  business_county: string;
  business_is_online: boolean;
  business_photo: string;
  campaign_rewards: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("p")) || 1;
  const onlineParam = searchParams.get("online");
  const counties = searchParams
    .get("counties")
    ?.split(",")
    .filter((c) => Boolean(c.trim()));
  const limit = 22;
  const offset = (page - 1) * limit;

  const supabase = await createClient();

  const { data, error: campaignsError } = await supabase.rpc("get_campaigns", {
    counties: counties?.[0] ? counties : null,
    online:
      onlineParam === "true" ? true : onlineParam === "false" ? false : null,
    offsetn: offset,
    limitn: limit,
  });

  if (campaignsError) {
    console.error("Error Campaigns all: ", campaignsError);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const campaigns = (data as DbResponse[]).map((c) => {
    let reward = [c.campaign_rewards];
    try {
      reward = JSON.parse(c.campaign_rewards);
    } catch {}

    return {
      id: c.campaign_id,
      createdAt: c.campaign_created_at,
      startAt: c.campaign_start_at,
      endAt: c.campaign_end_at,
      months: c.campaign_months,
      businessId: c.business_id,
      rewards: reward,
      business: {
        name: c.business_name,
        photo: c.business_photo,
        county: c.business_county,
        isOnline: c.business_is_online,
      },
    };
  });

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

type DbBusiness = {
  id: string;
  campaigns: { id: string }[];
};

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { months, rewards } = (await req.json()) as {
    months: number;
    rewards: string[];
  };

  rewards = rewards.map((r) => r.trim()).filter(Boolean);

  if (!months || !rewards.length) {
    return NextResponse.json(
      { error: "Campuri necompletate" },
      { status: 400 }
    );
  }

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  let res = await supabase
    .from("businesses")
    .select("*, campaigns(*)")
    .eq("user_id", user.id)
    .gte("campaigns.end_at", check.toISOString());

  if (res.error) {
    console.error("Error Business ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;

  const startTimestamp = new Date();
  const endTimestamp = new Date();
  endTimestamp.setUTCDate(endTimestamp.getUTCDate() + 30 * months);
  endTimestamp.setUTCHours(0, 0, 0, 0);

  if (!business) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (business.campaigns[0]) {
    return NextResponse.json(
      { error: "Already running campaign" },
      { status: 409 }
    );
  }

  res = await supabase.rpc("insert_campaign", {
    business_id: business.id,
    start_at: startTimestamp.toISOString(),
    end_at: endTimestamp.toISOString(),
    months,
    reward: JSON.stringify(rewards),
  });

  if (res.error) {
    console.error("Error Business insert ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const r: CreateCampaignRes = { success: true };
  return NextResponse.json(r);
}
