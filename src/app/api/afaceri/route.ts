import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

interface BusinessData {
  id: string | null;
  businessName: string;
  photo: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  googleMaps: string;
  address: string;
  phone: string;
  county?: string;
  isOnline: boolean;
}

// GET: Obține datele despre business
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", user!.id)
    .limit(1)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(mapped);
}

// POST: Creează sau modifică datele despre business
export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const businessData = await req.json();

  const dbData = {
    ...(businessData.id && {id: businessData.id}),
    name: businessData.businessName,
    location: businessData.address,
    location_map: businessData.googleMaps,
    phone: businessData.phone,
    facebook: businessData.facebook,
    instagram: businessData.instagram,
    tiktok: businessData.tiktok,
    user_id: user?.id,
    county: businessData.county,
    is_online: businessData.isOnline,
  };

  businessData.user_id = user?.id;

  const { data, error } = await supabase
    .from("businesses")
    .upsert(dbData, { onConflict: "id" })
    .select()
    .single();

  console.log("error", error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
