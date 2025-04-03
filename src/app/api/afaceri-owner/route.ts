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
  youtube: string;
  phone: string;
  is_online: boolean;
  website: string;
  addresses: {
    county: string;
    location: string;
    phone: string;
    maps: string;
  }[];
  campaigns: {
    id: string;
    start_at: string;
    end_at: string;
    months: number;
    campaigns_rewards: {
      id: string;
      reward: string;
      created_at: string;
    }[];
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

  let res = null;

  res = await supabase
    .from("users")
    .select("allowed_business")
    .eq("auth_user_id", user.id)
    .eq("allowed_business", true);

  if (res.error) {
    console.error("Error check allow businesse creation:  ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (!res.data.length) {
    return NextResponse.json({ validBusinessOwner: false } as BusinessOwnerRes);
  }

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  res = await supabase
    .from("businesses")
    .select("*, campaigns(*, campaigns_rewards(*)), addresses(*)")
    .gte("campaigns.end_at", check.toISOString())
    .eq("user_id", user.id);

  if (res.error) {
    console.error("Error businesses: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;

  if (!business) {
    return NextResponse.json({ validBusinessOwner: true } as BusinessOwnerRes);
  }

  const campaign = business.campaigns[0];
  let rewards;
  if (campaign?.campaigns_rewards) {
    rewards = campaign.campaigns_rewards;
    rewards.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    rewards = rewards.map((r) => {
      let options = [r.reward];
      try {
        options = JSON.parse(r.reward);
      } catch {}
      return {
        id: r.id,
        options,
        createdAt: r.created_at,
      };
    });
  }

  const mapped: BusinessOwnerRes = {
    validBusinessOwner: true,
    business: {
      name: business.name,
      photo: business.photo,
      phone: business.phone,
      isOnline: business.is_online,
      facebook: business.facebook,
      youtube: business.youtube,
      instagram: business.instagram,
      tiktok: business.tiktok,
      website: business.website,
      addresses: business.addresses.map((a) => ({
        location: a.location,
        county: a.county,
        phone: a.phone,
        maps: a.maps,
      })),
      ...(business.campaigns[0] && {
        campaign: {
          id: business.campaigns[0].id,
          startAt: business.campaigns[0].start_at,
          endAt: business.campaigns[0].end_at,
          rewards: rewards!,
        },
      }),
    },
  };

  return NextResponse.json(mapped);
}
