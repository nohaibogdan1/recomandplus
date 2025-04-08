"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeaderLanding() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`z-3 py-2  sticky top-0 transition-all duration-300 ease-in-out transform ${scrolled ? "bg-header-white text-black" : "bg-transparent text-white"}`}>
            <nav className="flex justify-between px-4 w-full max-w-5xl mx-auto " >
                <Link href="/">
                    {scrolled ?
                        <Image
                            className="h-4 w-auto lg:h-5"
                            src={"/big-logo-dark.svg"}
                            alt="Next.js logo"
                            width={300}
                            height={300}
                            priority
                        />
                        :
                        <Image
                            className="h-4 w-auto lg:h-5"
                            src={"/big-logo-white.svg"}
                            alt="Next.js logo"
                            width={300}
                            height={300}
                            priority
                        />
                    }
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