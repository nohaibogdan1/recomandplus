import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";


type DbBusiness = {
  id: string,
  name: string,
  photo: string,
  facebook: string,
  instagram: string,
  tiktok: string,
  location_map: string,
  location: string,
  phone: string,
  county: string,
  is_online: string
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

  let {
    businessName,
    address,
    googleMaps,
    phone,
    facebook,
    instagram,
    tiktok,
    county,
    isOnline,
  } = await req.json();

  businessName = businessName.trim();
  address = address.trim();
  googleMaps = googleMaps.trim();
  phone = phone.trim();
  facebook = facebook.trim();
  instagram = instagram.trim();
  tiktok = tiktok.trim();
  county = county.trim();

  const dbData = {
    name: businessName,
    location: address,
    location_map: googleMaps,
    phone: phone,
    facebook: facebook,
    instagram: instagram,
    tiktok: tiktok,
    user_id: user.id,
    county: county,
    is_online: isOnline,
  };

  let res = null;
  res = await supabase.from("businesses").select("*").eq("user_id", user.id);
  if (res.error) {
    console.error("Error businesses ", res.error);
    return NextResponse.json({ error: "Server error", statusCode: 500 });
  }

  let business = res.data[0] as DbBusiness;

  res = await supabase
    .from("businesses")
    .upsert(
      {
        ...dbData,
        ...(business.id && { id: business.id }),
      },
      { onConflict: "id" }
    )
    .select();

  if (res.error) {
    console.error("Error business upsert: ", res.error);
    return NextResponse.json({ error: "Server error", statusCode: 500 });
  }

  return NextResponse.json({ success: true });
}
