import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log("data", data, error);
  if (error || !data?.user) {
    // redirect('/login')

    return <p>Hello, please sign in</p>;
    
  }



  return <p>Hello {data.user.email}</p>
}