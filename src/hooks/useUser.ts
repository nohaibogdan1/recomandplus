"use client"

import { createClient } from "@/utils/supabase/client";

import { useEffect, useState } from "react";

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

    function reset(){
        setUser(null);
    }

    useEffect(() => {
        async function fetchUser() {
            // await bla();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user as UserData | null);
            setIsLoading(false);
        }
        fetchUser();
    }, []);

    return {user, isLoading, reset};
}
