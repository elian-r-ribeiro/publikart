'use client';

import { getLoggedUserInfo } from "@/services/authService";
import Image from "next/image";

export default function MiniUserProfile() {

    const loggedUserData = getLoggedUserInfo();

    return (
        <div className="flex items-center mt-5 gap-3 changeScaleOnHoverDefaultStyle cursor-pointer" onClick={() => window.location.href = "/profile"}>
            <Image className="rounded-full" width={60} height={60} alt="Profile Image" src={loggedUserData?.imageURL || "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} />
            <div className="flex flex-col">
                <span className="max-w-[200px] truncate overflow-hidden whitespace-nowrap font-medium">
                    {loggedUserData?.userName || "Usuário"}
                </span>
                <span className="text-xs text-zinc-400">Ver perfil</span>
            </div>
        </div>
    );
}