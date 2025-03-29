import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { ValidateRewardRes } from "@/types/serverResponse";

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { validationText } = await req.json();
  validationText = validationText.trim();
  if (!validationText) {
    return NextResponse.json({ valid: false });
  }

  const check = new Date();
  check.setUTCDate(check.getUTCDate());
  check.setUTCHours(0, 0, 0, 0);

  let res;

  res = await supabase.rpc("validate_reward", {
    business_owner_id_p: user.id,
    campaign_end_at_p: check.toISOString(),
    email_advocate_p: validationText,
  });

  if (res.error) {
    console.error("Error Validate reward error: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const data = res.data[0];
  let reward = [data.reward];

  try {
    reward = JSON.parse(data.reward);
  } catch {}

  return NextResponse.json({ valid: data.valid, reward } as ValidateRewardRes);
}
