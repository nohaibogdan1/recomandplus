import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CategoriesRes } from "@/types/serverResponse";

type DbCategories = {
  business_category: string;
}[];

export async function GET() {
  const supabase = await createClient();
  const res = await supabase.from("categories_view").select("*");

  if (res.error) {
    console.error("Error categories_view: ", res.error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  const categories = res.data as DbCategories;
  const mapped: CategoriesRes = categories.map((cat) => cat.business_category);
  return NextResponse.json(mapped);
}
