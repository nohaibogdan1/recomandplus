import { useEffect, useState } from "react";
import { CampaignsOwnerRes } from '@/types/serverResponse';
import RewardValidation from '@/components/RewardValidation';
import CreateCampaignForm from '@/components/CreateCampaignForm';
import Business from "./Business";

export default function Campaigns() {
    const [oldCampaigns, setOldCampaigns] = useState<CampaignsOwnerRes["old"]>([]);
    const [current, setCurrent] = useState<CampaignsOwnerRes["current"]>();
    const [showCreate, setShowCreate] = useState(false);

    async function fetchCampaigns() {
        const response = await fetch(`/api/campanii-owner`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result: CampaignsOwnerRes = await response.json();

        if (response.ok) {
            setOldCampaigns(result.old);
            setCurrent(result.current)
        }
    }

    useEffect(() => {
        fetchCampaigns();
    }, []);

    function createdHandler() {
        setShowCreate(false);
        fetchCampaigns();
    }

    const dateFormat = new Intl.DateTimeFormat("ro-RO", {
        timeZone: "Europe/Bucharest",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return (
        <div className="flex flex-col gap-4 w-full">
            <Business />
            <RewardValidation />
            <div className='font-bold'>Campania mea</div>
            {!current && <button onClick={() => setShowCreate(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Creaza campanie</button>}
            {showCreate && <CreateCampaignForm created={createdHandler} />}

            {current &&
                <div className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                    <div className="flex flex-col p-5 gap-2">
                        <a className="text-sm text-blue-600" href={`http://localhost:3000/campanii/${encodeURIComponent(current.business)}`}>Link catre pagina campaniei tale</a>
                        <span className="text-md font-bold">{current.business}</span>
                        <span className="text-gray-600 font-bold">{dateFormat.format(new Date(current.startAt))} - {dateFormat.format(new Date(current.endAt))}</span>
                        <span className="text-sm font-bold">Recompensa</span>
                        <span className="text-sm">{current.reward}</span>
                    </div>
                </div>
            }

            {!!oldCampaigns.length &&
                <>
                    <div className='font-bold mt-5'>Campanii rulate</div>
                    <div className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                        {oldCampaigns.map(c => (
                            <div key={c.id} className="flex flex-col p-5">
                                <span className="text-md font-bold">{c.business}</span>
                                <span className="text-gray-600 font-bold">{dateFormat.format(new Date(c.startAt))} - {dateFormat.format(new Date(c.endAt))}</span>
                                <span className="text-sm font-bold mt-2">Recompensa</span>
                                <span className="text-sm mt-2">{c.reward}</span>
                            </div>
                        ))
                        }
                    </div>
                </>
            }
        </div>
    )
}
