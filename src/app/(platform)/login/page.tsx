"use client"
import Auth from '@/components/Auth';
import { Suspense } from 'react';

export default function LoginPage() {
  return <>
    <Suspense>
      <Auth />
    </Suspense>
  </>
}