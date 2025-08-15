import { CampaignsRes } from "@/types/serverResponse";
import Header from "@/components/Header";
import BusinessesContainer from "@/components/BusinessesContainer";

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const { counties, p, online, categories } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/campanii?counties=${
      counties || ""
    }&online=${online || ""}&p=${p || ""}`,
    {
      cache: "no-store",
    }
  );

  const data: CampaignsRes = await res.json();
  let error = false;

  if (!res.ok) {
    error = true;
  }

  return (
    <>
      <Header />
      <BusinessesContainer
        params={{ counties, p, online, categories }}
        data={data}
        error={error}
      />
    </>
  );
}
