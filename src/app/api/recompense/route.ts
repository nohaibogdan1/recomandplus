import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { RewardsRes } from "@/types/serverResponse";

type DbBusiness = {
  user_id: string;
  campaigns: { id: string }[];
};

type DbAdvocate = {
  advocates_rewards: {
    id: string;
    campaigns_rewards: { reward: string };
  }[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessName = decodeURIComponent(
    searchParams.get("business") || ""
  ).trim();
  if (!businessName) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  let res;
  res = await supabase
    .from("businesses")
    .select("*, campaigns(*)")
    .eq("name", businessName)
    .gte("campaigns.end_at", check.toISOString());

  if (res.error) {
    console.error("Error Business: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;

  const campaign = business?.campaigns[0];

  if (!campaign) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  res = await supabase
    .from("advocates")
    .select("advocates_rewards(*, campaigns_rewards(*))")
    .eq("user_id", user.id)
    .eq("campaign_id", campaign.id)
    .eq("advocates_rewards.used", false);

  if (res.error) {
    console.error("Error Advocate error: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const advocate = res.data[0] as DbAdvocate;

  if (!advocate) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const data: RewardsRes = {
    rewards: advocate.advocates_rewards.map((ar) => {
      let r = [ar.campaigns_rewards.reward];
      try {
        r = JSON.parse(ar.campaigns_rewards.reward);
      } catch {}
      return {
        id: ar.id,
        rewards: r,
      };
    }),
  };

  return NextResponse.json(data);
}
