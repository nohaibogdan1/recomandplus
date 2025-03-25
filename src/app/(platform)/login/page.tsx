"use client"
import { useState } from 'react';
import { usePathname, useSearchParams } from "next/navigation";
import { login } from './actions'
import Auth from '@/components/Auth';


export default function LoginPage() {

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const searchParams = useSearchParams();
  console.log("seadddr", searchParams);

  async function handler(formData: FormData) {
    setIsLoading(true);
    setIsRequested(true);
    const { hasError } = await login({ formData, redirect: searchParams.get("redirect") });
    setIsLoading(false);
    setIsSuccess(!hasError);
    console.log("hasError", hasError)
  }

  return (
    <>
      <Auth />
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <button formAction={handler}>Log in</button>
      </form>
      {isRequested && !isLoading && !isSuccess && <div>Eroare</div>}
      {isRequested && !isLoading && isSuccess && <div>Verifica emailul de confimare</div>}
    </>
  )
}