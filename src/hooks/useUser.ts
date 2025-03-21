"use client"

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

async function bla() {
    return new Promise((acc) => {
        setTimeout(() => acc(true), 1000);
    })
}

interface UserData {
    id: string;
    email: string;
    user_metadata?: {
        full_name?: string;
    };
}

export default function useUser(){
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchUser() {
            // await bla();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user as UserData | null);
            setIsLoading(false);
        }
        fetchUser();
    }, []);

    return [user, isLoading];
}
