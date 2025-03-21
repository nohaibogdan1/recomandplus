"use client"
import { useState } from "react"
import Image from "next/image";

function Recommendations(){
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

    return(
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
                )})}
        </div>
    )
}

function Campaigns(){
    const campaigns = [{
        id: 1,
        business: "Nohai La Miere",
        startDate: "12.02.2023",
        endDate: "14.04.2023",
        rewards: ["20% reducere in limita a 100 RON", "un borcan de miere"]
    },
    {
        id: 2,
        business: "Nohai La Miere",
        startDate: "12.02.2023",
        endDate: "14.04.2023",
        rewards: ["20% reducere in limita a 100 RON", "un borcan de miere"]
    }];

    return(
        <div className="flex flex-col gap-4 w-full">
            <button className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Creati campanie</button>
            {campaigns.map(c => {
                return (
                    <div key={c.id} className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                        <div className="flex flex-col p-5"> 
                            <span className="text-md font-bold">{c.business}</span>
                            <span className="text-gray-600 font-bold">{c.startDate} - {c.endDate}</span>
                            <div className="mt-2 flex flex-col gap-1">
                                {c.rewards.map(r =><div key={r}>{r}</div>)}
                            </div>
                            <button className="cursor-pointer w-40 mt-2 rounded-md bg-gray-100 text-sm font-bold py-2">Vezi detalii</button>
                        </div>
                    </div>
                )})}
        </div>
    )
}

function Business(){

    const data = {
        id: 1,
        name: "Nohai La Miere"
    };

    return(
        <div className="flex flex-col gap-4 w-full">
            <button className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Adaugati afacerea</button>
                <span className="text-md font-bold">{data.name}</span>
                <Image
                    src="/miere.jpeg"
                    alt="Next.js logo"
                    width={100}
                    height={100}
                    priority
                />
                <span>Șoseaua Păcurari 121, Iași</span>
                <div className="flex gap-3">
                    <Image
                        src="/gmaps.svg"
                        alt="Next.js logo"
                        width={20}
                        height={20}
                        priority
                    />
                    <span className="text-sm">Deschide in google maps</span>
                </div>
                <span>Tel: 00409332114</span>
                <button className="cursor-pointer w-40 mt-2 rounded-md bg-gray-100 text-sm font-bold py-2">Vezi detalii</button>
        </div>
    )
}

function MyAccount(){
    return(
        <button className="cursor-pointer w-40 mt-2 rounded-md text-white bg-red-500 text-sm font-bold py-2">Sterge contul</button>
    )
}

export default function ProfilePage(){
    const [menu, setMenu] = useState(0);

    return(
        <>

            <div className="max-w-5xl mx-auto mt-3 px-2 md:px-10">
                <div className="">ionut.nohai@gmail.com</div>
                <div className="flex mt-10 gap-10 md:gap-30 max-w-2xl">
                    <div className="hidden md:flex flex-col w-45 gap-10">
                        <div className={`cursor-pointer ${menu === 0 && 'font-bold'}`}
                            onClick={() => setMenu(0)}>Recomandari</div>
                        <div className={`cursor-pointer ${menu === 1 && 'font-bold'}`}
                            onClick={() => setMenu(1)}>Campanii</div>
                        <div className={`cursor-pointer ${menu === 2 && 'font-bold'}`}
                            onClick={() => setMenu(2)}>Afacerea mea</div>
                        <div className={`cursor-pointer ${menu === 3 && 'font-bold'}`}
                            onClick={() => setMenu(3)}>Contul meu</div>
                    </div>
                    <div className="flex items-center justify-evenly md:hidden absolute bottom-0 w-45 gap-10 bg-white w-full absolute left-0 bottom-0">
                        <div className={`cursor-pointer py-3 flex justify-center flex-auto ${menu === 0 && 'bg-gray-100'}`}
                            onClick={() => setMenu(0)}>
                            <Image
                                src="/star-dark.svg"
                                alt="Next.js logo"
                                width={23}
                                height={23}
                                priority/>
                        </div>
                        <div className={`cursor-pointer py-3  flex justify-center flex-auto ${menu === 1 && 'bg-gray-100'}`}
                            onClick={() => setMenu(1)}>
                                <Image
                                    src="/megafone.svg"
                                    alt="Next.js logo"
                                    width={23}
                                    height={23}
                                    priority/>
                            </div>
                        <div className={`cursor-pointer py-3 flex justify-center flex-auto ${menu === 2 && 'bg-gray-100'}`}
                            onClick={() => setMenu(2)}>
                                <Image
                                    src="/work-case.svg"
                                    alt="Next.js logo"
                                    width={23}
                                    height={23}
                                    priority/>
                            </div>
                        <div className={`cursor-pointer py-3 flex justify-center flex-auto ${menu === 3 && 'bg-gray-100'}`}
                            onClick={() => setMenu(3)}>
                                <Image
                                    src="/settings.svg"
                                    alt="Next.js logo"
                                    width={23}
                                    height={23}
                                    priority/>
                            </div>
                    </div>
                    <div className="w-full">
                        {menu === 0 && <Recommendations/>}
                        {menu === 1 && <Campaigns/>}
                        {menu === 2 && <Business/>}
                        {menu === 3 && <MyAccount/>}
                    </div>
                </div>
            </div>
        </>
    )
}