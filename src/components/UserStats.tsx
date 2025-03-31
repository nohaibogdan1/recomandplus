"use client";

import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { RewardsRes } from "@/types/serverResponse";


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

    const rewardsGroup: Record<string, { count: number; options: string[] }> = {};
    const rewards = status.rewards;

    console.log("rew", rewards)

    for (const r of rewards) {
        if (r.id in rewardsGroup) {
            rewardsGroup[r.id].count++;
        } else {
            rewardsGroup[r.id] = {
                count: 1,
                options: r.rewards
            };
        }
    }

    return (
        <>
            <div className="mt-10 p-5 shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] rounded-md">
                <span className="font-bold">Castigurile tale</span>
                <div className="mt-2 text-sm text-stone-700">
                    {Object.entries(rewardsGroup).map(([k, v]) => (
                        <div key={k} className="mt-1 font-semibold flex gap-3">
                            {v.count}
                            <span>X</span>
                            <ul className="text-neutral-500">
                                {v.options.map(o => <li key={o}>{o}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}