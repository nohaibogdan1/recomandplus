"use client";

import { CampaignsRes } from "@/types/serverResponse";
import BusinessPagination, { Params } from "./BusinessPagination";
import Empty from "./Empty";
import Problem from "./Problem";
import SearchAndOptions from "./SearchAndOptions";
import getLeftDays from "@/app/(platform)/campanii/components/getLeftDays";
import Image from "next/image";
import { useContext } from "react";
import { BusinessesContext, BusinessesProvider } from "@/BusinessesProvider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function CampaignBox(props: {
  image: string;
  name: string;
  rewards: string[];
  endAt: string;
}) {
  return (
    <a
      href={`/campanii/${encodeURIComponent(props.name)}`}
      className="p-3 bg-white rounded-md  hover:shadow-2xl cursor-pointer h-[280] lg:h-[333] flex flex-col"
    >
      <Image
        className="rounded-md object-cover h-34 lg:h-45"
        src={props.image}
        alt="Next.js logo"
        width={1000}
        height={1000}
        priority
      />
      <div className="mt-2 text-lg font-semibold line-clamp-1">
        {props.name}
      </div>

      <div className="flex-1">
        <span className="mt-1 line-clamp-2">{props.rewards[0]}</span>
      </div>

      <div className="flex gap-2 mt-2 text-sm font-medium">
        <Image
          src="/clock.svg"
          alt="Next.js logo"
          width={20}
          height={20}
          priority
        />
        <span>{getLeftDays(props.endAt)}</span>
      </div>
    </a>
  );
}

function BusinessesWrapper() {
  const { data, error, loading } = useContext(BusinessesContext);

  return (
    <SkeletonTheme baseColor="white">
      <div className="flex flex-col gap-3 bg-neutral-100 pt-5 px-4 min-h-[80vh]">
        <div className="w-full max-w-5xl lg:mx-auto">
          {loading ? (
            <Skeleton className="md:max-w-[400] h-12 w-full" />
          ) : (
            <SearchAndOptions />
          )}
        </div>

        {error && <Problem />}
        {!error && (
          <div className="grid grid-cols-(--grid-fit-full) sm:grid-cols-(--grid-fit) py-2  w-full max-w-5xl mx-auto gap-4 justify-center ">
            {loading ? (
              <>
                {Array(3)
                  .fill(1)
                  .map((el, indx) => (
                    <Skeleton
                      key={indx}
                      className="p-3 bg-white rounded-md  hover:shadow-2xl cursor-pointer h-[280] lg:h-[333] flex flex-col"
                    />
                  ))}
              </>
            ) : (
              data.campaigns.map((c) => (
                <CampaignBox
                  key={c.id}
                  image={c.business.photo}
                  name={c.business.name}
                  rewards={c.rewards}
                  endAt={c.endAt}
                />
              ))
            )}
          </div>
        )}

        {!error && !data.campaigns.length && <Empty />}
        <div className="w-full md:max-w-5xl mx-auto">
          {!error && data.pagination.hasNextPage && (
            <BusinessPagination pagination={data.pagination} />
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default function BusinessesContainer({
  params,
  error,
  data,
}: {
  params: Params;
  error: boolean;
  data: CampaignsRes;
}) {
  return (
    <BusinessesProvider params={params} error={error} data={data}>
      <BusinessesWrapper />
    </BusinessesProvider>
  );
}
