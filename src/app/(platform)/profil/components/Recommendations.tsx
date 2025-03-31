import Problem from "@/components/Problem";
import { AdvocateCampaignsRes } from "@/types/serverResponse";
import { useEffect, useState } from "react";
import getLeftDays from "../../campanii/components/getLeftDays";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Box({ campaign }: AdvocateCampaignsRes[0]) {
    const router = useRouter();

    const rewardsGroup: Record<string, { count: number; options: string[] }> = {};
    const reward = campaign.reward;

    for (const r of reward) {
        if (r.id in rewardsGroup) {
            rewardsGroup[r.id].count++;
        } else {
            rewardsGroup[r.id] = {
                count: 1,
                options: r.options
            };
        }
    }

    return (
        <div onClick={() => router.push(`/campanii/${encodeURIComponent(campaign.business)}`)} className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)]   cursor-pointer w-full">
            <div className="flex flex-col p-5">
                <span className="text-md font-bold">{campaign.business}</span>
                <div className="mt-2 text-sm text-stone-700">
                    {Object.entries(rewardsGroup).map(([k, v]) => (
                        <div key={k} className="mt-1 font-semibold flex gap-3">{v.count}
                            <span>X</span>
                            {
                                <ul>
                                    {v.options.map(o => (
                                        <li key={o} className="text-neutral-500">{o}</li>
                                    ))}
                                </ul>
                            }
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 mt-2">
                    <Image
                        src="/clock.svg"
                        alt="Next.js logo"
                        width={20}
                        height={20}
                        priority
                    />
                    <span>{getLeftDays(campaign.endAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default function Recommendations() {
    const [data, setData] = useState<AdvocateCampaignsRes>();
    const [error, setError] = useState(false);

    async function fetchCampaigns() {
        const response = await fetch(`/api/advocate/campanii`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();

        if (response.ok) {
            setData(result);
        } else {
            if (response.status === 500) {
                setError(true);
            }
        }
    }

    useEffect(() => {
        fetchCampaigns();
    }, []);

    if (error) {
        return <Problem />
    }

    if (!data) {
        return null;
    }

    const withRewards = data.filter(a => a.campaign.reward.length);
    const withNoRewards = data.filter(a => !a.campaign.reward.length);

    return (
        <div className="flex flex-col gap-4 w-full">
            {!!withRewards.length && <div className="font-bold">Recompense nefolosite</div>}
            {withRewards.map(a => <Box key={a.campaign.id} {...a} />)}
            {!!withRewards.length && !!withNoRewards.length && <div className="border border-gray-400"></div>}
            {withNoRewards.map(a => <Box key={a.campaign.id} {...a} />)}
            {error && <Problem />}
        </div>
    )
}