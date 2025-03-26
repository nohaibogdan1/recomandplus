"use client"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Share from "./Share";

export default function RewardBtn(props: { slug: string }) {
    const { user } = useUser();
    const router = useRouter();
    const [showGetReward, setShowGetReward] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function canTakeReward() {
            const response = await fetch(`/api/recompense-first-time/validare?business=${props.slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (response.ok) {
                if (result.valid) {
                    setShowGetReward(true);
                }
            }
            setLoading(false);
        }

        canTakeReward();
    }, []);


    const pathname = usePathname();
    const searchParams = useSearchParams();
    const referral = searchParams.get("referral");

    async function handler() {
        if (!user) {
            router.push(`/login?redirect=${encodeURIComponent(`"${pathname}?${searchParams.toString()}"`)}`);
        } else {
            const response = await fetch('/api/recompense-first-time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ businessName: props.slug, referral }),
            });

            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    window.scrollTo({ top: 500, behavior: "smooth" });
                    setShowGetReward(false);
                }
            }
        }
    }

    if (loading) {
        return null;
    }

    if (showGetReward) {
        return (
            <button onClick={handler} className={`mt-5 px-5 py-3 bg-regal-orange rounded-md text-white font-bold text-md cursor-pointer`}>Obtine recompensa</button>
        )
    }
    return (
        <Share slug={props.slug} />
    )
}
