import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import type { CampaignsOwnerRes } from "@/types/serverResponse";

type DbBusiness = {
  id: string;
  name: string;
};

type DbCampaign = {
  id: string;
  start_at: string;
  end_at: string;
  months: number;
  reward1: string;
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
  res = await supabase.from("businesses").select("id, name").eq("user_id", user.id);

  if (res.error) {
    console.error("Error businesses: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const business = res.data[0] as DbBusiness;
  if (!business) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  res = await supabase
    .from("campaigns")
    .select("*")
    .eq("business_id", business.id)
    .order("end_at", { ascending: false });

  if (res.error) {
    console.error("Error campaigns: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const mapped: CampaignsOwnerRes["current"][] = (res.data as DbCampaign[]).map(
    (c) => ({
      id: c.id,
      startAt: c.start_at,
      endAt: c.end_at,
      months: c.months,
      reward: c.reward1,
      business: business.name,
    })
  );

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  let current;
  let old = mapped;

  if (mapped[0] && check.getTime() <= new Date(mapped[0].endAt + "Z").getTime()) {
    current = mapped[0];
    old = old.slice(1);
  }

  return NextResponse.json({
    current,
    old,
  });
}
