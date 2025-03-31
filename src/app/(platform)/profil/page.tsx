"use client"
import { redirect } from 'next/navigation'
import { useEffect, useState } from "react"
import useUser from "@/hooks/useUser";
import Recommendations from './components/Recommendations';
import MyAccount from './components/MyAccount';
import Menu from './components/Menu';
import Business from './components/Business';
import { BusinessOwnerRes } from '@/types/serverResponse';

export default function ProfilePage() {
    const [menu, setMenu] = useState(0);
    const [business, setBusiness] = useState<BusinessOwnerRes>();

    const [error, setError] = useState(false);

    async function fetchBusiness() {
        const response = await fetch(`/api/afaceri-owner`, {
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

    const { user, isLoading } = useUser();

    useEffect(() => {
        if (user) {
            fetchBusiness();
        }
    }, [user]);

    useEffect(() => {
        if (business) {
            setMenu(1);
        }
    }, [business])

    if (isLoading) {
        return null;
    }

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="max-w-5xl mx-auto mt-3 px-2 md:px-10">
            <div className="">{user.email}</div>
            <div className='flex mt-5'>
                <Menu menu={menu} setMenu={(o: number) => { setMenu(o); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
                <div className="w-full">
                    {menu === 0 && <Recommendations />}
                    {menu === 1 && <Business business={business} refetch={() => fetchBusiness()} error={error} />}
                    {menu === 2 && <MyAccount />}
                </div>
            </div>
        </div>
    )
}