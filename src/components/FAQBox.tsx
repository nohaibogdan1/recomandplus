"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function FAQBox(props: { q: string; ans: string }) {
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            className="w-full text-primary rounded-lg border border-solid border-border-separator p-4">
            <h3 onClick={toggleExpansion} className={`font-semibold mt-0 text-base md:text-lg transition-all duration-500 ease-in-out ${expanded ? "mb-2" : "mb-0"}`}>
                <div className="flex text-left content-between items-center w-full cursor-pointer gap-4">
                    <span>{props.q}</span>
                    <Image
                     className={`ml-auto transition-transform shrink-0 ${expanded ? " scale-y-[-1]" : ""} `}
                        src="/chevron.svg"
                        alt="Next.js logo"
                        width={20}
                        height={20}
                        priority
                    />
                </div>
            </h3>
            <div className={`transition-all overflow-hidden duration-500 ease-in-out`}
                style={{
                    height: expanded ? `${contentRef.current?.scrollHeight || 0}px` : "0px",
                }}>
                <div ref={contentRef} className="mt-0 text-base leading-6 font-normal mb-0 text-text-secondary">{props.ans}</div>
            </div>
        </div>
    )
}
