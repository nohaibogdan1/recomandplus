"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/(platform)/login/actions";
import Problem from "./Problem";
import Button, { ButtonVariants } from "./common/Button";
import Link from "next/link";

export default function Auth(props: { withBorder?: boolean }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [btn, setBtn] = useState(0);
    const [success, setSuccess] = useState(false);
    const [address, setAddress] = useState("");

    const searchParams = useSearchParams();

    async function handler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) { return; }
        setLoading(true);
        const { hasError } = await login(searchParams.get("redirect"), address);
        setLoading(false);
        setSuccess(!hasError);
        setError(hasError);
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handler}>
                <div className={`flex flex-col mt-7 gap-4  max-w-md px-4 items-center w-full  py-10 rounded-2xl ${props.withBorder && 'shadow-2xl'}`}>
                    {error && <Problem />}
                    {success && <span className="font-bold">Verifica emailul pentru confirmare</span>}
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={address}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                        required
                        placeholder="Adresa ta de e-mail"
                        className=" w-full max-w-sm px-5 py-6 mt-2  border-1 border-gray-200 rounded-md bg-gray-100 active:outline-gray-500 focus:outline-gray-500"
                    />
                    <div className=" w-full max-w-sm flex flex-col gap-5">
                        <Button
                            type="submit"
                            text="Conectează-te"
                            variant={ButtonVariants.PRIMARY}
                            className="text-xl px-5 py-4 w-full"
                            loading={loading && btn === 1}
                            onClick={() => setBtn(1)}
                            iconHeight={25}
                            iconWidth={25} />
                        <div className="font-bold text-gray-500 text-xl text-center">SAU</div>
                        <Button
                            type="submit"
                            variant={ButtonVariants.PRIMARY}
                            className="text-xl px-5 py-4 w-full"
                            loading={loading && btn === 2}
                            onClick={() => setBtn(2)}
                            iconHeight={25}
                            iconWidth={25}
                            text="Creează un cont" />
                    </div>

                    <div className="text-gray-500 text-sm text-center w-5/6 mt-4">
                        <p>Prin apăsarea butonului &quot;Conectează-te&quot; sau a butonului &quot;Creează un cont&quot;, acceptați <Link href={"/termeni-si-conditii"}><b>Termenii și Condițiile</b> </Link> și sunteți de acord ca, în cazul în care nu aveți deja un cont pe platformă, să fiți înregistrat automat folosind datele de autentificare.</p>
                    </div>
                </div>
            </form>
        </div>
    )
}
