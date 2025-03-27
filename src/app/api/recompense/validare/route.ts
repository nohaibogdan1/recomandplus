import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbUser = {
  auth_user_id: string;
};

type DbBusiness = {
  id: string;
  campaigns: {
    id: string;
    reward1: string;
  }[];
};

type DbLastCampaign = {
  id: string;
  end_at: string;
};

type DbAdvocate = {
  id: string;
  recommendations_used: number;
  recommendations_in_progress: number;
  xp: number;
  level: number;
  from_advocate_id: string | null;
  advocates_rewards: {
    id: string;
    reward: string;
    used: boolean;
    from_advocate: boolean;
  }[];
};

type DbOriginAdvocate = {
  id: string;
};

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { validationText } = await req.json();
  validationText = validationText.trim();
  if (!validationText) {
    return NextResponse.json({ valid: false });
  }

  let res;
  res = await supabase.from("users").select("*").eq("email", validationText);

  if (res.error) {
    console.error("Error User advocate error: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  const userAdvocate = res.data[0] as DbUser;

  if (!userAdvocate) {
    return NextResponse.json({ valid: false });
  }

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  res = await supabase
    .from("businesses")
    .select("*, campaigns(*)")
    .eq("user_id", user.id)
    .gte("campaigns.end_at", check.toISOString());

  if (res.error) {
    console.error("Error Business: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;

  const campaign = business.campaigns[0];

  if (!campaign) {
    return NextResponse.json({
      valid: false,
    });
  }

  res = await supabase
    .from("advocates")
    .select("*, advocates_rewards(*)")
    .eq("user_id", userAdvocate.auth_user_id)
    .eq("campaign_id", campaign.id)
    .eq("advocates_rewards.used", false);

  if (res.error) {
    console.error("Error advocate: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  const advocate = res.data[0] as DbAdvocate;

  if (!advocate) {
    return NextResponse.json({ valid: false });
  }

  if (!advocate.advocates_rewards[0]) {
    return NextResponse.json({ valid: false });
  }

  let advocateRewardWithOrigin = advocate.advocates_rewards.find((r) => r.from_advocate);

  res = await supabase
    .from("advocates_rewards")
    .update({ used: true })
    .eq(
      "id",
      advocateRewardWithOrigin ? advocateRewardWithOrigin.id : advocate.advocates_rewards[0].id
    );

  if (res.error) {
    console.error("Error advocate reward update: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (advocateRewardWithOrigin) {
    res = await supabase
      .from("advocates")
      .select("id")
      .eq("id", advocate.from_advocate_id);

    if (res.error) {
      console.error("Error advocate origin: ", res.error);
    }
    if (res.data?.[0]) {
      const originAdvocate = res.data?.[0] as DbOriginAdvocate;

      res = await supabase.from("advocates_rewards").insert({
        advocate_id: originAdvocate.id,
        reward: campaign.reward1,
      });
      if (res.error) {
        console.error("Error advocate origin reward: ", res.error);
      }
    }
  }

  return NextResponse.json({ valid: true }, { status: 200 });
}
