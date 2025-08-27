import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CampaignsSearchRes } from "@/types/serverResponse";

type CampaignsSearchDb = {
  business_name: string;
}[];

export async function GET(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (q.length < 1) {
    NextResponse.json([]);
  }

  const { data, error: campaignsError } = await supabase.rpc(
    "search_campaigns",
    {
      query: q,
    }
  );

  if (campaignsError) {
    console.error("Error Campaigns all: ", campaignsError);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const mapped: CampaignsSearchRes = (data as CampaignsSearchDb).map(
    (campaign) => campaign.business_name
  );
  return NextResponse.json(mapped);
}
