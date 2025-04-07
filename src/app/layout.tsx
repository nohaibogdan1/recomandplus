import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderAccount from "@/components/HeaderAccount";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recomand Plus - Profită de reduceri exclusive",
  description: "Recomandă locul tău favorit prietenilor și primește un cadou",
  openGraph: {
    title: "Recomand Plus - Profită de reduceri exclusive",
    description: "Recomandă locul tău favorit prietenilor și primește un cadou",
    images: [`${process.env.NEXT_PUBLIC_API_URL}/preview-main.png`],
    type: "website",
  },
  twitter: {
    title: "Recomand Plus - Profită de reduceri exclusive",
    description: "Recomandă locul tău favorit prietenilor și primește un cadou",
    images: [`${process.env.NEXT_PUBLIC_API_URL}/preview-main.png`],
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div className="z-3 py-2  sticky top-0 bg-white ">
          <div className="flex justify-between px-4 w-full max-w-5xl mx-auto " >
            <Link href="/"><div className="font-extrabold text-2xl text-regal-orange-dark cursor-pointer">RecomandPlus</div></Link>
            <HeaderAccount />
          </div>

        </div>

        <div className="min-h-180">
          {children}
        </div>

        <footer className="w-full py-5 pt-10 pb-17 md:pb-5">
          <div className='text-gray-600 gap-7 flex flex-wrap my-2 pr-4 pl-4 w-full max-w-5xl mx-auto'>

            <div className='w-50 flex flex-col gap-2'>
              <span className="text-md">Harta site</span>
              <Link href="/landing-business" className='text-sm cursor-pointer size-fit'>Am afacere</Link>
              <Link href="/landing-advocate" className='text-sm cursor-pointer size-fit'>Vreau recompense</Link>
              <Link href="/login" className='text-sm cursor-pointer size-fit'>Înregistrare / conectare</Link>
              <Link href="/profil" className='text-sm cursor-pointer size-fit'>Profil</Link>
              <Link href="/" className='text-sm cursor-pointer size-fit'>Explorează</Link>
            </div>

            <div className='w-50 flex flex-col gap-2'>
              <span className="text-md ">RecomandPlus</span>
              <Link href="/intrebari-frecvente" className='text-sm cursor-pointer size-fit'>Cele mai frecvente întrebări</Link>
              <Link href="/termeni-si-conditii" className=' text-sm cursor-pointer size-fit'>Termeni și Condiții</Link>
              <Link href="/politica-confidentialitate" className=' text-sm cursor-pointer size-fit'>Politica de confidențialitate</Link>
              <Link href="/cookies" className='text-sm cursor-pointer size-fit'>Cookies</Link>
              <a href="https://anpc.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className=' text-sm cursor-pointer size-fit'>ANPC</a>
            </div>

            <div className="text-lg font-bold">Cum te putem ajuta? <span className="text-regal-orange underline">client@recomandplus.ro</span></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
