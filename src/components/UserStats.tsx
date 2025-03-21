"use client";

import Image from "next/image";
import useUser from "@/hooks/useUser";


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

export default function UserStats() {

    const [user] = useUser();

    const rewards = ["Reducere 50% din cumparaturi in limita a 200 RON", "Un buchet de trandafiri"];

    const winns = [{ count: 1, reward: rewards[0] }, { count: 2, reward: rewards[1] }];

    if (!user) return null;

    return (
        <>
            <div className=" mt-5 p-5 font-bold">Status</div>
            <div className="flex gap-4">
                <StatusBox image="/diamond.svg" numbers="1/4" description="recomandari folosite" />
                <StatusBox image="/flame.svg" numbers="10" description="in progres" />
                <StatusBox image="/xp.svg" numbers="5/100" description="extra puncte" />
            </div>


            <div className="mt-10 p-5 shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] rounded-md">
                <span className="font-bold">Castigurile tale</span>
                <div className="mt-2 text-sm text-stone-700">
                    {winns.map(w => (
                        <div key={w.reward} className="mt-1 font-semibold">{w.count}<span className="ml-3 text-neutral-500">{w.reward}</span></div>
                    ))}
                </div>
            </div>
        </>
    )
}