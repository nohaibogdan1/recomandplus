'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const {data, error} = await supabase.auth.signInWithOtp({
    email: formData.get('email') as string,
    options: {
      emailRedirectTo: 'http://localhost:3000/afaceri',
    }})

  console.log('data', data, error)

  if (error) {
    return {data: null, hasError: true};
  }

  revalidatePath('/', 'layout')

  return {data, hasError: false};
}

export async function logout(){
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/afaceri");
}
