import BusinessFilters from "@/components/BusinessFilters";
import BusinessPagination from "@/components/BusinessPagination";
import { CampaignsRes } from "@/types/serverResponse";
import Image from "next/image";
import Problem from "@/components/Problem";
import Empty from "@/components/Empty";
import getLeftDays from "./(platform)/campanii/components/getLeftDays";
import Header from "@/components/Header";

function CampaignBox(props: { image: string, name: string, rewards: string[], endAt: string }) {
  return (
    <a href={`/campanii/${encodeURIComponent(props.name)}`} className="p-3 bg-white rounded-md w-xs lg:w-[calc(33.333%-12px)] hover:shadow-2xl cursor-pointer h-[280] lg:h-[333] flex flex-col">
      <Image
        className="rounded-md object-cover h-34 lg:h-45"
        src={props.image}
        alt="Next.js logo"
        width={1000}
        height={1000}
        priority
      />
      <div className="mt-2 text-lg font-semibold line-clamp-1">{props.name}</div>

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
  )
};

export default async function CampaignsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams;
  const { counties, p, online } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campanii?counties=${counties || ""}&online=${online || ""}&p=${p || ""}`, {
    cache: "no-store",
  });

  const data: CampaignsRes = await res.json();
  let error = false;

  if (!res.ok) {
    error = true;
  }

  return (
    <>
      <Header/>

      <div className="flex flex-col gap-3 bg-neutral-100 pt-5 px-4 min-h-[80vh]">

        <div className="w-xs lg:w-full max-w-5xl mx-auto">
          <BusinessFilters params={{ counties, p, online }} />
        </div>

        {error && <Problem />}

        {!error &&
          <div className="flex py-2 gap-4 flex-wrap w-full max-w-5xl mx-auto justify-center md:justify-start">
            {data.campaigns.map(c =>
              <CampaignBox
                key={c.id}
                image={c.business.photo}
                name={c.business.name}
                rewards={c.rewards}
                endAt={c.endAt} />
            )}
          </div>}

        {!error && !data.campaigns.length && <Empty />}

        <div className="w-full md:max-w-5xl mx-auto">
          {!error && data.pagination.hasNextPage &&
            <BusinessPagination
              params={{ counties, p, online }}
              pagination={data.pagination}
            />
          }
        </div>
      </div>
    </>

  )
};

