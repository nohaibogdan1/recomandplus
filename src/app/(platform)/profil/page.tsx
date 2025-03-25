"use client"
import { redirect } from 'next/navigation'
import { useEffect, useState } from "react"
import Image from "next/image";
import useUser from "@/hooks/useUser";
import CreateCampaignForm from '@/components/CreateCampaignForm';
import BusinessForm from '@/components/BusinessForm';
import RewardValidation from '@/components/RewardValidation';
import { CampaignsOwnerRes } from '@/types/serverResponse';

function Recommendations() {
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

function Campaigns() {
    const c = {
        id: 1,
        business: "Nohai La Miere",
        startDate: "12.02.2023",
        endDate: "14.04.2023",
        rewards: ["20% reducere in limita a 100 RON", "un borcan de miere"]
    };

    const statistics = [
        {
            id: 1,
            date: Date.now(),
            x: 2,
            y: 4,
            z: 6
        }
    ];

    const showCreateCampaign = false;

    const [campaigns, setCampaigns] = useState<CampaignsOwnerRes["campaigns"]>([]);

    useEffect(() => {
        async function fetchCampaigns() {
            const response = await fetch(`/api/campanii-owner`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result: CampaignsOwnerRes = await response.json();

            if (response.ok) {
                setCampaigns(result.campaigns);
            }
        }
        fetchCampaigns();
    }, []);


    return (
        <div className="flex flex-col gap-4 w-full">
            <Business />
            <RewardValidation />
            <div className='font-bold'>Campania mea</div>
            {showCreateCampaign && <CreateCampaignForm />}

            <div className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                <div className="flex flex-col p-5">
                    <span className="text-md font-bold">{c.business}</span>
                    <span className="text-gray-600 font-bold">{c.startDate} - {c.endDate}</span>
                    <div className="mt-2 flex flex-col gap-1"></div>
                </div>
            </div>
        </div>
    )
}


type BusinessData = {
    id: string | null;
    businessName: string;
    photo: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    googleMaps: string;
    address: string;
    phone: string;
    county?: string;
    isOnline: boolean;
}

type BusinessDataRes = BusinessData & {
    createdAt: string,
}

function Business() {
    const [business, setBusiness] = useState<BusinessData>();
    const [showBusiness, setShowBusiness] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    async function getBusiness() {
        const response = await fetch('/api/afaceri-owner', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (response.ok) {
            console.log("resu", result);
            setBusiness(result);
        } else {
            console.log("error", result);
            if (result.error === "Not Found") {
                //Not doing anything
            }
        }
    }

    useEffect(() => {
        // getBusiness();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full">
            {!business && <button onClick={() => setShowUpdate(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Adauga afacerea</button>}
            {business && !showBusiness && <button onClick={() => setShowBusiness(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Vezi afacerea</button>}
            {business && showBusiness &&
                <>
                    <div className='flex gap-5'>
                        {!showUpdate && <button onClick={() => setShowUpdate(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Modifica</button>}
                        <button onClick={() => { setShowBusiness(false); setShowUpdate(false) }} className="cursor-pointer w-7 rounded-md bg-gray-100 text-sm font-bold py-2">X</button>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <span className="text-md font-bold">{business.businessName}</span>
                        <Image
                            src={business.photo}
                            alt="Next.js logo"
                            width={100}
                            height={100}
                            priority
                        />
                        <span>{business.address}</span>
                        <a href={business.googleMaps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-3"
                        >
                            <Image
                                src="/gmaps.svg"
                                alt="Next.js logo"
                                width={20}
                                height={20}
                                priority
                            />
                            Deschide in Google Maps
                        </a>
                        {business.county && <span>Judetul: {business.county}</span>}
                        <span>{business.isOnline ? "Este afacere online" : "Nu este afacere online"}</span>
                        <span>Tel: {business.phone}</span>
                        <div className='flex gap-6'>
                            {business.facebook && <a href={business.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/facebooksquared.svg"
                                    alt="Next.js logo"
                                    width={20}
                                    height={20}
                                    priority
                                /></a>
                            }
                            {business.instagram && < a href={business.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/instagram.svg"
                                    alt="Next.js logo"
                                    width={20}
                                    height={20}
                                    priority
                                /></a>
                            }

                            {business.tiktok && < a href={business.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/tiktok.svg"
                                    alt="Next.js logo"
                                    width={20}
                                    height={20}
                                    priority
                                /></a>
                            }
                        </div>

                    </div>
                </>
            }
            {showUpdate &&
                <BusinessForm
                    close={() => setShowUpdate(false)}
                    updated={() => {
                        setShowUpdate(false);
                        getBusiness();
                    }}
                    initialData={business} />}
        </div>
    )
}

function MyAccount() {
    return (
        <button className="cursor-pointer w-40 mt-2 rounded-md text-white bg-red-500 text-sm font-bold py-2">Sterge contul</button>
    )
}

export default function ProfilePage() {
    const [menu, setMenu] = useState(0);

    const { user, isLoading } = useUser();

    if (isLoading) {
        return null;
    }

    if (!user) {
        redirect('/login');
    }

    return (
        <>
            <div className="max-w-5xl mx-auto mt-3 px-2 md:px-10">
                <div className="">ionut.nohai@gmail.com</div>
                <div className="flex mt-10 gap-10 md:gap-30 max-w-2xl">
                    <div className="hidden md:flex flex-col w-45 gap-10">
                        <div className={`cursor-pointer ${menu === 0 && 'font-bold'}`}
                            onClick={() => setMenu(0)}>Recomandari</div>
                        <div className={`cursor-pointer ${menu === 1 && 'font-bold'}`}
                            onClick={() => setMenu(1)}>Campania mea</div>
                        <div className={`cursor-pointer ${menu === 3 && 'font-bold'}`}
                            onClick={() => setMenu(2)}>Contul meu</div>
                    </div>
                    {false && <div className="flex items-center justify-evenly md:hidden absolute bottom-0 w-45 gap-10 bg-white w-full absolute left-0 bottom-0">
                        <div className={`cursor-pointer py-3 flex justify-center flex-auto ${menu === 0 && 'bg-gray-100'}`}
                            onClick={() => setMenu(0)}>
                            <Image
                                src="/star-dark.svg"
                                alt="Next.js logo"
                                width={23}
                                height={23}
                                priority />
                        </div>
                        <div className={`cursor-pointer py-3  flex justify-center flex-auto ${menu === 1 && 'bg-gray-100'}`}
                            onClick={() => setMenu(1)}>
                            <Image
                                src="/megafone.svg"
                                alt="Next.js logo"
                                width={23}
                                height={23}
                                priority />
                        </div>
                        <div className={`cursor-pointer py-3 flex justify-center flex-auto ${menu === 2 && 'bg-gray-100'}`}
                            onClick={() => setMenu(2)}>
                            <Image
                                src="/work-case.svg"
                                alt="Next.js logo"
                                width={23}
                                height={23}
                                priority />
                        </div>
                        <div className={`cursor-pointer py-3 flex justify-center flex-auto ${menu === 3 && 'bg-gray-100'}`}
                            onClick={() => setMenu(3)}>
                            <Image
                                src="/settings.svg"
                                alt="Next.js logo"
                                width={23}
                                height={23}
                                priority />
                        </div>
                    </div>
                    }
                    <div className="w-full">
                        {menu === 0 && <Recommendations />}
                        {menu === 1 && <Campaigns />}
                        {menu === 2 && <MyAccount />}
                    </div>
                </div>
            </div>
        </>
    )
}