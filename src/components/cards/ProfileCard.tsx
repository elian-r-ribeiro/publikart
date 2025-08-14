'use client'

import { getLoggedUserInfoHook, updateUserProfile, updateUserProfileWithProfilePicture } from "@/services/AuthService";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ArtistProfileButtons from "../others/ArtistProfileButtons";
import ProfileCardImageInput from "../others/ProfileCardImageInput";
import IsArtistProfileCardInput from "../others/isArtistProfileCardInput";

export default function ProfileCard() {

    type FormValues = {
        userName: string,
        isArtist: boolean,
        profilePicture: FileList
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [profilePicture, setProfilePicture] = useState<FileList | null>(null);
    const loggedUserData = getLoggedUserInfoHook();

    if (!loggedUserData) {
        return <div>Carregando...</div>;
    }

    const isArtist = loggedUserData.isArtist;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (profilePicture) {
            await updateUserProfileWithProfilePicture(loggedUserData.uid, data.userName, data.isArtist, profilePicture[0]!);
        } else {
            await updateUserProfile(loggedUserData.uid, data.userName, data.isArtist);
        }
        window.location.reload();
    }

    return (
        <div className="centerItems">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-700/20 w-110 h-150 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <ProfileCardImageInput
                    imageSrc={imageSrc ?? ""}
                    profilePictureURL={loggedUserData.profilePictureURL}
                    register={register}
                    setImageSrc={setImageSrc}
                    setProfilePicture={setProfilePicture}
                />

                <input type="text"
                    className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                    placeholder="Nome de Usuário" defaultValue={loggedUserData.userName}
                    {...register("userName", { required: "Nome de usuário é obrigatório", minLength: { value: 6, message: "O nome de usuário deve ter no mínimo 6 caracteres" } })}
                />
                {errors.userName && <p>{errors.userName.message}</p>}

                {isArtist ? <ArtistProfileButtons /> : <div></div>}

                <IsArtistProfileCardInput isArtistDefaultChecked={isArtist} register={register} />

                <div className="centerItems gap-2">
                    <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black" type="submit">Salvar</button>
                    <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Logout</button>
                </div>
            </form>
        </div>
    );
}
