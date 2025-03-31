import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { CampaignAnalyticsRes } from "@/types/serverResponse";

type DbCampaignsAnalytics = {
  id: string;
  created_at: string;
  campaign_id: string;
  sales: number;
  advocates: number;
  rewards: number;
}[];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const supabase = await createClient();

  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let res;

  res = await supabase
    .from("campaigns")
    .select("id, businesses!inner(user_id)")
    .eq("businesses.user_id", user.id)
    .eq("id", id);

  if (res.error) {
    console.error("Error campaigns analytics: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (!res.data.length) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  res = await supabase
    .from("campaigns_analytics")
    .select("*")
    .eq("campaign_id", id)
    .order("created_at", { ascending: false });

  if (res.error) {
    console.error("Error campaigns analytics: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const analytics = res.data as DbCampaignsAnalytics;

  return NextResponse.json(
    analytics.map((a) => ({
      id: a.id,
      createdAt: a.created_at,
      sales: a.sales,
      rewards: a.rewards,
      advocates: a.advocates,
    })) as CampaignAnalyticsRes
  );
}
