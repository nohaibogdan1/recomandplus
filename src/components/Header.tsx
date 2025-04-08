"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Header() {

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
                <Link href="/"><div className="font-extrabold text-2xl cursor-pointer">RecomandPlus</div></Link>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <a href="/profil" className="font-bold w-auto cursor-pointer">
                        Contul tău
                    </a>
                </div>
            </nav>
        </header>
    )
}