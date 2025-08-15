"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { Params } from "./BusinessPagination";
import { counties } from "@/consts";
import Checkbox from "./common/Checkbox";
import Toggle from "./common/Toggle";

export default function BusinessFilters({ params }: { params: Params }) {
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => {
    setShowFilter(true);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShowFilter}
        className="bg-white py-3 px-10 rounded-3xl font-medium cursor-pointer text-neutral-800"
      >
        Schimbă locația
      </button>
      {showFilter && (
        <Filters params={params} close={() => setShowFilter(false)} />
      )}
    </div>
  );
}

function Filters({ close, params }: { close: () => void; params: Params }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    params.counties?.split(",") || []
  );
  const [online, setOnline] = useState(params.online === "true");
  const router = useRouter();

  const handleClick = () => {
    const query = `?counties=${selectedOptions.join(",")}&online=${
      online || ""
    }&p=${params.p || ""}`;
    router.push(query, { scroll: false });
    close();
  };

  const handleCheckboxChange = useCallback(
    (option: string) => {
      setSelectedOptions((prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item !== option)
          : [...prevSelected, option]
      );
    },
    [setSelectedOptions]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [close]);

  return (
    <div
      ref={modalRef}
      className={`transition-all duration-300 absolute bg-white h-100 w-70 px-3 py-6 pb-1 rounded-md flex flex-col gap-3 opacity-100 scale-100 translate-y-0`}
    >
      <div className="flex flex-col space-y-3 h-5/6">
        <Toggle
          checked={online}
          handleChange={() => setOnline(!online)}
          label="Online"
        />
        <div className="border border-gray-200"></div>
        <div className="flex flex-col overflow-scroll h-5/6">
          {counties.map((option, indx) => (
            <Checkbox
              key={option}
              checked={selectedOptions.includes(option)}
              label={option}
              handleChange={handleCheckboxChange}
              className={`border-t border-gray-200 ${!indx && "border-none"}`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleClick}
        className="font-medium text-sm text-center cursor-pointer py-3"
      >
        CAUTĂ
      </button>
    </div>
  );
}
