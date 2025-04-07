import { CampaignsSitemapRes } from "@/types/serverResponse";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log("sitemap", process.env.NEXT_PUBLIC_API_URL);
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://www.recomandplus.ro";

  const res = await fetch(`${baseUrl}/api/campanii/sitemap`, {
    cache: "no-store",
  });
  let campaigns = (await res.json()) as CampaignsSitemapRes;
  if (!res.ok) {
    campaigns = [];
  }

  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/landing-advocate` },
    { url: `${baseUrl}/landing-business` },
    { url: `${baseUrl}/intrebari-frecvente` },
    { url: `${baseUrl}/politica-confidentialitate` },

    ...campaigns.map((c) => ({
      url: `${baseUrl}/campanii/${encodeURIComponent(c.businessName)}`
    })),
  ];
}
