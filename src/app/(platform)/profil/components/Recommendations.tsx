import { useEffect, useState } from "react";

export default function Recommendations() {

    const rewards = [{
        name: "Floraria Mimi",
        statsUsedRecommended: "1/4",
        statsUsedRequired: 4,
        statsUsed: 1,
        statsInProgress: "10",
        slug: "floraria-mimi"
    },
    {
        name: "Frizeria Mihai",
        statsUsedRecommended: "3/4",
        statsUsedRequired: 4,
        statsUsed: 3,
        statsInProgress: "2",
        slug: "frizeria-mihai"
    }];

    const [data, setData] = useState();


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
            console.log("rr", result);
        }
    }

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full">
            {rewards.map(r => {
                return (
                    <div key={r.name} className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)]   cursor-pointer w-full">
                        <div className="flex flex-col p-5">
                            <span className="text-md font-bold">{r.name}</span>
                            <span className="text-gray-600 font-bold">{r.statsUsedRecommended} recomandari folosite</span>
                            <span className="text-gray-600 font-bold">{r.statsInProgress} in progres</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}