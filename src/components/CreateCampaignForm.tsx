import React, { useState } from 'react';

export default function CreateCampaignForm() {
  return (
    <div className="rounded-md shadow-[0px_4px_25px_9px_rgba(0,0,0,0.08)] w-full">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className='mb-4 font-bold'>Incepe o noua campanie de promovare pentru a atrage mai multe clienti</div>
        <form>
          <div className="mb-4">
            <label htmlFor="select" className="block text-sm font-medium text-gray-700">
              Selectează numarul de luni
            </label>
            <select
              id="select"
              name="select"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={2}
            >
              <option value="1">o luna</option>
              <option value="2">doua luni</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="recompensa" className="block text-sm font-medium text-gray-700">
              Recompensa
            </label>
            <textarea
              id="recompensa"
              name="recompensa"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introdu recompensa"
            />
          </div>
            <div className='text-sm font-medium text-gray-700 mb-4'>Mai multe recompense atrag mai mulți clienți – diversifică ofertele și crește loialitatea acestora.
                <br/> <br/>Recompensele optionale inlocuiesc pe rand recompensa principala
            </div>
          <div className="mb-4">
            <label htmlFor="recompensaOptional1" className="block text-sm font-medium text-gray-700">
              Recompensa opțională 1
            </label>
            <textarea
              id="recompensaOptional1"
              name="recompensaOptional1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introdu recompensa opțională 1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="recompensaOptional2" className="block text-sm font-medium text-gray-700">
              Recompensa opțională 2
            </label>
            <textarea
              id="recompensaOptional2"
              name="recompensaOptional2"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introdu recompensa opțională 2"
            />
          </div>
          <button className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">Porneste campania</button>

        </form>
      </div>
    </div>
  );
};
