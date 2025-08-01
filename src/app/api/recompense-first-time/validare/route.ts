import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbBusiness = {
  user_id: string;
  campaigns: { id: string }[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessName = decodeURIComponent(searchParams.get("business") || "").trim();
  if (!businessName) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ valid: true });
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
    return NextResponse.json({ valid: false });
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

  if (!res.data[0]) {
    return NextResponse.json({ valid: true });
  }

  return NextResponse.json({ valid: false });
}
