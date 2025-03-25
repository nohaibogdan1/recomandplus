"use client"

import useUser from "@/hooks/useUser";
import Auth from "./Auth";

export default function CampaignAuth(){
    const {user} = useUser();
    if (user) {
        return null;
    }

    return(
        <Auth withBorder/>
    )
}