import Reward from "@/components/Reward";
import UserStats from "@/components/UserStats";
import { CampaignRes } from "@/types/serverResponse";
import Image from "next/image";
import getLeftDays from "../components/getLeftDays";
import Share from "@/components/Share";

const slugToPicture = {
    "floraria-mimi": "/florarie.jpeg",
    "frizeria-mihai": "/frizerie.jpg",
    "dentistii-cool": "/cabinetstomatologic.jpeg",
    "scoala-de-it-suceava": "/cursuriprogramare.jpeg",
    "nohai-la-miere": "/miere.jpeg"
};

export default async function CampaignPage({params}: {params: { slug: string };}) {
    const {slug} = await params;

    const res = await fetch(`http://localhost:3000/api/campanii/${slug}`, {
        cache: "no-store", 
    });

    const data: CampaignRes = await res.json();
  
    if (!res.ok) {
        return <span>Problema</span>
    }

    return (
        <>
            <Image
                className="object-cover h-50 md:max-w-2xl md:rounded-xl md:mt-5 md:mx-auto md:h-60"
                src={data.business.photo || "/florarie.jpeg"}
                alt="Next.js logo"
                width={1000}
                height={1000}
                priority
            />

            <div className="md:max-w-2xl md:mx-auto">
                <div className="w-full bg-white rounded-t-3xl h-8 relative -top-5 md:top-0 px-5 md:px-0 pt-5 md:h-auto ">
                    <div className="text-2xl text-center">{data.business.name}</div>

                    <div className="flex gap-2 mt-2">
                        <Image
                            src="/clock.svg"
                            alt="Next.js logo"
                            width={20}
                            height={20}
                            priority
                        />
                        <span>{getLeftDays(data.endAt)}</span>
                    </div>
                    <div className="mt-5 p-5 shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] rounded-md">
                        <div className="mt-1">{data.reward}</div>
                    </div>

                    <Reward slug={slug}/>
                    <UserStats slug={slug}/>

                    <div className="text-xl mt-6 text-center font-bold text-gray-600">Te asteapta urmatoarea recompensa</div>

                    <div className="border-1 mt-5 border-gray-200" />
                    <div className="mt-5">{data.business.location}</div>
                    <a href={data.business.maps} className="flex gap-3 mt-4">
                        <Image
                            src="/gmaps.svg"
                            alt="Next.js logo"
                            width={20}
                            height={20}
                            priority
                        />
                        <div className="text-sm">Deschide in google maps</div>
                    </a>
                    <div className="mt-5">Tel: {data.business.phone}</div>
                </div>
            </div>
        </>
    )
};
