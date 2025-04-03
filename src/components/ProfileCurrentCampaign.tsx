import { BusinessOwnerRes } from "@/types/serverResponse";
import ChangeRewardForm from "./ChangeRewardForm";
import { useState } from "react";
import CampaignStatistics from "./CampaignStatistics";
import Button from "./common/Button";

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
            <div className="flex flex-col p-5 gap-2">
                <a className="text-sm text-blue-600" href={`/campanii/${encodeURIComponent(businessName)}`}>Link catre pagina campaniei tale</a>
                <span className="text-gray-600 font-bold">{dateFormat.format(new Date(campaign.startAt))} - {dateFormat.format(new Date(campaign.endAt))}</span>
                <CampaignStatistics id={campaign.id}/>
                <span className="text-sm font-bold mt-3">Recompensa curentă</span>
                <span className="text-gray-600 font-bold">{dateFormat.format(new Date(campaign.rewards[0].createdAt))}</span>
                <ul>
                    {campaign.rewards[0].options.map(o =>
                        <li key={o} className="text-sm">{o}</li>
                    )}
                </ul>
                <Button onClick={() => setShowChangeReward(true)} text="Schimbă recompensa"/>
                {showChangeReward && <ChangeRewardForm changed={() => { setShowChangeReward(false); refetch(); }} />}

                {campaign.rewards.length > 1 &&
                    <>
                        <span className="text-sm font-bold mt-3">Recompense anterioare</span>
                        {campaign.rewards.slice(1).map((r,i) => (
                            <div key={r.id} className={`${i%2 ? "bg-slate-50" : "bg-white"}`}>
                                <span className="text-gray-600 font-bold">{dateFormat.format(new Date(r.createdAt))}</span>
                                <ul>
                                    {r.options.map(o => (
                                        <li key={o} className="text-sm">{o}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    )
}