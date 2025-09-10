'use client'

import { IconBook, IconBrush, IconMusic, IconUser } from "@tabler/icons-react";
import PreferenceOption from "../main/PreferenceOption";
import { useRouter } from "next/navigation";
import { changeUserPreferenceOption } from "@/services/UserService";
import { useCurrentUser } from "@/context/UserContext";

export default function SelectPreferencesForm() {

    const router = useRouter();
    const loggedUserData = useCurrentUser();

    if (!loggedUserData) {
        return <div>Carregando...</div>
    }

    const selectPreference = async (preference: string): Promise<void> => {
        if (preference === "compositor") {
            await changeUserPreferenceOption(loggedUserData.uid);
            router.push("/songs");
        } else {
            router.push("/songs");
        }
    }

    return (
        <div className="h-screen gap-10 centerItems">
            <h1 className="text-4xl font-black">O que é você?</h1>
            <div className="centerItemsRow gap-3">
                <PreferenceOption onClick={() => selectPreference("compositor")} text="Compositor" iconName={IconMusic}></PreferenceOption>
                <PreferenceOption text="Escritor" iconName={IconBook} isDisabled></PreferenceOption>
                <PreferenceOption text="Artista" iconName={IconBrush} isDisabled></PreferenceOption>
                <PreferenceOption onClick={() => selectPreference("apreciador")} text="Apreciador" iconName={IconUser}></PreferenceOption>
            </div>
        </div>
    );
}