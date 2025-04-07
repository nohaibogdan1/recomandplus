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
  campaigns_rewards: { current: boolean; reward: string }[];
  businesses: {
    name: string;
    county: string;
    is_online: boolean;
    photo: string;
    phone: string;
    location: string;
    location_map: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    website: string;
    youtube: string;
    addresses: {
      location: string;
      maps: string;
      county: string;
      phone: string;
    }[];
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
    .select("*, businesses!inner(*, addresses(*)), campaigns_rewards(*)")
    .eq("businesses.name", decodeURIComponent(slug))
    .eq("campaigns_rewards.current", true);

  if (res.error) {
    console.error("Error campaign: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  data = res.data[0] as DbResponse;

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let reward = [data.campaigns_rewards[0].reward];

  try {
    reward = JSON.parse(data.campaigns_rewards[0].reward);
  } catch {}
console.log("bbbb", data);
  const mapped: CampaignRes = {
    id: data.id,
    createdAt: data.created_at,
    startAt: data.start_at,
    endAt: data.end_at,
    months: data.months,
    businessId: data.business_id,
    reward,
    business: {
      name: data.businesses.name,
      photo: data.businesses.photo,
      isOnline: data.businesses.is_online,
      facebook: data.businesses.facebook,
      instagram: data.businesses.instagram,
      tiktok: data.businesses.tiktok,
      youtube: data.businesses.youtube,
      website: data.businesses.website,
      phone: data.businesses.phone,
      addresses: data.businesses.addresses.map((a) => ({
        county: a.county,
        location: a.location,
        maps: a.maps,
        phone: a.phone,
      })),
    },
  };

  return NextResponse.json(mapped);
}
