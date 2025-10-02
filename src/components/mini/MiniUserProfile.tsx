'use client';

import { useCurrentUser } from "@/context/UserContext";
import User from "@/model/User";
import Image from "next/image";
import Loading from "../others/Loading";

export default function MiniUserProfile() {

    const loggedUserData = useCurrentUser() as User;

    if (!loggedUserData) {
        return <Loading isSupposedToBeStatic={true} text="Carregando..." />;
    }

    return (
        <div className="flex items-center mt-5 gap-3 changeScaleOnHoverDefaultStyle cursor-pointer" onClick={() => window.location.href = "/profile"}>
            <Image className="rounded-full max-h-20 max-w-60" width={60} height={20} alt="Profile Image" src={loggedUserData?.profilePictureURL || "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} />
            <div className="flex flex-col">
                <span className="max-w-[200px] truncate overflow-hidden whitespace-nowrap font-medium">
                    {loggedUserData?.userName || "Usuário"}
                </span>
                <span className="text-xs text-zinc-400">Ver perfil</span>
            </div>
        </div>
    );
}