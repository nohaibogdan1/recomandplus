import Auth from "@/components/Auth";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

function NumericalReason(props: { count: string, title: string, text: string }) {
    return (
        <div className="flex gap-8 items-start">
            <span className="text-7xl text-regal-orange">{props.count}</span>
            <div className="flex flex-col gap-2 mt-1">
                <span className="text-xl font-medium">{props.title} </span>
                <span>{props.text}</span>
            </div>
        </div>
    )
};

function Reason(props: { text: string }) {
    return (
        <div className="flex mt-6 gap-4 font-bold">
            <Image
                src="/verified.svg"
                alt="Next.js logo"
                width={25}
                height={25}
                priority
            />
            {props.text}
        </div>
    )
};


export default function LandingBusiness() {
    return (
        <div>
            <div>
                <div className="flex flex-col">
                    <div className="w-full lg:w-5xl mx-auto">
                        <div className="max-w-2xl text-2xl md:text-3xl leading-9 lg:text-4xl lg:leading-14 px-5 py-10 mt-3"><span className="text-regal-orange">Crește-ți Afacerea</span> cu Recomandări și Promovare Inteligentă!</div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between w-full max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row lg:flex-col items-center justify-center align-center">
                            <Image
                                className="w-full max-w-xs md:max-w-sm lg:max-w-lg px-5 lg:px-0"
                                src="/1.svg"
                                alt="Next.js logo"
                                width={1800}
                                height={380}
                                priority
                            />
                            <div className="min-w-xs max-w-md px-5 mt-6">
                                <span className="font-medium text-xl leading-8">Atrage Clienți Noi și Profită de Primele 2 Luni de Promovare Gratuită!</span>
                                <div className="mt-5">Alătură-te platformei noastre și atrage mai mulți clienți prin recomandări și campanii de promovare personalizate. <br /> <br /> Oferim soluții eficiente pentru afacerea ta, fără costuri inițiale!</div>
                            </div>
                        </div>
                        <Suspense>
                            <Auth withBorder />
                        </Suspense>
                    </div>

                    <div className="border mt-10 mx-5 border-gray-300 w-full max-w-5xl mx-auto"></div>
                    <div className="mt-10 px-5 md:px-10 lg:px-0 flex flex-col md:px-10 w-full max-w-5xl mx-auto">
                        <div className="font-bold text-2xl">Cum functioneaza ?</div>
                        <div className="flex flex-col gap-4 mt-5">
                            <NumericalReason count="1" title="Înscrie-ți afacerea gratuit" text="Adaugă-ți afacerea pe platformă și creează o ofertă atractivă pentru clienții care te recomandă." />
                            <NumericalReason count="2" title="Clienții te recomandă prietenilor" text="Fiecare client primește un cod unic pe care îl poate împărtăși prietenilor și familiei." />
                            <NumericalReason count="3" title="Câștigi clienți noi și îți crești vânzările" text="Când un prieten folosește serviciile tale, clientul recomandator primește o reducere, iar tu câștigi un client nou!" />
                        </div>
                    </div>
                    <div className="mt-10 py-10 px-5 md:px-10 bg-regal-orange text-white">
                        <div className="mx-5 w-full max-w-5xl mx-auto">
                            <div className="font-bold text-2xl"> Beneficiile tale </div>
                            <Reason text="Recomandările personale sunt cea mai eficientă metodă de marketing." />
                            <Reason text="Tu decizi valoarea reducerii." />
                            <Reason text="Clienții tăi au un motiv în plus să revină și să te recomande." />
                            <Reason text="Vezi exact câți clienți ai atras și cum performează campaniile tale." />
                        </div>
                    </div>
                    <div className="px-5 w-full max-w-3xl mx-auto">
                        <button className="px-5 py-6 mt-10  bg-regal-orange rounded-md text-white font-bold text-xl w-full hover:bg-regal-orange-2 active:bg-regal-orange-2 cursor-pointer">
                            Începe Acum <br /> Fără Riscuri, Fără Costuri Inițiale!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const metadata: Metadata = {
    title: "Recomand Plus - Crește-ți afacerea și oferă clienților reduceri",
    description: "Afacerea ta crește organic atunci cand clienții tăi sunt fericiți",
  };