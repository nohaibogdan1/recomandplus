import Auth from "@/components/Auth";
import BusinessFAQ from "@/components/BusinessFAQ";
import HeaderLanding from "@/components/HeaderLanding";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

function NumericalReason(props: { count: string, title: string, text: string }) {
    return (
        <div className="flex gap-5 items-start">
            <div className="bg-regal-orange rounded-3xl px-2 text-white mt-[2]">{props.count}</div>
            <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold ">{props.title} </span>
                <span className="text-text-secondary">{props.text}</span>
            </div>
        </div>
    )
};

export default function LandingBusiness() {
    return (
        <div>
            <HeaderLanding />

            <div className="bg-[url(/group.jpg)] h-160 w-full bg-cover bg-top absolute top-0"></div>
            <div className="bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.2)] h-160 w-full bg-cover bg-top absolute top-0"></div>

            <div className="relative">
                <div className="flex flex-col">
                    <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto">
                        <div className="">
                            <div className="w-full mx-auto pt-60 px-5 lg:pt-30">
                                <h1 className="font-bold text-white max-w-2xl text-3xl md:text-3xl leading-11 lg:text-5xl lg:leading-16 ">Dezvoltă-ți afacerea cu promovare inteligentă!</h1>
                                <p className="text-white text-lg mt-7 lg:text-xl lg:mt-9">Alătură-te platformei noastre și atrage mai mulți clienți prin recomandări și campanii de promovare personalizate. Oferim soluții eficiente pentru afacerea ta, fără costuri inițiale.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl mt-20 lg:mt-25 px-5 flex flex-col md:px-10 w-full max-w-5xl mx-auto ">
                            <div className="flex flex-col gap-4 py-10">
                                <h4 className="font-semibold mt-0 text-2xl">Te ajutăm să îți dezvolți afacerea</h4>
                                <Suspense>
                                    <Auth forBusiness />
                                </Suspense>
                            </div>
                        </div>
                    </div>


                    <div className="mt-20 px-5 md:px-10 lg:px-0 flex gap-15 md:px-10 lg:mt-50 w-full max-w-5xl mx-auto flex-col md:flex-row">
                        <div className="order-2 md:order-1">
                            <h4 className="font-semibold mt-0 text-xl lg:text-3xl mb-0"> Mai mult success cu RecomandPlus</h4>
                            <div className="flex flex-col gap-8 mt-9">
                                <NumericalReason count="1" title="Înscrie-ți afacerea gratuit" text="Adaugă-ți afacerea pe platformă și creează o ofertă atractivă pentru clienții care te recomandă." />
                                <NumericalReason count="2" title="Clienții te recomandă prietenilor" text="Fiecare client primește un cod unic pe care îl poate împărtăși prietenilor și familiei." />
                                <NumericalReason count="3" title="Câștigi clienți noi și îți crești vânzările" text="Când un prieten folosește serviciile tale, clientul recomandator primește o reducere, iar tu câștigi un client nou!" />
                            </div>
                        </div>
                        <Image
                            className="rounded-3xl w-full md:w-120 relative block rounded h-auto inset-0 object-cover object-center aspect-[1/1] order-1 md:order-2"
                            src="/seller-on-phone.png"
                            alt="Next.js logo"
                            width={600}
                            height={600}
                            priority
                        />
                    </div>
                    <div className="mt-20 px-5 md:px-10 lg:px-0 flex gap-15 md:px-10 lg:mt-50 w-full max-w-5xl mx-auto flex-col md:flex-row">
                        <div className="order-2 md:order-2">
                            <h4 className="font-semibold mt-0 text-xl lg:text-3xl mb-0"> Transparență completă asupra performanței campaniei</h4>
                            <div className="flex flex-col gap-8 mt-9">
                                <NumericalReason count="1" title="Numărul de vânzări generate prin platformă" text="Urmărește cu ușurință câte vânzări au fost generate prin campaniile de recomandare, pentru a înțelege eficiența promovării tale. Poți analiza evoluția acestora și ajusta strategia pentru a maximiza rezultatele." />
                                <NumericalReason count="2" title="Numărul de utilizatori care s-au înscris pentru recompensă" text="Vezi câți utilizatori s-au înscris pentru recompense, ceea ce îți oferă o imagine clară asupra interesului față de ofertele tale. Poți adapta recompensele pentru a atrage mai mulți clienți." />
                                <NumericalReason count="3" title="Evoluția zilnică a campaniei" text="Vizualizează evoluția campaniei tale pe zile, pentru a identifica rapid tendințele și a optimiza strategia pe baza rezultatelor obținute zilnic." />
                            </div>
                        </div>
                        <Image
                            className="rounded-3xl w-full md:w-120 relative block rounded h-auto inset-0 object-cover object-center aspect-[1/1] order-1 md:order-1"
                            src="/stats-tablet.jpg"
                            alt="Next.js logo"
                            width={600}
                            height={600}
                            priority
                        />
                    </div>

                    <BusinessFAQ />

                    <div className="mt-30"></div>
                </div>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Recomand Plus - Crește-ți afacerea și oferă clienților reduceri",
    description: "Afacerea ta crește organic atunci cand clienții tăi sunt fericiți",
    openGraph: {
        title: "Recomand Plus - Crește-ți afacerea și oferă clienților reduceri",
        description: "Afacerea ta crește organic atunci cand clienții tăi sunt fericiți",
        images: [`${process.env.NEXT_PUBLIC_API_URL}/preview-main.png`],
        type: "website",
    },
    twitter: {
        title: "Recomand Plus - Crește-ți afacerea și oferă clienților reduceri",
        description: "Afacerea ta crește organic atunci cand clienții tăi sunt fericiți",
        images: [`${process.env.NEXT_PUBLIC_API_URL}/preview-main.png`],
    }
};