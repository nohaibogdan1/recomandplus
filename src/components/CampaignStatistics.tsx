import { CampaignAnalyticsRes } from "@/types/serverResponse";
import { useEffect, useState } from "react";
import Problem from "./Problem";

export default function CampaignStatistics({ id }: { id: string }) {
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState<CampaignAnalyticsRes>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dateFormat = new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const dateFormatDay = new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Bucharest",
    weekday: "short",
  });

  useEffect(() => {
    async function fetchStatistics() {
      setLoading(true);
      const response = await fetch(`/api/afaceri-owner/campanii/${id}/statistici`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result: CampaignAnalyticsRes = await response.json();

      if (response.ok) {
        setStatistics(result);
      } else {
        if (response.status === 500) {
          setError(true);
          setTimeout(() => setError(false), 3000);
        }
      }
      setLoading(false);
    }

    if (showStatistics) {
      fetchStatistics();
    }

  }, [showStatistics]);

  return (
    <div>
      <button onClick={() => setShowStatistics(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Vezi statisticile {loading ? "..." : ""}</button>
      {loading && <span>Se Incarca</span>}
      {error && <Problem />}
      {!!statistics.length &&
        <div className="max-w-full max-h-96 overflow-auto">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="sticky left-0 p-2 z-20 bg-white text-center">Data</th>
                <th className=" p-2 text-center text-center bg-white">Vanzari</th>
                <th className=" p-2 text-center text-center bg-white">Recompense noi</th>
                <th className=" p-2 text-center text-center bg-white">Recomandatori</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((s, i) => (
                <tr className={`${i % 2 ? "bg-slate-50" : ""} text-sm leading-[3]`} key={s.createdAt}>
                  <td className={`sticky left-0 p-2 ${i % 2 ? "bg-slate-50" : "bg-white"} flex flex-nowrap justify-center`}><div>{dateFormatDay.format(new Date(s.createdAt))}</div> <div>{dateFormat.format(new Date(s.createdAt))}</div></td>
                  <td className=" p-2 text-center">{s.sales}</td>
                  <td className=" p-2 text-center">{s.rewards}</td>
                  <td className=" p-2 text-center">{s.advocates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }


    </div>
  )
}