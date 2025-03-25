import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbUser = {
  auth_user_id: string;
};

type DbBusiness = {
  id: string;
  campaigns: {
    id: string;
  }[];
};

type DbLastCampaign = {
  id: string;
  end_at: string;
};

type DbAdvocate = {
  advocate_rewards: { id: string }[];
};

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { validationText } = await req.json();
  let res;
  res = await supabase
    .from("users")
    .select("*")
    .eq("email", validationText)
    .single();

  if (res.error) {
    console.error("Error User advocate error: ", res.error);
  }
  const userAdvocate = res.data as DbUser;

  if (!userAdvocate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  res = await supabase
    .from("businesses")
    .select("*, campaigns!inner(*)")
    .eq("user_id", user.id)
    .lt("campaigns.end_at", new Date().toISOString())
    .single();

  if (res.error) {
    console.error("Error Business: ", res.error);
  }

  const business = res.data as DbBusiness;

  const campaign = business.campaigns[0];

  res = await supabase
    .from("campaigns")
    .select("*")
    .eq("business_id", business.id)
    .order("campaigns.end_at", { ascending: false })
    .single();

  if (res.error) {
    console.error("Error Campaign: ", res.error);
  }

  const lastCampaign = res.data as DbLastCampaign;

  if (!lastCampaign) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!campaign) {
    return NextResponse.json(
      {
        valid: false,
        campaign: {
          endAt: lastCampaign.end_at,
        },
      },
      { status: 200 }
    );
  }

  res = await supabase
    .from("advocates")
    .select("*, advocates_rewards!inner(*)")
    .eq("user_id", userAdvocate.auth_user_id)
    .eq("campaign_id", campaign.id)
    .eq("advocates_rewards.used", false)
    .single();

  if (res.error) {
    console.error("Error advocate: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  const advocate = res.data as DbAdvocate;

  if (!advocate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!advocate.advocate_rewards[0]) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  res = await supabase
    .from("advocates_rewards")
    .update({ used: true })
    .eq("id", advocate.advocate_rewards[0].id);

  if (res.error) {
    console.error("Error advocate reward update: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ valid: true }, { status: 200 });
}
