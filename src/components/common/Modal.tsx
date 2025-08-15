import Image from "next/image";
import { PropsWithChildren, SyntheticEvent, useEffect } from "react";

function ModalContainer({
  children,
  close,
  title,
}: PropsWithChildren<{ close: () => void; title: string }>) {
  return (
    <div
      onClick={() => close()}
      className="fixed w-full  h-full z-3 top-0 left-0 bottom-0 right-0 bg-black/60 flex justify-center items-center"
    >
      <div
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
        }}
        className="box-content bg-white w-full h-full xs:w-120 xs:max-h-120 h-full flex flex-col  p-5 xs:rounded relative"
      >
        <div className="flex h-[10%] items-center justify-center">
          <h2 className="text-2xl font-bold text-center">{title}</h2>
        </div>
        <button
          className="cursor-pointer absolute right-0 bottom-30 z-2"
          onClick={() => close()}
        >
          <Image
            src="/close.svg"
            alt="Next.js logo"
            width={30}
            height={30}
            priority
            className="w-[30px] h-[30px]"
          />
        </button>
        {children}
      </div>
    </div>
  );
}

function Modal({
  children,
  title,
  setIsOpen,
}: PropsWithChildren<{ title: string; setIsOpen: (open: boolean) => void }>) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <ModalContainer close={() => setIsOpen(false)} title={title}>
        {children}
      </ModalContainer>
    </>
  );
}

export default Modal;
