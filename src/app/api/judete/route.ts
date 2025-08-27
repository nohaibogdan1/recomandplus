import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CountiesRes } from "@/types/serverResponse";

type DbCategories = {
  business_county: string;
}[];

export async function GET() {
  const supabase = await createClient();
  const res = await supabase.from("counties_view").select("*");

  if (res.error) {
    console.error("Error counties_view: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  const counties = res.data as DbCategories;
  const mapped: CountiesRes = counties.map((county) => county.business_county);
  return NextResponse.json(mapped);
}
