import Auth from "@/components/Auth";
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

function Reason2(props: { title: string, text: string }) {
    return (
        <div className="flex gap-4 items-center mt-4">
            <Image
                src="/squarlyarrow.svg"
                alt="Next.js logo"
                width={50}
                height={50}
                priority
            />
            <div>
                <b>{props.title}</b> {props.text}
            </div>
        </div>
    )
};


export default function LandingAdvocate() {
    return (
        <div>
            <div>
                <div className="flex flex-col">
                    <div className="flex w-full justify-start bg-regal-orange text-white text-2xl md:text-3xl leading-9 px-5 py-10 mt-3">
                        <div className="w-full lg:w-5xl mx-auto">
                            <div className="max-w-lg"><b>Recomandă și Câștigă Reduceri </b> la Afacerile Tale Favorite! </div></div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between w-full max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row lg:flex-col items-center justify-center align-center">
                            <Image
                                className="w-full max-w-md lg:max-w-lg relative lg:-left-11"
                                src="/10559.jpg"
                                alt="Next.js logo"
                                width={1800}
                                height={380}
                                priority
                            />
                            <div className="min-w-xs max-w-md text-xl px-5 leading-8 mt-2 relative lg:-left-11">
                                Fă o recomandare, prietenii tăi beneficiază de servicii excelente, iar tu primești o reducere drept recompensă.
                                <div className="mt-10">Simplu, rapid și avantajos!</div>
                            </div>
                        </div>
                        <div className="mx-5">
                            <Suspense>
                                <Auth withBorder />
                            </Suspense>
                        </div>
                    </div>

                    <div className="border mt-10 mx-5 border-gray-300 w-full max-w-5xl mx-auto"></div>
                    <div className="mt-10 px-5 md:px-10 lg:px-0 flex flex-col md:px-10 w-full max-w-5xl mx-auto">
                        <div className="font-bold text-2xl">Cum functioneaza ?</div>
                        <div className="flex flex-col gap-4 mt-5">
                            <NumericalReason count="1" title="Alege o afacere locală" text="Descoperă magazine, saloane, restaurante și multe altele." />
                            <NumericalReason count="2" title="Recomandă unui prieten" text="Trimite un link unic de recomandare." />
                            <NumericalReason count="3" title="Prietenul tău folosește serviciul" text="Când finalizează o achiziție, tu primești o reducere." />
                            <NumericalReason count="4" title="Bucură-te de recompensa ta!" text="Folosește reducerea la afacerile preferate din oraș." />
                        </div>
                    </div>
                    <div className="mt-10 py-10 px-5 md:px-10 bg-regal-orange text-white">
                        <div className="mx-5 w-full max-w-5xl mx-auto">
                            <div className="font-bold text-2xl"> Beneficiile tale </div>
                            <Reason text="Economisești bani la serviciile pe care le folosești deja." />
                            <Reason text="Susții afacerile locale și comunitatea ta." />
                            <Reason text="Recomanzi doar ceea ce iubești – fără obligații!" />
                            <Reason text="Proces simplu și transparent." />
                        </div>
                    </div>
                    <div className="px-5 w-full max-w-3xl mx-auto">
                        <button className="px-5 py-6 mt-10  bg-regal-orange rounded-md text-white font-bold text-xl w-full hover:bg-regal-orange-2 active:bg-regal-orange-2 cursor-pointer">Incepe acum GRATUIT</button>
                    </div>
                    <div className="flex w-full max-w-5xl mx-auto flex-col md:flex-row items-center justify-center lg:justify-between align-center">
                        <Image
                            className="w-full max-w-md lg:max-w-lg relative lg:-left-11"
                            src="/10820.jpg"
                            alt="Next.js logo"
                            width={1000}
                            height={1000}
                            priority
                        />
                        <div className="px-5 md:px-10 min-w-xs md:max-w-md lg:max-w-lg text-xl px-10 leading-8 mt-2">
                            <Reason2 title="Creează un cont" text=" și începe să recomanzi afacerile tale preferate." />
                            <Reason2 title="Distribuie linkul tău unic" text="prietenilor și familiei." />
                            <Reason2 title="Primește reduceri" text="de fiecare dată când cineva folosește o recomandare." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}