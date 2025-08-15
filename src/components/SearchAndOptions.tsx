"use client";
import Image from "next/image";
import Modal from "./common/Modal";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import LoadingIcon from "./icons/LoadingIcon";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import Checkbox from "./common/Checkbox";
import RefreshIcon from "./icons/RefreshIcon";
import { counties } from "@/consts";
import Toggle from "./common/Toggle";
import { BusinessesContext } from "@/BusinessesProvider";

const MARGIN = 20;

function SearchModal({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<number[]>([]);
  const [val, setVal] = useState("");

  useEffect(() => {
    if (!val) {
      setLoading(false);
      return;
    }

    setLoading(true);

    async function search() {
      try {
        // const res = await fetch("");

        // if (res.ok) {
        // const data = await res.json();
        setData(
          Array(30)
            .fill(1)
            .map((el, indx) => indx)
        );
        // }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    const timer = setTimeout(search, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [val]);

  return (
    <Modal title="Cautare" setIsOpen={setIsOpen}>
      <div className="flex flex-col h-[90%]">
        <div
          className={`flex rounded bg-gray-100 h-12 border border-2 border-gray-100 ${
            focused && "bg-white border-regal-orange"
          }`}
        >
          <div className="p-[10]">
            <Image
              src="/search.svg"
              alt="Next.js logo"
              width={25}
              height={25}
              priority
            />
          </div>

          <input
            value={val}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setVal(e.target.value);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onFocus={() => {
              setFocused(true);
            }}
            className="flex-1 focus:outline-none"
            placeholder="Magazine si servicii"
          />

          <div className="p-[10]">
            {loading && (
              <LoadingIcon className="animate-spin w-[25] h-[25] text-regal-orange" />
            )}
          </div>
        </div>

        {!!data.length && !loading && (
          <div
            style={{ marginTop: MARGIN }}
            className="flex flex-col overflow-auto"
          >
            {data.map((el, indx) => (
              <Link
                key={indx}
                href={"faf"}
                className={`pt-3 pb-3 border-t border-gray-200 ${
                  !indx && "border-none"
                }`}
              >
                <div className="">Click here {el}</div>
              </Link>
            ))}
          </div>
        )}

        {loading && (
          <div
            style={{ marginTop: MARGIN }}
            className="flex flex-col overflow-auto"
          >
            <Skeleton count={15} enableAnimation className="mt-3 mb-3" />
          </div>
        )}
      </div>
    </Modal>
  );
}

function OptionsModal({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const categories = Array(30)
    .fill(1)
    .map((el, indx) => "Cateogira" + indx);

  const { params } = useContext(BusinessesContext);

  const [options, setOptions] = useState<{
    categories: string[];
    online: boolean;
    counties: string[];
  }>({
    categories: (params.categories && params.categories.split(",")) || [],
    online: params.online === "true",
    counties: (params.online && params.counties.split(",")) || [],
  });

  const { refetchData } = useContext(BusinessesContext);

  const handleApply = () => {
    const query = `?categories=${options.categories.join(
      ","
    )}&counties=${options.counties.join(",")}&online=${
      options.online || ""
    }&p=""`;
    refetchData(query);
    setIsOpen(false);
  };

  const handleReset = () => {
    refetchData("?categories=&counties=&online=&p=");
    setIsOpen(false);
  };

  const handleCategorySelect = useCallback(
    (category: string) => {
      setOptions((options) => ({
        ...options,
        categories: options.categories.includes(category)
          ? options.categories.filter((categ) => categ !== category)
          : [...options.categories, category],
      }));
    },
    [setOptions]
  );

  const handleCountySelect = useCallback(
    (county: string) => {
      setOptions((options) => ({
        ...options,
        counties: options.counties.includes(county)
          ? options.counties.filter((co) => co !== county)
          : [...options.counties, county],
      }));
    },
    [setOptions]
  );

  const handleOnlineSelect = () => {
    setOptions((options) => ({
      ...options,
      online: !options.online,
    }));
  };

  return (
    <Modal title="Filtre" setIsOpen={setIsOpen}>
      <div className="flex flex-col h-[90%]">
        <div className="flex h-[85%] flex-col overflow-auto gap-10">
          <div>
            <div className="text-lg font-semibold">Categorii</div>

            {categories.map((category, indx) => (
              <Checkbox
                key={category}
                checked={options.categories.includes(category)}
                label={category}
                handleChange={handleCategorySelect}
                className={`border-t border-gray-200 ${!indx && "border-none"}`}
              />
            ))}
          </div>

          <div>
            <div className="text-lg font-semibold mb-3">
              Magazine si servicii pe internet
            </div>
            <Toggle
              checked={options.online}
              handleChange={handleOnlineSelect}
              label="Online"
            />
          </div>

          <div>
            <div className="text-lg font-semibold">Judete</div>

            {counties.map((county, indx) => (
              <Checkbox
                key={county}
                checked={options.counties.includes(county)}
                label={county}
                handleChange={handleCountySelect}
                className={`border-t border-gray-200 ${!indx && "border-none"}`}
              />
            ))}
          </div>
        </div>

        <div className="h-[70px] w-full flex gap-5 flex-row border-t border-gray-200 pt-2 mt-2">
          <button
            onClick={() => handleApply()}
            className="bg-regal-orange w-full rounded cursor-pointer  text-white font-bold text-lg"
          >
            Aplica
          </button>
          <button
            onClick={() => handleReset()}
            className="pl-[10] pr-[10] cursor-pointer "
          >
            <RefreshIcon className="text-regal-orange" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SelectedOptions() {
  const { params, refetchData } = useContext(BusinessesContext);

  const categories = params.categories.split(",");
  const counties = params.counties.split(",");
  const online = params.online === "true" ? "online" : "";

  const options = [...categories, ...counties, online].filter(
    (opt) => opt.trim().length
  );

  function handleRemove(option: string) {
    const query = `?categories=${categories
      .filter((categ) => categ !== option)
      .join(",")}&counties=${counties
      .filter((county) => county !== option)
      .join(",")}&online=${option === "online" ? "" : params.online}&p=""`;
    refetchData(query);
  }

  return (
    <div className="mt-3 flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleRemove(option)}
          className="border-[1.6px] border-gray-200 text-sm flex gap-1 bg-white pt-1 pb-1 pl-2 pr-2 rounded cursor-pointer"
        >
          {option}
          <Image
            src="/close-x.svg"
            alt="Next.js logo"
            width={15}
            height={15}
            priority
          />
        </button>
      ))}
    </div>
  );
}

export default function SearchAndOptions() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { params } = useContext(BusinessesContext);

  const optionsTotal =
    params.categories.split(",").filter(Boolean).length +
    params.counties.split(",").filter(Boolean).length +
    (params.online === "true" ? 1 : 0);

  return (
    <>
      <div className="md:max-w-[400] bg-white flex rounded bg-white h-12 w-full justify-between">
        <button
          onClick={() => {
            setIsSearchOpen(true);
          }}
          className="flex items-center flex-1"
        >
          <div className="p-[10]">
            <Image
              src="/search.svg"
              alt="Next.js logo"
              width={25}
              height={25}
              priority
            />
          </div>
          <div className="text-gray-600 font-medium">Magazine si servicii</div>
        </button>
        <button
          onClick={() => {
            setIsOptionsOpen(true);
          }}
          className="p-[10] relative"
        >
          {!!optionsTotal && (
            <div className="bg-regal-orange top-[5] right-[5] w-[20] h-[20] rounded-xl text-white text-sm font-bold absolute">
              {optionsTotal}
            </div>
          )}
          <Image
            src="/options.svg"
            alt="Next.js logo"
            width={27}
            height={27}
            priority
          />
        </button>
      </div>

      {isSearchOpen && <SearchModal setIsOpen={setIsSearchOpen} />}
      {isOptionsOpen && <OptionsModal setIsOpen={setIsOptionsOpen} />}

      <SelectedOptions />
    </>
  );
}
