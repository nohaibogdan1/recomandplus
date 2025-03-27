import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { AdvocateCampaignsRes } from "@/types/serverResponse";

type DbAdvocate = {
  id: string;
  advocates_rewards: {
    reward: string;
    used: boolean;
  }[];
  campaigns: {
    id: string;
    end_at: string;
    businesses: {
      name: string;
    };
  };
};

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let res;

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  res = await supabase
    .from("advocates")
    .select(
      "*, advocates_rewards(reward, used), campaigns(*, businesses(name))"
    )
    .eq("user_id", user.id)
    .gte("campaigns.end_at", check.toISOString())
    .eq("advocates_rewards.used", false);

  if (res.error) {
    console.error("Error advocates: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const advocates = res.data as DbAdvocate[];
  if (!advocates) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const mapped = advocates.map((a) => ({
    campaign: {
      id: a.campaigns.id,
      endAt: a.campaigns.end_at,
      business: a.campaigns.businesses.name,
    },
    rewards: a.advocates_rewards.map((r) => ({
      used: r.used,
      reward: r.reward,
    })),
  }));

  return NextResponse.json(mapped as AdvocateCampaignsRes);
}
