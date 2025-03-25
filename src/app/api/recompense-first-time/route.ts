import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbRespone = {};

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

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*, campaigns!inner(*)")
    .eq("name", businessName)
    // .lt('campaigns.end_at', new Date().toISOString())
    .single();

  if (businessError) {
    console.error("Error Business: ", businessError);
  }

  const campaign = business.campaigns[0];

  if (!campaign) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const { data: advocate, error: advocateError } = await supabase
    .from("advocates")
    .select("*")
    .eq("user_id", user.id)
    .eq("campaign_id", campaign.id)
    .single();

  if (advocateError) {
    console.error("Error Advocate error: ", advocateError);
  }

  if (advocate) {
    return NextResponse.json({ error: "Already advocate" }, { status: 409 });
  }

  const { data: userReferral, error: userReferralError } = await supabase
    .from("users").select("*").eq("email", referral).single();

  if (userReferralError) {
    console.error("Error User referral error: ", userReferralError);
  }

  let userReferralAdvocate = null;

  if (userReferral) {
    const res = await supabase
    .from("advocates")
    .select("*")
    .eq("user_id", userReferral.auth_user_id)
    .eq("campaign_id", campaign.id).single();

    userReferralAdvocate = res.data;
    if (res.error)  {
      console.error("Error User referral advocate error: ", res.error);
    }
  }

  const { data: advocateInsert, error: advocateInsertError } = await supabase
    .from("advocates")
    .insert({
      user_id: user.id,
      campaign_id: campaign.id,
      ...(userReferral?.email && userReferralAdvocate && { from_advocate_id: userReferralAdvocate.id }),
    })
    .select()
    .single();

  if (advocateInsertError) {
    console.error("advocateInsertError", advocateInsertError);
  }

  if (!advocateInsert) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const { data: advocateRewardInsert, error: advocateRewardInsertError } =
    await supabase
      .from("advocates_rewards")
      .insert({
        advocate_id: advocateInsert.id,
        reward: campaign.reward1,
        first_time: true,
      })
      .select()
      .single();

  if (advocateRewardInsertError) {
    console.error(
      "Error Advocate reward insert first-time: ",
      advocateRewardInsertError
    );
  }

  if (!advocateRewardInsert) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

