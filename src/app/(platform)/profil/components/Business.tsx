import { useState } from "react";
import { BusinessOwnerRes } from '@/types/serverResponse';
import RewardValidation from '@/components/RewardValidation';
import CreateCampaignForm from '@/components/CreateCampaignForm';
import Problem from "@/components/Problem";
import Image from "next/image";
import BusinessForm from "@/components/BusinessForm";
import ProfileCurrentCampaign from "@/components/ProfileCurrentCampaign";
import Button from "@/components/common/Button";

export default function Business({ businessData, refetch, error }: { businessData?: BusinessOwnerRes, refetch: () => void, error: boolean }) {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showUpdateBusiness, setShowUpdateBusiness] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);

  const business = businessData?.business;
  const validBusinessOwner = businessData?.validBusinessOwner;

  function createdCampaignHandler() {
    setShowCreateCampaign(false);
    refetch();
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      {!validBusinessOwner && <div>Contactează-ne la adresa de email client@recomandplus.ro sau la tel 0755378352 pentru a îți înscrie afacerea</div>}
      {error && <Problem />}
      {!error && validBusinessOwner &&
        <>
          {!business && <Button onClick={() => setShowUpdateBusiness(true)} text="Adaugă afacerea" />}
          {business && !showBusiness && <Button onClick={() => setShowBusiness(true)} text="Vezi afacerea" />}

          {business && showBusiness &&
            <>
              <div className='flex w-full max-w-[300] justify-end'>
                <button className="cursor-pointer"
                  onClick={() => {
                    setShowBusiness(false);
                    setShowUpdateBusiness(false)
                  }}>
                  <Image
                    src="/close.svg"
                    alt="Next.js logo"
                    width={20}
                    height={20}
                    priority
                  />
                </button>
              </div>

              <div className='flex flex-col gap-7'>
                <div className="flex flex-col gap-2">
                  <span className="text-md font-medium">{business.name}</span>
                  <Image
                    src={business.photo}
                    alt="Next.js logo"
                    width={150}
                    height={100}
                    priority
                  />
                  <span>Telefon: {business.phone}</span>
                  <span>{business.isOnline ? "Este afacere online" : "Nu este afacere online"}</span>
                </div>


                <div className='flex gap-6'>
                  <h4 className="font-medium">Social media</h4>
                  {business.website &&
                    <a href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/globe.svg"
                        alt="Next.js logo"
                        width={20}
                        height={20}
                        priority
                      /></a>
                  }
                  {business.facebook &&
                    <a href={business.facebook}
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
                  {business.instagram &&
                    < a href={business.instagram}
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

                  {business.tiktok &&
                    < a href={business.tiktok}
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
                  {business.youtube &&
                    < a href={business.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/youtube.svg"
                        alt="Next.js logo"
                        width={20}
                        height={20}
                        priority
                      /></a>
                  }
                </div>



                <div>
                  <h4 className="font-medium">Locații fizice</h4>
                  <div className="flex flex-col gap-5">
                    {business.addresses.map(a =>
                      <div key={a.location} className="flex flex-col gap-2 rounded-lg border border-3 border-gray-100 p-5">
                        <span>Telefon: {a.phone}</span>
                        <span>Județul: {a.county}</span>
                        <span>Adresa: {a.location}</span>
                        {a.maps &&
                          <a href={a.maps}
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
                        }
                      </div>
                    )}
                  </div>
                </div>

                {!showUpdateBusiness && <Button onClick={() => { setShowUpdateBusiness(true); }} text="Modifică" />}
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
            {!business.campaign && <>
              <Button onClick={() => setShowCreateCampaign(true)} text="Creează campanie" />
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
