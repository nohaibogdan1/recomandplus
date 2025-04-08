import type { Metadata } from 'next';
import Reward from "@/components/Reward";
import { CampaignRes } from "@/types/serverResponse";
import Image from "next/image";
import getLeftDays from "../components/getLeftDays";
import Problem from "@/components/Problem";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campanii/${slug}`, {
    cache: "no-store",
  });

  const data: CampaignRes = await res.json();

  if (!res.ok) {
    return {};
  }

  const text = `${data.business.name} - ${data.reward.join(" . ")} - recomandplus.ro`;

  return {
    title: text,
    description: `Recomandă ${data.business.name} și te bucuri de recompense`,
    openGraph: {
      title: text,
      description: `Recomandă ${data.business.name} și te bucuri de recompense`,
      url: `${process.env.NEXT_PUBLIC_API_URL}/campanii/${slug}`,
      images: [data.business.photo],
      type: "website",
    },
    twitter: {
      title: text,
      description: `Recomandă ${data.business.name} și te bucuri de recompense`,
      images: [data.business.photo],
    }
  }
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campanii/${slug}`, {
    cache: "no-store",
  });

  const data: CampaignRes = await res.json();

  if (!res.ok) {
    return <Problem />
  }

  return (
    <div className='mb-30'>
      <Image
        className="object-cover h-50 md:max-w-2xl md:rounded-xl md:mt-5 md:mx-auto md:h-60"
        src={data.business.photo}
        alt="Next.js logo"
        width={1000}
        height={1000}
        priority
      />

      <div className="md:max-w-2xl md:mx-auto">
        <div className="w-full bg-white rounded-t-3xl relative -top-5 md:top-0 px-5 md:px-0 pt-5 md:h-auto ">
          <div className="text-2xl text-center">{data.business.name}</div>

          <div className="flex gap-2 mt-2 font-medium">
            <Image
              src="/clock.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
            />
            <span>{getLeftDays(data.endAt)}</span>
          </div>
          <div className="mt-10 p-5 shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] rounded-md">
            <ul className="mt-1 flex flex-col gap-1">
              {data.reward.map(o => <li key={o}>{o}</li>)}
            </ul>
          </div>

          <div className='flex gap-6 mt-10 mb-10'>
            {data.business.website && <a href={data.business.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/globe.svg"
                alt="Next.js logo"
                width={25}
                height={25}
                priority
              /></a>
            }
            {data.business.facebook && <a href={data.business.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebooksquared.svg"
                alt="Next.js logo"
                width={25}
                height={25}
                priority
              /></a>
            }
            {data.business.instagram && < a href={data.business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram.svg"
                alt="Next.js logo"
                width={25}
                height={25}
                priority
              /></a>
            }

            {data.business.tiktok && < a href={data.business.tiktok}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/tiktok.svg"
                alt="Next.js logo"
                width={25}
                height={25}
                priority
              /></a>
            }

            {data.business.youtube && < a href={data.business.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/youtube.svg"
                alt="Next.js logo"
                width={25}
                height={25}
                priority
              /></a>
            }
          </div>

          <Reward slug={slug} />

          <div className="font-medium mt-15 flex gap-2 text-text-secondary">
            <Image
              src="/phone-color.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
            />Telefon: {data.business.phone}</div>

          {!!data.business.addresses.length &&
            <div className="flex flex-col gap-5 mt-4 text-text-secondary">
              <h3 className="font-medium">Locații</h3>
              {data.business.addresses.map(a => (
                <div key={a.location} className="flex flex-col gap-2">
                  <span>Județul {a.county}</span>
                  <span>{a.location}</span>
                  {a.maps &&
                    <a href={a.maps} className="flex gap-2">
                      <Image
                        src="/gmaps.svg"
                        alt="Next.js logo"
                        width={20}
                        height={20}
                        priority
                      />
                      <div className="">Deschide in google maps</div>
                    </a>
                  }
                  <div className="flex gap-2"><Image
                    src="/phone-color.svg"
                    alt="Next.js logo"
                    width={20}
                    height={20}
                    priority
                  />Telefon: {a.phone}</div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
};
