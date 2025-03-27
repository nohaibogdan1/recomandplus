import { useState } from "react";
import { BusinessOwnerRes } from '@/types/serverResponse';
import RewardValidation from '@/components/RewardValidation';
import CreateCampaignForm from '@/components/CreateCampaignForm';
import Problem from "@/components/Problem";
import Image from "next/image";
import BusinessForm from "@/components/BusinessForm";

export default function Business({ business, refetch, error }: { business?: BusinessOwnerRes, refetch: () => void, error: boolean }) {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showUpdateBusiness, setShowUpdateBusiness] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  function createdCampaignHandler() {
    setShowCreateCampaign(false);
    fetchBusiness();
  }

  const dateFormat = new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {error && <Problem />}
      {!error &&
        <>
          {!business && <button onClick={() => setShowUpdateBusiness(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Adauga afacerea</button>}
          {business && !showBusiness && <button onClick={() => setShowBusiness(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Vezi afacerea</button>}

          {business && showBusiness &&
            <>
              <div className='flex gap-5'>
                {!showUpdateBusiness && <button onClick={() => setShowUpdateBusiness(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Modifica</button>}
                <button onClick={() => { setShowBusiness(false); setShowUpdateBusiness(false) }} className="cursor-pointer w-7 rounded-md bg-gray-100 text-sm font-bold py-2">X</button>
              </div>

              <div className='flex flex-col gap-5'>
                <span className="text-md font-bold">{business.name}</span>
                <Image
                  src={business.photo}
                  alt="Next.js logo"
                  width={100}
                  height={100}
                  priority
                />
                <span>{business.location}</span>
                <a href={business.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3"
                >
                  <Image
                    src="/gmaps.svg"
                    alt="Next.js logo"
                    width={20}
                    height={20}
                    priority
                  />
                  Deschide in Google Maps
                </a>
                {business.county && <span>Judetul: {business.county}</span>}
                <span>{business.isOnline ? "Este afacere online" : "Nu este afacere online"}</span>
                <span>Tel: {business.phone}</span>
                <div className='flex gap-6'>
                  {business.facebook && <a href={business.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/facebooksquared.svg"
                      alt="Next.js logo"
                      width={20}
                      height={20}
                      priority
                    /></a>
                  }
                  {business.instagram && < a href={business.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/instagram.svg"
                      alt="Next.js logo"
                      width={20}
                      height={20}
                      priority
                    /></a>
                  }

                  {business.tiktok && < a href={business.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/tiktok.svg"
                      alt="Next.js logo"
                      width={20}
                      height={20}
                      priority
                    /></a>
                  }
                </div>

              </div>
            </>
          }

          {showUpdateBusiness &&
            <BusinessForm
              close={() => setShowUpdateBusiness(false)}
              updated={() => {
                setShowUpdateBusiness(false);
                refetch();
              }}
              {...(business && { initialData: business })}
            />}

          {business && <>

            <div className='font-bold'>Campania mea</div>
            {!business.campaign && <>
              <button onClick={() => setShowCreateCampaign(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Creaza campanie</button>
              {showCreateCampaign && <CreateCampaignForm created={createdCampaignHandler} />}
            </>
            }

            {business.campaign &&
              <>
                <RewardValidation />

                <div className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
                  <div className="flex flex-col p-5 gap-2">
                    <a className="text-sm text-blue-600" href={`http://localhost:3000/campanii/${encodeURIComponent(business.name)}`}>Link catre pagina campaniei tale</a>
                    <span className="text-gray-600 font-bold">{dateFormat.format(new Date(business.campaign.startAt))} - {dateFormat.format(new Date(business.campaign.endAt))}</span>
                    <span className="text-sm font-bold">Recompensa</span>
                    <span className="text-sm">{business.campaign.reward}</span>
                  </div>
                </div>
              </>
            }
          </>
          }
        </>
      }

    </div>
  )
}
