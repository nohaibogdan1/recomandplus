import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbBusiness = {
  campaigns: {
    id: string;
    reward1: string;
    reward2: string;
    reward3: string;
  }[];
};

type DbUser = {
  email: string;
  auth_user_id: string;
};

type DbAdvocate = {
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

  const payload = await req.json();
  const businessName = decodeURIComponent(payload.businessName);
  const referral = decodeURIComponent(payload.referral);

  if (user.email === referral) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  let res;
  res = await supabase
    .from("businesses")
    .select("*, campaigns!inner(*)")
    .eq("name", businessName)
    // .lt('campaigns.end_at', new Date().toISOString())
    .single();

  if (res.error) {
    console.error("Error Business: ", res.error);
  }

  const business = res.data as DbBusiness;

  const campaign = business.campaigns[0];

  if (!campaign) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  res = await supabase
    .from("advocates")
    .select("*")
    .eq("user_id", user.id)
    .eq("campaign_id", campaign.id)
    .single();

  if (res.error) {
    console.error("Error Advocate error: ", res.error);
  }

  if (res.data) {
    return NextResponse.json({ error: "Already advocate" }, { status: 409 });
  }

  res = await supabase.from("users").select("*").eq("email", referral).single();

  if (res.error) {
    console.error("Error User referral error: ", res.error);
  }

  const userReferral = res.data as DbUser;

  let userReferralAdvocate = null;

  if (userReferral) {
    res = await supabase
      .from("advocates")
      .select("*")
      .eq("user_id", userReferral.auth_user_id)
      .eq("campaign_id", campaign.id)
      .single();

    userReferralAdvocate = res.data as DbAdvocate;
    if (res.error) {
      console.error("Error User referral advocate error: ", res.error);
    }
  }

  res = await supabase
    .from("advocates")
    .insert({
      user_id: user.id,
      campaign_id: campaign.id,
      ...(userReferralAdvocate && {
        from_advocate_id: userReferralAdvocate.id,
      }),
    })
    .select()
    .single();

  if (res.error) {
    console.error("advocateInsertError", res.error);
  }
  const advocateInsert = res.data as DbAdvocate;
  if (!advocateInsert) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  res = await supabase
    .from("advocates_rewards")
    .insert({
      advocate_id: advocateInsert.id,
      reward: [campaign.reward1, campaign.reward2, campaign.reward3].filter(Boolean).join(" sau "),
      first_time: true,
    })
    .select()
    .single();

  if (res.error) {
    console.error(
      "Error Advocate reward insert first-time: ",
      res.error
    );
  }

  const advocateRewardInsert = res.data;

  if (!advocateRewardInsert) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
