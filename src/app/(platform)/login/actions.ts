"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login({
  formData,
  redirect,
}: {
  formData: FormData;
  redirect?: string | null;
}) {
  const supabase = await createClient();

  const red = redirect?.slice(2, redirect.length - 1);

  const { data, error } = await supabase.auth.signInWithOtp({
    email: formData.get("email") as string,
    options: {
      emailRedirectTo: red ? `http://localhost:3000/${red}` : "http://localhost:3000/campanii",
    },
  });

  console.log("data", data, error);

  if (error) {
    return { data: null, hasError: true };
  }

  revalidatePath("/", "layout");

  return { data, hasError: false };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/campanii");
}
