import { useEffect, useState } from "react";
import BusinessForm from '@/components/BusinessForm';
import Image from "next/image";

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

export default function Business() {
    const [business, setBusiness] = useState<BusinessData>();
    const [showBusiness, setShowBusiness] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    async function getBusiness() {
        const response = await fetch('/api/afaceri', {
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
        getBusiness();
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
