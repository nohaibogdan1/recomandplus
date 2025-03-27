import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

type DbAdvocate = {
  id: string;
  campaigns: {
    id: string;
    end_at: string;
    businesses: {
      name: string;
    };
  };
};

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let res;

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  res = await supabase
    .from("advocates")
    .select("*, campaigns(*, businesses(name))")
    .eq("user_id", user.id)
    .gte("campaigns.end_at", check.toISOString());

  if (res.error) {
    console.error("Error advocates: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const data = res.data as DbAdvocate[];
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const mapped = data.map((a) => ({
    campaign: {
      id: a.campaigns.id,
      endAt: a.campaigns.end_at,
      business: a.campaigns.businesses.name,
    },
  }));

  return NextResponse.json(mapped);
}
