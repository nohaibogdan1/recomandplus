"use client";

import { logout } from "@/app/(platform)/login/actions";
import useUser from "@/hooks/useUser";

export default function HeaderAccount() {

    const {user, reset} = useUser();

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <a href="/profil" className="bg-white font-bold w-auto cursor-pointer">
                Contul tau
            </a>
            {user && <button onClick={() => { logout(); reset(); }}>
                Deconecteaza-te </button>}
            
        </div>
    )
}