import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import Problem from './Problem';
import RewardsForm from './RewardsForm';

type CampaignData = {
  months: number,
}



export default function CreateCampaignForm(props: { created: () => void }) {
  const [months, setMonths] = useState(1);
  const [addedRewards, setAddedRewards] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState(false);
  const [missingParam, setMissingParam] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addedRewards.length) {
      return;
    }
    setLoading(true);
    setError(false);
    setMissingParam(false);

    const response = await fetch('/api/campanii', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        months,
        rewards: addedRewards,
      }),
    });

    if (response.ok) {
      props.created();
    } else {
      if (response.status === 500) {
        setError(true);
      }
      if (response.status === 400) {
        setMissingParam(true);
      }
      setTimeout(() => { setError(false); setMissingParam(false) }, 2000);
    }
    setLoading(false);
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
              value={months}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => { setMonths(Number(e.target.value)) }}
            >
              <option value={1}>30 zile</option>
              <option value={2}>60 zile</option>
              <option value={3}>90 zile</option>
              <option value={4}>120 zile</option>
              <option value={5}>150 zile</option>
            </select>
          </div>

          <div className='mb-2 text-sm'>{dateFormat.format(new Date())} - {dateFormat.format(endAt.setDate(endAt.getDate() + months * 30))}</div>

          <div className="mb-4">
            <RewardsForm addedRewards={addedRewards} setAddedRewards={setAddedRewards} />
          </div>

          {!!addedRewards.length &&
            <div className="flex align-center gap-3 mb-3">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={agreed}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)}
                className="w-5 h-5"
              />
              <label htmlFor="agree">
                Sunt de acord cu campania
              </label>
            </div>
          }
          {error && <Problem />}
          {missingParam && <span>Lipsesc parametri</span>}
          {!loading && agreed && <button className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Porneste campania</button>}
        </form>
      </div>
    </div>
  );
};
