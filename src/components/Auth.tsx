"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/(platform)/login/actions";
import Problem from "./Problem";

export default function Auth(props: { withBorder?: boolean }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const searchParams = useSearchParams();

    async function handler(formData: FormData) {
        if (loading) { return; }
        setLoading(true);
        const { hasError } = await login({ formData, redirect: searchParams.get("redirect") });
        setLoading(false);
        setSuccess(!hasError);
        setError(hasError);
    }

    return (
        <div className="flex justify-center">
            <form>
                <div className={`flex flex-col mt-7 gap-4  max-w-md px-4 items-center w-full  py-10 rounded-2xl ${props.withBorder && 'shadow-2xl'}`}>
                    {error && <Problem />}
                    {success && <span className="font-bold">Verifica emailul pentru confirmare</span>}
                    <input id="email" name="email" type="email" required placeholder="Adresa ta de e-mail" className=" w-full max-w-sm px-5 py-6 mt-2  border-1 border-gray-200 rounded-md bg-gray-100 active:outline-gray-500 focus:outline-gray-500" />
                    <div className=" w-full max-w-sm flex flex-col gap-5">
                        <button formAction={handler} className="px-5 py-6 bg-regal-orange rounded-md text-white font-bold text-xl cursor-pointer">Conecteaza-te</button>
                        <div className="font-bold text-gray-500 text-xl text-center">SAU</div>
                        <button formAction={handler} className="px-5 py-6 bg-regal-orange rounded-md text-white font-bold text-xl cursor-pointer">Creeaza un cont</button>
                    </div>
                    <div className="text-gray-500 text-sm text-center w-5/6 mt-4">Înregistrându-vă sunteți de acord cu condițiile de utilizare și cu prelucrarea datelor cu caracter personal.</div>
                </div>
            </form>
        </div>
    )
}
