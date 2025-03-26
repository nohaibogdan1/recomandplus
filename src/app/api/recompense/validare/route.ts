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
  }[];
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
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  let res;
  res = await supabase.from("users").select("*").eq("email", validationText);

  if (res.error) {
    console.error("Error User advocate error: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  const userAdvocate = res.data[0] as DbUser;

  console.log("useAdvo", userAdvocate)


  if (!userAdvocate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  console.log("useAdvo", userAdvocate)

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
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!advocate.advocates_rewards[0]) {
    return NextResponse.json({ valid: false });
  }

  res = await supabase
    .from("advocates_rewards")
    .update({ used: true })
    .eq("id", advocate.advocates_rewards[0].id);

  if (res.error) {
    console.error("Error advocate reward update: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (advocate.from_advocate_id) {
    res = await supabase
      .from("advocates")
      .select("*, advocates_rewards(*)")
      .eq("id", advocate.from_advocate_id);

    if (res.error) {
      console.error("Error advocate origin: ", res.error);
    }
    if (res.data?.[0]) {
      const originAdvocate = res.data?.[0] as DbAdvocate;

      // originAdvocate.level;
      // originAdvocate.recommendations_in_progress
      // originAdvocate.recommendations_used;
      // originAdvocate.xp
      if (originAdvocate) {
        const recommendationsInProgressUpdated =
          originAdvocate.recommendations_in_progress > 0
            ? originAdvocate.recommendations_in_progress - 1
            : 0;
        let recommendationsUsedUpdated =
          originAdvocate.recommendations_used + 1;

        let hasNewReward = false;

        let levelUpdated = originAdvocate.level;

        if (originAdvocate.level === 1) {
          if (originAdvocate.advocates_rewards.length === 2) {
            levelUpdated = 2;
          }
          hasNewReward = true;
          recommendationsUsedUpdated = 0;
        } else if (recommendationsUsedUpdated === 3) {
          recommendationsUsedUpdated = 0;
          hasNewReward = true;
        }

        if (hasNewReward) {
          await supabase.from("advocates_rewards").insert({
            advocate_id: originAdvocate.id,
            reward: campaign.reward1,
          });
        }

        await supabase
          .from("advocates")
          .update({
            level: levelUpdated,
            recommendations_in_progress: recommendationsInProgressUpdated,
            recommendations_used: recommendationsUsedUpdated,
          })
          .eq("id", originAdvocate.id);
      }
    }
  }

  return NextResponse.json({ valid: true }, { status: 200 });
}
