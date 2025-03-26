import React, { ChangeEvent, FormEvent, useState } from 'react';

type CampaignData = {
  months: number,
  reward: string,
}

export default function CreateCampaignForm(props: { created: () => void }) {
  const [formData, setFormData] = useState<CampaignData>({
    months: 2,
    reward: ''
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/campanii', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        props.created();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Oops! A aparut o problema!");
    } finally {
      setLoading(false);
    }
  };

  const dateFormat = new Intl.DateTimeFormat("ro-RO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Bucharest",
  });

  let endAt = new Date();

  return (
    <div className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className='mb-4 font-bold'>Incepe o noua campanie de promovare pentru a atrage mai multe clienti</div>
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label htmlFor="months" className="block text-sm font-medium text-gray-700">
              Selectează numarul de zile
            </label>
            <select
              id="months"
              name="months"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.months}
              onChange={handleChange}
            >
              <option value={1}>30 zile</option>
              <option value={2}>60 zile</option>
            </select>
          </div>

          <div className='mb-2 text-sm'>{dateFormat.format(new Date())} - {dateFormat.format(endAt.setDate(endAt.getDate() + formData.months * 30))}</div>

          <div className="mb-4">
            <label htmlFor="reward" className="block text-sm font-medium text-gray-700">
              Recompensa
            </label>
            <textarea
              id="reward"
              name="reward"
              value={formData.reward}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introdu recompensa"
            />
          </div>
          {error && <div className='text-red-500'>{error}</div>}
          {!loading && <button className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Porneste campania</button>}
        </form>
      </div>
    </div>
  );
};
