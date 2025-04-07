"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(
  redirect: string | null,
  address: string
) {
  const supabase = await createClient();

  const red = redirect?.slice(2, redirect.length - 1);

  const { data, error } = await supabase.auth.signInWithOtp({
    email: address,
    options: {
      emailRedirectTo: red ? `${process.env.NEXT_PUBLIC_API_URL}/${red}` : `${process.env.NEXT_PUBLIC_API_URL}/`,
    },
  });

  if (error) {
    return { data: "login", hasError: true };
  }

  revalidatePath("/", "layout");

  return { data, hasError: false };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
