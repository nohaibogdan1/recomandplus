
import { useState, ChangeEvent, FormEvent, SyntheticEvent, useEffect } from 'react';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import { BusinessData } from '@/types/serverResponse';
import Problem from './Problem';
import Button, { ButtonVariants } from './common/Button';
import { pinkAsterisk, textInput } from './common/classes';
import { counties } from '@/consts';
import useUser from '@/hooks/useUser';

type Address = BusinessData["addresses"][0];

function Addresses({
  addresses,
  setAddresses
}: {
  addresses: Address[],
  setAddresses: (addresses: Address[]) => void
}) {
  const [validationError, setValidationError] = useState(false);

  const [current, setCurrent] = useState<Address>({
    phone: "",
    location: "",
    county: counties[0],
    maps: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const add = (e: SyntheticEvent) => {
    e.preventDefault();
    setValidationError(false);
    if (!current.phone.trim() || !current.location.trim()) {
      setValidationError(true);
      return;
    }
    setAddresses([...addresses, current]);
    setCurrent({
      phone: "",
      location: "",
      county: counties[0],
      maps: ""
    });
  }

  const remove = (idx: number) => {
    setAddresses(addresses.filter((_, i) => i !== idx));
  }

  return (
    <>
      <div className='flex flex-col gap-5'>
        <span className='inline-block font-medium'>Locatii fizice</span>
        <div>
          <label className={`block font-medium ${pinkAsterisk}`}>Telefon</label>
          <div className='relative'>
            <Image
              src="/phone.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
            <input name="phone" value={current.phone} onChange={handleChange} className={`${textInput} pl-[40]`} />
          </div>
        </div>

        <div>
          <label htmlFor="selectCounty" className={`block font-medium ${pinkAsterisk}`}>
            Judet
          </label>
          <select
            id="selectCounty"
            name="county"
            onChange={handleChange}
            value={current.county}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-gray-400"
          >
            {counties.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className={`block font-medium ${pinkAsterisk}`}>Adresa</label>
          <input name="location" value={current.location} onChange={handleChange} className={textInput} />
        </div>

        <div>
          <label className="block font-medium">Locatie google maps (opțional)</label>

          <div className='relative'>
            <Image
              src="/pin.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
          </div>
          <input name="maps" value={current.maps} onChange={handleChange} className={`${textInput} pl-[40]`} />
        </div>
        <Button onClick={(e) => add(e)} type="submit" text='Adauga' />
        {validationError && <span className='text-red-500'>Campurile nu sunt completate</span>}
      </div>

      {addresses.map((a, index) => (
        <div key={a.location}>
          <button
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              remove(index);
            }
            }
            className="text-red-500 cursor-pointer text-sm mb-2"
          >
            Șterge
          </button>
          <div className=' flex flex-col gap-2 rounded-lg border border-3 border-gray-100 p-5'>
            <span>Telefon: {a.phone}</span>
            <span>Judet: {a.county}</span>
            <span>Adresa: {a.location}</span>
            <div>Google maps: {a.maps ?
              <a href={a.maps} target="_blank"
                rel="noopener noreferrer">Link</a> :
              "Fara"
            }</div>
          </div>
        </div>
      ))
      }
    </>
  )
}



interface BusinessFormProps {
  initialData?: BusinessData;
  updated: () => void;
  close: () => void;
}

export default function BusinessForm({ initialData, updated, close }: BusinessFormProps) {
  const [formData, setFormData] = useState<BusinessData>(
    initialData || {
      name: '',
      photo: '',
      facebook: '',
      instagram: '',
      tiktok: '',
      phone: '',
      isOnline: false,
      website: '',
      youtube: '',
      addresses: []
    }
  );

  const [addresses, setAddresses] = useState<Address[]>(initialData?.addresses || []);

  const [showAddressesForm, setShowAddressesForm] = useState(false);

  const [photo, setPhoto] = useState<File>();

  useEffect(() => { console.log("photo", photo) }, [photo])

  const [error, setError] = useState(false);

  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<string>(initialData?.photo || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setPhoto(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) { return; }

    setLoading(true);

    formData.addresses = addresses;

    try {
      const response = await fetch('/api/afaceri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (photo) {
          await upload(`picture-business-${user!.id}`, photo, {
            access: 'public',
            handleUploadUrl: '/api/afaceri/upload',
            contentType: photo.type
          });

          await (async function () {
            return new Promise((acc) => setTimeout(() => { acc(true) }, 1000));
          })();
        }

        updated();
      } else {
        if (response.status === 500) {
          setError(true);
          window.scrollTo({ top: 600, behavior: "smooth" });
          setTimeout(() => { setError(false) }, 3000);
        }
      }
    } catch {
      setError(true);
      window.scrollTo({ top: 600, behavior: "smooth" });
      setTimeout(() => { setError(false) }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={`text-pink-600 text-sm font-medium mb-4 ${pinkAsterisk}`}>Campuri necesare</div>
      <form onSubmit={handleSubmit} className="space-y-4 md:w-1/2 max-w-100">
        <div>
          <label className={`block font-medium ${pinkAsterisk}`}>Numele afacerii</label>
          <input name="name" value={formData.name} onChange={handleChange} className={textInput} required />
        </div>


        <span className={`font-medium ${pinkAsterisk}`}>Fotografie</span>
        <div className='h-50 max-w-100 md:w-80 border border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center'>
          <label htmlFor='photo' className={`block font-medium  border rounded border-gray-300 w-30 text-center py-1 cursor-pointer`}>
            <div className="relative">
              <Image
                src="/upload.svg"
                alt="Next.js logo"
                width={20}
                height={20}
                priority
                className="absolute left-[7] top-[2]"
              />
              Incarca
            </div>
          </label>
          <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="w-1/3 border rounded border-gray-300 hidden" />
          <div className='w-50 h-20 text-center flex justify-center'>
            {!preview &&
              <div className='text-xs text-gray-500'>
                <span className='inline-block mt-2 mb-1'>Formate acceptate: .jpg, .png</span>
                <br />
                <span>Dim max: 20 MB</span>
              </div>
            }
            {preview && <Image src={preview} alt="Preview" width={100} height={100} className="mt-2 rounded w-60 h-20 object-cover" />}
          </div>
        </div>



        <div>
          <label className={`block font-medium ${pinkAsterisk}`}>Telefon</label>
          <div className='relative'>
            <Image
              src="/phone.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
            <input name="phone" value={formData.phone} onChange={handleChange} className={`${textInput} pl-[40]`} required />
          </div>
        </div>



        <div className='flex items-center gap-2'>
          <label htmlFor="isOnline">
            Este afacere online
          </label>
          <input
            type="checkbox"
            id="isOnline"
            name="isOnline"
            checked={formData.isOnline}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.checked })}
            className="w-4"
          />
        </div>



        <div className='border border-gray-100 border-3 mt-5'></div>

        <h4 className='font-medium'>Social media</h4>

        <div>
          <label className="block font-medium">Link către website (opțional)</label>
          <div className='relative'>
            <Image
              src="/globe.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
            <input name="website" value={formData.website} onChange={handleChange} className={`${textInput} pl-[40]`} />
          </div>
        </div>

        <div>
          <label className="block font-medium">Facebook (opțional)</label>
          <div className='relative'>
            <Image
              src="/facebook-gray.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
            <input name="facebook" value={formData.facebook} onChange={handleChange} className={`${textInput} pl-[40]`} />
          </div>
        </div>

        <div>
          <label className="block font-medium">Instagram (opțional)</label>
          <div className='relative'>
            <Image
              src="/instagram-gray.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
            <input name="instagram" value={formData.instagram} onChange={handleChange} className={`${textInput} pl-[40]`} />
          </div>
        </div>

        <div>
          <label className="block font-medium">Tiktok (opțional)</label>
          <div className='relative'>
            <Image
              src="/tiktok-gray.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
            <input name="tiktok" value={formData.tiktok} onChange={handleChange} className={`${textInput} pl-[40]`} />
          </div>
        </div>

        <div>
          <label className="block font-medium">Youtube (opțional)</label>
          <div className='relative'>
            <Image
              src="/youtube-gray.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
              className="absolute left-[16] top-[10]"
            />
            <input name="youtube" value={formData.youtube} onChange={handleChange} className={`${textInput} pl-[40]`} />
          </div>
        </div>


        <div className='border border-gray-100 border-3 mt-5'></div>
        <Button
          onClick={
            (e: SyntheticEvent) => {
              e.preventDefault();
              setShowAddressesForm(true)
            }}
          text={initialData?.name ? 'Modificati locatiile fizice' : 'Adaugati locatii fizice'} />
        {showAddressesForm && <Addresses addresses={addresses} setAddresses={setAddresses} />}
        <div className='border border-gray-100 border-3'></div>



        <div className='flex gap-5 flex-wrap md:flex-nowrap justify-start mt-10'>
          <Button onClick={close} text="Inchide" variant={ButtonVariants.SECONDARY} />

          <Button type="submit" text="Salveaza" variant={ButtonVariants.PRIMARY} loading={loading} />
        </div>
      </form>


      {error && <Problem />}
    </div>
  );
}
