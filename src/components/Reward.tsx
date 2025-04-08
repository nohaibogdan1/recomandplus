"use client"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Share from "./Share";
import Problem from "./Problem";
import UserStats from "./UserStats";
import Button, { ButtonVariants } from "./common/Button";

export default function RewardBtn(props: { slug: string }) {
    const { user } = useUser();
    const router = useRouter();
    const [showGetReward, setShowGetReward] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingReq, setLoadingReq] = useState(false);
    const [error, setError] = useState(false);

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
        if (loadingReq) {
            return;
        }
        if (!user) {
            router.push(`/login?redirect=${encodeURIComponent(`"${pathname}?${searchParams.toString()}"`)}`);
        } else {
            setLoadingReq(true);
            const response = await fetch('/api/recompense-first-time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ businessName: props.slug, referral }),
            });

            await response.json();

            if (response.ok) {
                window.scrollTo({ top: 500, behavior: "smooth" });
                setShowGetReward(false);
            } else {
                if (response.status === 500) {
                    setError(true);
                    setTimeout(() => { setError(false) }, 2000);
                }
            }
            setLoadingReq(false);
        }
    }

    if (loading) {
        return null;
    }

    if (showGetReward) {
        return (
            <>
                <Button loading={loadingReq} onClick={handler} text="Obține recompensa" variant={ButtonVariants.PRIMARY} />
                {error &&
                    <div className="mt-2">
                        <Problem />
                    </div>
                }
                <UserStats slug={props.slug} />
            </>
        )
    }
    return (
        <>
            <Share slug={props.slug} />
            <UserStats slug={props.slug} />
        </>
    )
}
