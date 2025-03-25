import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbBusiness = {
  campaigns: { id: string }[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessName = decodeURIComponent(searchParams.get("business") || "");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ valid: true });
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

  if (!res.data) {
    return NextResponse.json({ valid: true });
  }

  return NextResponse.json({ valid: false });
}
