import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

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

  if (!advocate) {
    return NextResponse.json({valid: true});
  }

  return NextResponse.json({ valid: false });
}
