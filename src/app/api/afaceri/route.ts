import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { BusinessData } from "@/types/serverResponse";

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
  is_online: string;
  user_id: string;
};

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", user.id);

  if (res.error) {
    console.error("Error business: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const data = res.data[0] as DbBusiness;

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const mapped = {
    id: data.id,
    businessName: data.name,
    photo: data.photo,
    facebook: data.facebook,
    instagram: data.instagram,
    tiktok: data.tiktok,
    googleMaps: data.location_map,
    address: data.location,
    phone: data.phone,
    county: data.county,
    isOnline: data.is_online,
  };

  return NextResponse.json(mapped);
}

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await req.json()) as BusinessData;

  let {
    name,
    phone,
    facebook,
    instagram,
    tiktok,
    youtube,
    website,
    addresses,
  } = payload;

  const { isOnline } = payload;

  name = name.trim();
  phone = phone.trim();
  facebook = facebook.trim();
  instagram = instagram.trim();
  website = website.trim();
  tiktok = tiktok.trim();
  youtube = youtube.trim();

  if (!name || !phone) {
    return NextResponse.json({ error: "Parameters missing" }, { status: 400 });
  }

  let res = null;
  res = await supabase.from("businesses").select("*").eq("user_id", user.id);
  if (res.error) {
    console.error("Error businesses ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;

  addresses = addresses
    .map((a) => ({
      phone: a.phone.trim(),
      location: a.location.trim(),
      maps: a.maps.trim(),
      county: a.county.trim(),
    }))
    .filter((a) => a.phone && a.location && a.county);

  res = await supabase.rpc("insert_update_business", {
    business_p: {
      name,
      phone,
      facebook,
      youtube,
      website,
      tiktok,
      instagram,
      is_online: isOnline,
      user_id: user.id,
      id: business?.id
    },
    addresses_p: addresses
  });

  if (res.error) {
    console.error("Error business upsert: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
