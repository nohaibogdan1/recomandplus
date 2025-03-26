import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CampaignRes } from "@/types/serverResponse";

type DbResponse = {
  id: string;
  created_at: string;
  start_at: string;
  end_at: string;
  months: number;
  business_id: string;
  reward1: string;
  reward2: string | null;
  reward3: string | null;
  businesses: {
    name: string;
    county: string;
    is_online: boolean;
    photo: string;
    phone: string;
    location: string;
    location_map: string;
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    website: string | null;
  };
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const supabase = await createClient();
  let data: DbResponse | null = null;

  const res = await supabase
    .from("campaigns")
    .select("*, businesses!inner(*)")
    .eq("businesses.name", decodeURIComponent(slug))
    .single();

  data = res.data as unknown as DbResponse;
  if (res.error) {
    console.error("Error campaign: ", res.error);
  }

  if (!data) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const mapped: CampaignRes = {
    id: data.id,
    createdAt: data.created_at,
    startAt: data.start_at,
    endAt: data.end_at,
    months: data.months,
    businessId: data.business_id,
    reward: data.reward1,
    business: {
      name: data.businesses.name,
      photo: data.businesses.photo,
      county: data.businesses.county,
      isOnline: data.businesses.is_online,
      location: data.businesses.location,
      maps: data.businesses.location_map,
      facebook: data.businesses.facebook,
      instagram: data.businesses.instagram,
      tiktok: data.businesses.tiktok,
      website: data.businesses.website,
      phone: data.businesses.phone,
    },
  };

  return NextResponse.json(mapped);
}
