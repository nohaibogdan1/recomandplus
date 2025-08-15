import { PropsWithChildren, createContext, useState } from "react";
import React from "react";
import { CampaignsRes } from "./types/serverResponse";
import { Params } from "./components/BusinessPagination";
import { useRouter } from "next/navigation";

type BusinessesStore = {
  data: CampaignsRes;
  params: Params;
  error: boolean;
  refetchData: (query: string) => void;
  loading: boolean;
};

const defaults = {
  data: { campaigns: [], pagination: { hasNextPage: false } },
  params: { categories: "", counties: "", online: "", p: "" },
  error: false,
  loading: false,
  refetchData: () => {},
};

export const BusinessesContext = createContext<BusinessesStore>(defaults);

export function BusinessesProvider({
  data: currentData,
  params: currentParams,
  error: currentError,
  children,
}: PropsWithChildren<Partial<BusinessesStore>>) {

  const [data, setData] = useState(currentData || defaults.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(currentError || defaults.error);

  const router = useRouter();

  const refetchData = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/campanii${query}`,
        {
          cache: "no-store",
        }
      );

      const data: CampaignsRes = await res.json();

      if (!res.ok) {
        setError(true);
      } else {
        setData(data);
        router.push(query, { scroll: false });
      }
    } catch {}

    setLoading(false);
  };

  return (
    <BusinessesContext
      value={{
        data,
        refetchData,
        error,
        params: {
          ...defaults.params,
          ...(typeof currentParams?.categories !== "undefined" && {
            categories: currentParams?.categories,
          }),
          ...(typeof currentParams?.counties !== "undefined" && {
            counties: currentParams?.counties,
          }),
          ...(typeof currentParams?.p !== "undefined" && {
            p: currentParams?.p,
          }),
          ...(typeof currentParams?.online !== "undefined" && {
            online: currentParams?.online,
          }),
        },
        loading,
      }}
    >
      {children}
    </BusinessesContext>
  );
}
