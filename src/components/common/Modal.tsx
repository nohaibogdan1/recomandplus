import Image from "next/image";
import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react";

function ModalContainer({ children, close }: PropsWithChildren<{ close: () => void }>) {
    return (
        <div onClick={() => close()} className="fixed w-full h-full z-3 top-0 left-0 bottom-0 right-0 bg-black/60 flex justify-center items-center">
            <div onClick={(e: SyntheticEvent) => {e.preventDefault(); e.stopPropagation()}} className="bg-white w-full h-full xs:w-30 xs:h-30 flex flex-col  p-5 gap-6 ">
                <div className="flex">
                    <div className="flex-1"></div>
                    <h2 className="text-2xl font-bold text-center">Căutare</h2>
                    <div className='flex w-full max-w-[300] justify-end flex-1'>
                        <button className="cursor-pointer"
                            onClick={() => close()}>
                            <Image
                                src="/close.svg"
                                alt="Next.js logo"
                                width={20}
                                height={20}
                                priority
                            />
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default function Modal({ children }: PropsWithChildren<{}>) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <>
            <button className="bg-red-100" onClick={() => setIsOpen(true)}>Click here</button>
            {isOpen && <ModalContainer close={() => setIsOpen(false)}>{children}</ModalContainer>}
        </>
    )
}