"use client"
import { redirect } from 'next/navigation'
import { useState } from "react"
import useUser from "@/hooks/useUser";
import Recommendations from './components/Recommendations';
import Campaigns from './components/Campaigns';
import MyAccount from './components/MyAccount';
import Menu from './components/Menu';

export default function ProfilePage() {
    const [menu, setMenu] = useState(0);

    const { user, isLoading } = useUser();

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
                <Menu menu={menu} setMenu={setMenu} />
                <div className="w-full">
                    {menu === 0 && <Recommendations />}
                    {menu === 1 && <Campaigns />}
                    {menu === 2 && <MyAccount />}
                </div>
            </div>
        </div>
    )
}