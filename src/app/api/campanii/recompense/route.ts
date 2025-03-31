import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CreateCampaignRes } from "@/types/serverResponse";

type DbBusiness = {
  id: string;
  campaigns: { id: string; campaigns_rewards: {id: string}[] }[];
};

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { rewards } = (await req.json()) as {
    rewards: string[];
  };

  rewards = rewards.map((r) => r.trim()).filter(Boolean);

  if (!rewards.length) {
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
    .select("*, campaigns(*, campaigns_rewards(*))")
    .eq("user_id", user.id)
    .gte("campaigns.end_at", check.toISOString());

  if (res.error) {
    console.error("Error Business ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;

  const campaign = business.campaigns[0];

  if (!campaign) {
    return NextResponse.json({ error: "Lipseste campanie" }, { status: 400 });
  }

  res = await supabase.rpc("update_campaign_rewards", {
    campaign_id: campaign.id,
    reward: JSON.stringify(rewards),
    current_reward_id: campaign.campaigns_rewards[0].id,
  });

  if (res.error) {
    console.error("Error Campaign rewards update ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const r: CreateCampaignRes = { success: true };
  return NextResponse.json(r);
}
