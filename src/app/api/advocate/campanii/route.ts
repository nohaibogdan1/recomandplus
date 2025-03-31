import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { AdvocateCampaignsRes } from "@/types/serverResponse";

type DbAdvocate = {
  id: string;
  advocates_rewards: {
    campaigns_rewards: {
      id: string;
      reward: string;
      campaign_id: string;
    };
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


  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  const res = await supabase
    .from("advocates")
    .select(
      "*, advocates_rewards(used, campaigns_rewards(*)), campaigns(*, businesses(name))"
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

  const mapped = advocates.map((a) => {
    return {
      campaign: {
        id: a.campaigns.id,
        endAt: a.campaigns.end_at,
        business: a.campaigns.businesses.name,

        reward: a.advocates_rewards.map((ar) => {
          let o = [ar.campaigns_rewards.reward];
          try {
            o = JSON.parse(ar.campaigns_rewards.reward);
          } catch {}
          return {
            id: ar.campaigns_rewards.id,
            options: o,
          };
        }),
      },
    };
  });

  return NextResponse.json(mapped as AdvocateCampaignsRes);
}
