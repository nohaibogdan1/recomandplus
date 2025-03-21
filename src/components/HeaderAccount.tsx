"use client";

import useUser from "@/hooks/useUser";

export default function HeaderAccount() {
    const [user, isLoading] = useUser();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return (
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <button className="bg-regal-orange hover:bg-regal-orange-2 active:bg-regal-orange-2 text-white font-bold px-6 py-3 rounded-md cursor-pointer">
                    Creeaza un cont
                </button>
                <button className="bg-white font-bold border-b-3 w-auto border-regal-orange cursor-pointer">
                    Conecteaza-te
                </button>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <a href="/profil" className="bg-white font-bold w-auto cursor-pointer">
                    Profil
                </a>
            </div>
        )
    }
}