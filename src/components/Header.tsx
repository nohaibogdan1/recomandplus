"use client"

import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="z-3  sticky top-0 bg-white ">
            <nav className="flex py-5 lg:py-7  justify-between px-4 w-full max-w-5xl mx-auto border-b border-gray-200" >
                <Link href="/">
                    <Image
                        className="h-4 w-auto lg:h-5"
                        src={"/big-logo-orange.png"}
                        alt="Next.js logo"
                        width={300}
                        height={300}
                        priority
                    />
                </Link>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <a href="/profil" className="font-medium w-auto cursor-pointer">
                        Contul tău
                    </a>
                </div>
            </nav>
        </header>
    )
}