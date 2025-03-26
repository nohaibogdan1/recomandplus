import Image from "next/image";

export default function Menu({ menu, setMenu }: { menu: number, setMenu: (o: number) => void }) {
    return (
        <>
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

            </div>
        </>
    )
}