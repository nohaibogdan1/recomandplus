import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbBusiness = {
  user_id: string;
  campaigns: {
    id: string;
    reward1: string;
  }[];
};

type DbUser = {
  email: string;
  auth_user_id: string;
};

type DbAdvocate = {
  id: string;
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

  const payload = await req.json();
  const businessName = decodeURIComponent(payload.businessName).trim();
  const referral = decodeURIComponent(payload.referral).trim();

  if (!businessName || !referral) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  if (user.email === referral) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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

  if (business.user_id === user.id) {
    return NextResponse.json({ error: "Business owner" }, { status: 409 });
  }

  const campaign = business?.campaigns[0];

  if (!campaign) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  res = await supabase
    .from("advocates")
    .select("*")
    .eq("user_id", user.id)
    .eq("campaign_id", campaign.id);

  if (res.error) {
    console.error("Error Advocate error: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (res.data[0]) {
    return NextResponse.json({ error: "Already advocate" }, { status: 409 });
  }

  res = await supabase.from("users").select("*").eq("email", referral);

  if (res.error) {
    console.error("Error User referral error: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const userReferral = res.data[0] as DbUser;

  let userReferralAdvocate = null;

  if (userReferral) {
    res = await supabase
      .from("advocates")
      .select("*")
      .eq("user_id", userReferral.auth_user_id)
      .eq("campaign_id", campaign.id);

    if (res.error) {
      console.error("Error User referral advocate error: ", res.error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    userReferralAdvocate = res.data[0] as DbAdvocate;
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
    .select();

  if (res.error) {
    console.error("Error Advocate insert: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const advocateInsert = res.data[0] as DbAdvocate;
  if (!advocateInsert) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  res = await supabase
    .from("advocates_rewards")
    .insert({
      advocate_id: advocateInsert.id,
      reward: campaign.reward1,
      first_time: true,
      from_advocate: !!userReferralAdvocate,
    })
    .select();

  if (res.error) {
    console.error("Error Advocate reward insert first-time: ", res.error);
    await supabase.from("advocates").delete().eq("id", advocateInsert.id);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const advocateRewardInsert = res.data[0];

  if (!advocateRewardInsert) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
