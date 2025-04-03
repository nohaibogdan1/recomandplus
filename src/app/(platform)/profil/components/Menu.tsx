import Image from "next/image";
import Link from "next/link";

export default function Menu({ menu, setMenu }: { menu: number, setMenu: (o: number) => void }) {
    return (
        <>
            <div className="flex mt-10 gap-10 md:gap-30 max-w-2xl">
                <div className="hidden md:flex flex-col w-45 gap-10">
                    <div className={`cursor-pointer ${menu === 0 && 'font-bold'}`}
                        onClick={() => setMenu(0)}>Recomandări</div>
                    <div className={`cursor-pointer ${menu === 1 && 'font-bold'}`}
                        onClick={() => setMenu(1)}>Afacere</div>
                    <div className={`cursor-pointer ${menu === 2 && 'font-bold'}`}
                        onClick={() => setMenu(2)}>Cont</div>
                </div>
                <div className="flex items-center justify-evenly md:hidden absolute bottom-0 w-45 gap-10 bg-white w-full fixed px-2 z-3">
                    <Link href="/campanii" className="cursor-pointer py-3  items-center flex flex-col  justify-center text-center gap-1 font-light flex-1"
                    >
                        <Image
                            src="/home.svg"
                            alt="Next.js logo"
                            width={15}
                            height={15}
                            priority />
                        <span className="text-xs text-wrap">Explorează</span>
                    </Link>
                    <div className="cursor-pointer py-3  items-center flex flex-col  justify-center text-center gap-1 font-light  flex-1"
                        onClick={() => setMenu(1)}>
                        <Image
                            src="/megafone.svg"
                            alt="Next.js logo"
                            width={15}
                            height={15}
                            priority />
                        <span className={`text-xs text-wrap ${menu === 1 && 'font-bold'}`}>Afacere</span>
                    </div>
                    <div className="cursor-pointer py-3  items-center flex flex-col  justify-center text-center gap-1 font-light flex-1"
                        onClick={() => setMenu(0)}>
                        <Image
                            src="/work-case.svg"
                            alt="Next.js logo"
                            width={15}
                            height={15}
                            priority />
                        <span className={`text-xs text-wrap ${menu === 0 && 'font-bold'}`}>Recomandări</span>
                    </div>
                    <div className="cursor-pointer py-3  items-center flex flex-col  justify-center text-center gap-1 font-light  flex-1"
                        onClick={() => setMenu(2)}>
                        <Image
                            src="/settings.svg"
                            alt="Next.js logo"
                            width={15}
                            height={15}
                            priority />
                        <span className={`text-xs text-wrap ${menu === 2 && 'font-bold'}`}>Cont</span>
                    </div>
                </div>
                

            </div>
        </>
    )
}