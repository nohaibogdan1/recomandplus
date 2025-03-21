import Image from "next/image";


function BusinessBox(props: {image: string, name: string, rewards: string[], daysLeft: string}) {
    return(
        <div className="p-3 bg-white rounded-md w-xs lg:w-[calc(33.333%-12px)] hover:shadow-2xl cursor-pointer">
            <Image
                className="rounded-md object-cover h-34 lg:h-45"
                src={props.image}
                alt="Next.js logo"
                width={1000}
                height={1000}
                priority
            />
            <div className="mt-2 text-lg font-bold">{props.name}</div>
            <ul className="mt-2 text-sm text-stone-700 pl-1">
                {props.rewards.map(r => (
                    <li key={r} className="flex gap-3">
                        <Image
                            src="/right-arrow.svg"
                            alt="Next.js logo"
                            width={10}
                            height={10}
                            priority
                        />
                        <div className=" mt-1">{r}</div>
                    </li>
                ))}
            </ul>
            <div className="flex gap-2 mt-2">
                <Image
                    src="/clock.svg"
                    alt="Next.js logo"
                    width={20}
                    height={20}
                    priority
                />
                {props.daysLeft} zile au mai ramas
            </div>
        </div>
)};


export default function BusinessListPage() {
    return(
        <>
        <div className="flex flex-col gap-3 bg-neutral-100 pt-5 px-4">
            <div className="w-xs lg:w-full max-w-5xl mx-auto">
                <button className="bg-white py-3 px-10 rounded-3xl font-bold cursor-pointer">Schimba locatia</button>
            </div>

            <div className="flex py-2 gap-4 flex-wrap w-full max-w-5xl mx-auto justify-center md:justify-start">
                <BusinessBox image="/florarie.jpeg" name="Floraria Mimi" rewards={["Reducere 50% din cumparaturi in limita a 200 RON", "Un buchet de trandafiri"]} daysLeft="123" />
                <BusinessBox image="/frizerie.jpg" name="Frizeria Mihai" rewards={["Reducere 30% in limita a 200 RON", "Un aftershave", "Un tuns gratuit"]} daysLeft="64" />
                <BusinessBox image="/cabinetstomatologic.jpeg" name="Dentistii Cool" rewards={["Reducere 30% in limita a 500 RON", "Un periaj gratuit"]} daysLeft="100" />
                <BusinessBox image="/cursuriprogramare.jpeg" name="Scoala de IT Suceava" rewards={["Reducere 30% in limita a 200 RON", "O ora de consultanta de alegere a jobului"]} daysLeft="140" />
                <BusinessBox image="/miere.jpeg" name="Nohai La miere" rewards={["Reducere 30% in limita a 200 RON", "100g propolis", "un borcanel miere de manuka"]} daysLeft="111" />
            </div>
        </div>
        </>

)};