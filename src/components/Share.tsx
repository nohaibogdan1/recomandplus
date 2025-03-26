"use client"

import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function Share(props: { slug: string }) {
    const { user } = useUser();
    const [copied, setCopied] = useState(false);

    if (!user) {
        return null;
    }

    const link = `http://localhost:3000/campanii/${props.slug}?referral=${encodeURIComponent(user.email)}`;

    async function handler() {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="flex flex-col gap-3 relative md:max-w-5/6">
            <button onClick={handler} className={`mt-5 px-5 py-3 bg-regal-orange rounded-md text-white font-bold text-md cursor-pointer`}>Recomanda - trimite linkul prietenilor tai</button>
            <span className="font-bold text-sm text-gray-500">http://localhost:3000/campanii/{props.slug}?referral={encodeURIComponent(user.email)}</span>
            {copied &&
                <div className="absolute px-10 py-2 bg-black/50 rounded-md bottom-0 right-0">
                    <div className="bg-white p-3 py-1 rounded-md font-bold text-xs">Link copiat !</div>
                </div>
            }
        </div>
    )
}