import { useEffect, useState } from "react";

export default function CampaignStatistics({ id }: { id: string }) {
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState<{ x: number, y: number, date: string }[]>([{
    x: 2,
    y: 100,
    date: new Date().toString()
  },
  {
    x: 2,
    y: 100,
    date: new Date().toString()
  },
  {
    x: 2,
    y: 100,
    date: new Date().toString()
  },
  {
    x: 2,
    y: 100,
    date: new Date().toString()
  },
  {
    x: 2,
    y: 100,
    date: new Date().toString()
  }]);
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
      const response = await fetch(`/api/afaceri-owner/campanie/${id}/statistici`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result: BusinessOwnerRes = await response.json();

      if (response.ok) {
        setBusiness(result);
      } else {
        if (response.status === 500) {
          setError(true);
        }
      }
    }

  }, [showStatistics]);

  return (
    <div>
      <button onClick={() => setShowStatistics(true)} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Vezi statisticile {loading ? "..." : ""}</button>
      {!!statistics.length &&
        <table className="mt-3 mb-3 w-80">
          <thead>
            <tr>
              <th className="text-center">Zi</th>
              <th className="text-center">Data</th>
              <th className="text-center">Vanzari</th>
              <th className="text-center">In progress</th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((s, i) => (
              <tr className={`${i % 2 ? "bg-blue-50" : ""} text-sm leading-[3]`} key={s.date}>
                <td className="text-center">{dateFormatDay.format(new Date(s.date))}</td>
                <td className="text-center">{dateFormat.format(new Date(s.date))}</td>
                <td className="text-center">{s.x}</td>
                <td className="text-center">{s.y}</td>
              </tr>
            )
            )}
          </tbody>
        </table>
      }
    </div>
  )
}