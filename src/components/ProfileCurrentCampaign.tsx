import { BusinessOwnerRes } from "@/types/serverResponse";
import ChangeRewardForm from "./ChangeRewardForm";
import { useState } from "react";
import CampaignStatistics from "./CampaignStatistics";
import Button from "./common/Button";
import Link from "next/link";

export default function ProfileCurrentCampaign({
    refetch,
    businessName,
    campaign
}: {
    refetch: () => void,
    businessName: string,
    campaign: Required<Required<BusinessOwnerRes>["business"]>["campaign"]
}) {
    const [showChangeReward, setShowChangeReward] = useState(false);

    const dateFormat = new Intl.DateTimeFormat("ro-RO", {
        timeZone: "Europe/Bucharest",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return (
        <div className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
            <div className="flex flex-col p-5 gap-12">
                <div className="flex flex-wrap gap-4 items-center">
                    <span className="text-gray-600 font-bold">{dateFormat.format(new Date(campaign.startAt))} - {dateFormat.format(new Date(campaign.endAt))}</span>
                    <a className="text-orange-3 hover:underline" target="_blank" rel="noopener noreferrer" href={`/campanii/${encodeURIComponent(businessName)}`}>Către pagina campaniei ↗</a>
                </div>
                <CampaignStatistics id={campaign.id} />
                <div className="flex flex-col gap-3">
                    <span className="font-bold">Recompensa curentă</span>
                    <span className="text-gray-600 font-bold">{dateFormat.format(new Date(campaign.rewards[0].createdAt))}</span>
                    <ul>
                        {campaign.rewards[0].options.map(o =>
                            <li key={o} className="text-sm">{o}</li>
                        )}
                    </ul>
                    <Button onClick={() => setShowChangeReward(true)} text="Schimbă recompensa" />
                    {showChangeReward && <ChangeRewardForm changed={() => { setShowChangeReward(false); refetch(); }} />}
                </div>


                {campaign.rewards.length > 1 &&
                    <div className="flex flex-col gap-5">
                        <span className="font-bold">Recompense anterioare</span>
                        {campaign.rewards.slice(1).map((r) => (
                            <div key={r.id}>
                                <span className="text-gray-600 font-bold">{dateFormat.format(new Date(r.createdAt))}</span>
                                <ul>
                                    {r.options.map(o => (
                                        <li key={o} className="text-sm">{o}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}