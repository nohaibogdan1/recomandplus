"use client"
import Auth from '@/components/Auth';

export default function LoginPage() {
  return <>
    <Auth />

    <footer className="bg-footer  w-full  h-100 py-5">
      <div className='text-black gap-7 flex flex-wrap my-2 pr-4 pl-4 w-full max-w-5xl mx-auto'>

        <div className='w-50 flex flex-col gap-2'>
          <span className="text-md text-orange-3">RecomandPlus</span>
          <a className='text-orange-4 text-sm cursor-pointer'>Cum functioneaza?</a>
          <a className='text-orange-4 text-sm cursor-pointer'>Cele mai frecvente intrebari</a>
        </div>
        <div className='w-50 flex flex-col gap-2'>
          <span className="text-md text-orange-3">Informatii</span>
          <a className='text-orange-4 text-sm cursor-pointer'>Termeni de utilizare</a>
          <a className='text-orange-4 text-sm cursor-pointer'>Prelucrarea datelor</a>
          <a className='text-orange-4 text-sm cursor-pointer'>Cookies</a>
          <a className='text-orange-4 text-sm cursor-pointer'>ANPC</a>
        </div>

        <div className='w-50 flex flex-col gap-2'>
          <span className="text-md text-orange-3">Am nevoie de ajutor</span>
          <a className='text-orange-4 text-sm cursor-pointer'>Imi lipseste o recompensa</a>
          <a className='text-orange-4 text-sm cursor-pointer'>Contact</a>
        </div>
      </div>

    </footer>
  </>
}