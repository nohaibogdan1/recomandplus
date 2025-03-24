
"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { Params } from "./BusinessPagination";

const countiesData = ["Alba",
    "Arad",
    "Argeş",
    "Bacău",
    "Bihor",
    "Bistriţa - Năsăud",
    "Botoşani",
    "Braşov",
    "Brăila",
    "Buzău",
    "Caraş - Severin",
    "Călăraşi",
    "Cluj",
    "Constanţa",
    "Covasna",
    "Dâmboviţa",
    "Dolj",
    "Galaţi",
    "Giurgiu",
    "Gorj",
    "Harghita",
    "Hunedoara",
    "Ialomiţa",
    "Iaşi",
    "Ilfov",
    "Maramureş",
    "Mehedinţi",
    "Mureş",
    "Neamţ",
    "Olt",
    "Prahova",
    "Satu Mare",
    "Sălaj",
    "Sibiu",
    "Suceava",
    "Teleorman",
    "Timiş",
    "Tulcea",
    "Vaslui",
    "Vâlcea",
    "Vrancea",
    "Bucuresti"
];


export default function BusinessFilters({ params }: { params: Params }) {
    const [showFilter, setShowFilter] = useState(false);

    const handleShowFilter = () => {
        setShowFilter(true);
    }

    return (
        <div className="relative">
            <button onClick={handleShowFilter} className="bg-white py-3 px-10 rounded-3xl font-bold cursor-pointer">Schimba locatia</button>
            <Filters params={params} showFilter={showFilter} close={() => setShowFilter(false)} />
        </div>
    )
}

function Filters({ showFilter, close, params }: { showFilter: boolean, close: () => void, params: Params }) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(params.counties?.split(",") || []);
    const [online, setOnline] = useState(params.online === "true" ? true : false);
    const router = useRouter();

    const handleClick = () => {
        const query = `?counties=${selectedOptions.join(",")}&online=${online || ""}&p=${params.p || ""}`;
        router.push(query, { scroll: false });
        close();
    };

    const handleCheckboxChange = (option: string) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.includes(option)
                ? prevSelected.filter((item) => item !== option)
                : [...prevSelected, option]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                close();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [close]);

    if (!showFilter) {
        return null;
    }
    return (
        <div ref={modalRef} className="absolute bg-white h-100 w-70 px-6 py-6 pb-1 rounded-md flex flex-col gap-3">
            <div className="flex flex-col space-y-2 overflow-scroll h-5/6">
                <label key={"online"} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={online}
                        onChange={() => setOnline(!online)}
                        className="w-5 h-5"
                    />
                    <span>Online</span>
                </label>
                <div className="border border-gray-200"></div>
                {countiesData.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                            className="w-5 h-5"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
            <button onClick={handleClick} className="font-bold text-sm text-center cursor-pointer py-3">CAUTA</button>
        </div>
    )
}
