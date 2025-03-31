import { useState } from "react";
import { BusinessOwnerRes } from '@/types/serverResponse';
import RewardValidation from '@/components/RewardValidation';
import CreateCampaignForm from '@/components/CreateCampaignForm';
import Problem from "@/components/Problem";
import Image from "next/image";
import BusinessForm from "@/components/BusinessForm";
import ProfileCurrentCampaign from "@/components/ProfileCurrentCampaign";
import Button from "@/components/common/Button";

export default function Business({ business, refetch, error }: { business?: BusinessOwnerRes, refetch: () => void, error: boolean }) {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showUpdateBusiness, setShowUpdateBusiness] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);

  function createdCampaignHandler() {
    setShowCreateCampaign(false);
    refetch();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {error && <Problem />}
      {!error &&
        <>
          {!business && <Button onClick={() => setShowUpdateBusiness(true)} text="Adauga afacerea"/>}
          {business && !showBusiness && <Button onClick={() => setShowBusiness(true)} text="Vezi afacerea"/>}

          {business && showBusiness &&
            <>
              <div className='flex gap-5'>
                {!showUpdateBusiness && <Button onClick={() => setShowUpdateBusiness(true)} text="Modifica"/>}
                <Button onClick={() => { setShowBusiness(false); setShowUpdateBusiness(false)}} text="X"/>
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
                window.scrollTo({ top: 0, behavior: "smooth" });
                setShowUpdateBusiness(false);
                refetch();
              }}
              {...(business && { initialData: business })}
            />}

          {business && <>

            <div className='font-bold'>Campania mea</div>
            {!business.campaign && <>
              <Button onClick={() => setShowCreateCampaign(true)} text="Creaza campanie"/>
              {showCreateCampaign && <CreateCampaignForm created={createdCampaignHandler} />}
            </>
            }

            {business.campaign &&
              <>
                <RewardValidation />
                <ProfileCurrentCampaign
                  businessName={business.name}
                  campaign={business.campaign}
                  refetch={refetch} />
              </>
            }
          </>
          }
        </>
      }

    </div>
  )
}
