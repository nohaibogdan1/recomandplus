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

  let res = await supabase
    .from("businesses")
    .select("*, campaigns!inner(*)")
    .eq("user_id", user.id)
    .lt("campaigns.end_at", new Date().toISOString())
    .single();

  if (res.error) {
    console.error("Error Business ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data as DbBusiness;

  if (!business) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (business.campaigns[0]) {
    return NextResponse.json(
      { error: "Already running campaign" },
      { status: 409 }
    );
  }

  const { months, startAt, reward1, reward2, reward3 } = await req.json();

  const startTimestamp = new Date(startAt);
  const endTimestamp = new Date(startAt);
  endTimestamp.setDate(endTimestamp.getDate() + months * 30);

  res = await supabase
    .from("campaigns")
    .insert({
      start_at: startTimestamp,
      end_at: endTimestamp,
      months,
      business_id: business.id,
      reward1,
      reward2,
      reward3,
    })
    .select("*");

  if (res.error) {
    console.error("Error Business insert ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
