'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import useUser from '@/hooks/useUser';
import { createClient } from "@/utils/supabase/client";

const counties = ["Alba",
  "Arad",
  "Argeş",
  "Bacău",
  "Bihor",
  "Bistriţa - Năsăud",
  "Botoşani",
  "Braşov",
  "Brăila",
  "Buzău",
  "Caraş - Severin",
  "Călăraşi",
  "Cluj",
  "Constanţa",
  "Covasna",
  "Dâmboviţa",
  "Dolj",
  "Galaţi",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomiţa",
  "Iaşi",
  "Ilfov",
  "Maramureş",
  "Mehedinţi",
  "Mureş",
  "Neamţ",
  "Olt",
  "Prahova",
  "Satu Mare",
  "Sălaj",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timiş",
  "Tulcea",
  "Vaslui",
  "Vâlcea",
  "Vrancea",
  "Bucuresti"
];

interface BusinessFormProps {
  initialData?: BusinessData;
  updated: () => void;
  close: () => void;
}

interface BusinessData {
  id: string | null;
  businessName: string;
  photo: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  googleMaps: string;
  address: string;
  phone: string;
  county?: string;
  isOnline: boolean;
}

export default function BusinessForm({ initialData, updated, close }: BusinessFormProps) {
  const [formData, setFormData] = useState<BusinessData>(
    initialData || {
      id: null,
      businessName: '',
      photo: '',
      facebook: '',
      instagram: '',
      tiktok: '',
      googleMaps: '',
      address: '',
      phone: '',
      isOnline: false,
    }
  );

  const [photo, setPhoto] = useState<string>('');

  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<string>(initialData?.photo || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);

    setLoading(true);

    try {
      const response = await fetch('/api/afaceri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("respon", response)

      if (response.ok) {
        console.log("eee", result);

        /*

        const newBlob = await upload(`picture-business-${user!.id}`, formData.photo, {
          access: 'public',
          handleUploadUrl: '/api/afaceri/upload',
          clientPayload: JSON.stringify({ userId: user!.id, businessId: result.id })
        });

        // tempo
        const supabase = createClient();
        const { error } = await supabase.from("businesses").update({
          photo: newBlob.url
         }).eq('business_id', result.id);
        // console.log("errr", error);

*/
        console.log('Business saved successfully:', result);
        updated();
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Numele afacerii</label>
          <input name="businessName" value={formData.businessName} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block font-medium">Fotografie</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full p-2 border rounded" />
          {preview && <Image src={preview} alt="Preview" width={100} height={100} className="mt-2 rounded" />}
        </div>

        <div>
          <label className="block font-medium">Link catre pagina de facebook</label>
          <input name="facebook" value={formData.facebook} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Link catre pagina de instagram</label>
          <input name="instagram" value={formData.instagram} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Link catre contul de tiktok</label>
          <input name="tiktok" value={formData.tiktok} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Link catre locatie google maps</label>
          <input name="googleMaps" value={formData.googleMaps} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Adresa</label>
          <input name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label htmlFor="selectCounty" className="block text-sm font-medium text-gray-700">
            Selectează judetul <br />
            In cazul in care afacerea este online nu este necesar
          </label>
          <select
            id="selectCounty"
            name="county"
            onChange={handleChange}
            value={formData.county}
            defaultValue={undefined}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option key={"fara judet"} value={""}>Fara Judet</option>
            {counties.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <input
            type="checkbox"
            id="isOnline"
            name="isOnline"
            checked={formData.isOnline}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.checked })}
            className="w-5 h-5"
          />
          <label htmlFor="isOnline" className="text-sm">
            Este afacere online
          </label>
        </div>

        <div>
          <label className="block font-medium">Telefon</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className='flex gap-5 flex-wrap justify-center'>
          <button onClick={close} className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">
            Inchide
          </button>

          <button type="submit" className="cursor-pointer w-50 rounded-md bg-gray-100 text-sm font-bold py-2">
            Salveaza {loading && <span>....</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
