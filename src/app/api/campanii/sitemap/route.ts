import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CampaignsSitemapRes } from "@/types/serverResponse";

type DbCampaigns = {
  businesses: {
    name: string;
  };
}[];

export async function GET() {
  const supabase = await createClient();

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  const res = await supabase
    .from("campaigns")
    .select("end_at, businesses!inner(name)")
    .gte("end_at", check.toISOString());

  if (res.error) {
    console.error("Error campaigns sitemap: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const data = res.data as unknown as DbCampaigns;

  return NextResponse.json(
    data.map((c) => ({
      businessName: c.businesses.name,
    })) as CampaignsSitemapRes
  );
}
