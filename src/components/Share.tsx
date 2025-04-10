"use client"

import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function Share(props: { slug: string }) {
    const { user } = useUser();
    const [copied, setCopied] = useState(false);

    if (!user) {
        return null;
    }

    const link = `${process.env.NEXT_PUBLIC_API_URL}/campanii/${props.slug}?referral=${encodeURIComponent(user.email)}`;

    async function handler() {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="flex flex-col gap-3 relative md:max-w-5/6">
            <button onClick={handler} className={`px-5 py-3 bg-regal-orange rounded-md text-white font-medium text-md cursor-pointer`}>Recomandă - trimite linkul prietenilor tăi</button>
            <span className="font-medium text-sm text-gray-500 break-all">{process.env.NEXT_PUBLIC_API_URL}/campanii/{props.slug}?referral={encodeURIComponent(user.email)}</span>
            {copied &&
                <div className="absolute px-10 py-2 bg-black/50 rounded-md bottom-0 right-0">
                    <div className="bg-white p-3 py-1 rounded-md font-medium text-xs">Link copiat !</div>
                </div>
            }
        </div>
    )
}