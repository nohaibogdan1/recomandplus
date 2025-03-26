"use client";

import Image from "next/image";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { AdvocateStatusRes, RewardsRes } from "@/types/serverResponse";


function StatusBox(props: { image: string, numbers: string, description: string }) {
    return (
        <div className="flex flex-col w-[calc(33.333%-12px)] h-40 min-w-14 max-w-25 ">
            <div className="flex flex-col justify-center items-center shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] rounded-md h-30 min-h-30 max-h-30">
                <Image
                    className="max-w-6"
                    src={props.image}
                    alt="Next.js logo"
                    width={30}
                    height={30}
                    priority
                />
                <span className=" text-sm text-center text-gray-500 font-bold mt-2">{props.numbers}</span>
            </div>
            <span className="text-sm text-center text-gray-500 font-bold mt-2">{props.description}</span>
        </div>
    )
}

export default function UserStats(props: { slug: string }) {
    const { user } = useUser();

    const [status, setStatus] = useState<RewardsRes>();

    useEffect(() => {
        async function fetchRewards() {
            const response = await fetch(`/api/recompense?business=${props.slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result: RewardsRes = (await response.json());
            if (response.ok) {
                setStatus(result);
            }
        }

        fetchRewards();
    }, []);

    if (!user || !status) return null;

    const rewardsGroup: Record<string, number> = {};

    for (const r of status.rewards) {
        if (r in rewardsGroup) {
            rewardsGroup[r]++;
        } else {
            rewardsGroup[r] = 1;
        }
    }

    return (
        <>
            <div className=" mt-5 p-5 font-bold">Status</div>
            <div className="flex gap-4">
                <StatusBox image="/diamond.svg" numbers={status.status.usedRecommandations} description="recomandari folosite" />
                <StatusBox image="/flame.svg" numbers={status.status.inProgress.toString()} description="in progres" />
                <StatusBox image="/xp.svg" numbers={status.status.xp} description="extra puncte" />
            </div>

            <div className="mt-10 p-5 shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] rounded-md">
                <span className="font-bold">Castigurile tale</span>
                <div className="mt-2 text-sm text-stone-700">
                    {Object.entries(rewardsGroup).map(([k, v]) => (
                        <div key={k} className="mt-1 font-semibold flex gap-3">{v} <span>X</span> <span className="text-neutral-500">{k}</span></div>
                    ))}
                </div>
            </div>
        </>
    )
}