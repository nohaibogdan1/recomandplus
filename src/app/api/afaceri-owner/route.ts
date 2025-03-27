import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import type { BusinessOwnerRes } from "@/types/serverResponse";

type DbBusiness = {
  id: string;
  name: string;
  photo: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  location_map: string;
  location: string;
  phone: string;
  county: string;
  is_online: boolean;
  website: string;
  campaigns: {
    id: string;
    start_at: string;
    end_at: string;
    months: number;
    reward1: string;
  }[];
};

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  let res = null;
  res = await supabase
    .from("businesses")
    .select("*, campaigns(*)")
    .gte("campaigns.end_at", check.toISOString())
    .eq("user_id", user.id);

  if (res.error) {
    console.error("Error businesses: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;
  if (!business) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const mapped: BusinessOwnerRes = {
    name: business.name,
    photo: business.photo,
    phone: business.phone,
    county: business.county,
    isOnline: business.is_online,
    location: business.location,
    maps: business.location_map,
    facebook: business.facebook,
    instagram: business.instagram,
    tiktok: business.tiktok,
    website: business.website,
    ...(business.campaigns[0] && {
      campaign: {
        id: business.campaigns[0].id,
        startAt: business.campaigns[0].start_at,
        endAt: business.campaigns[0].end_at,
        reward: business.campaigns[0].reward1,
      },
    }),
  };

  return NextResponse.json(mapped);
}
