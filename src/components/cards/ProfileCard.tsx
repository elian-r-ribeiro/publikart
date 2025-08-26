'use client'

import { getLoggedUserInfoHook, updateUserProfile, updateUserProfileWithProfilePicture, logoutFromFirebase } from "@/services/AuthService";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ArtistProfileButtons from "../others/ArtistProfileButtons";
import DefaultImageInput from "../others/DefaultImageInput";
import IsArtistProfileCardInput from "../others/IsArtistProfileCardInput";
import { useRouter } from "next/navigation";
import User from "../../model/User";

export default function ProfileCard() {

    type FormValues = {
        userName: string,
        isArtist: boolean,
        imageInput: FileList
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const loggedUserData: User = getLoggedUserInfoHook();
    const router = useRouter();

    if (!loggedUserData) {
        return <div>Carregando...</div>;
    }

    const isArtist = loggedUserData.isArtist;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (data.imageInput != null) {
            await updateUserProfileWithProfilePicture(loggedUserData.uid, data.userName, data.isArtist, data.imageInput[0]!);
        } else {
            await updateUserProfile(loggedUserData.uid, data.userName, data.isArtist);
        }
        window.location.reload();
    }

    const logout = async () => {
        logoutFromFirebase();
        router.push("/login");
    }

    return (
        <div className="centerItems">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-700/20 w-110 h-150 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <DefaultImageInput
                    imageSrc={imageSrc ?? ""}
                    defaultImageURL={loggedUserData.profilePictureURL}
                    register={register}
                    setImageSrc={setImageSrc}
                    isRequired={false}
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
                    <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black"
                        onClick={logout}
                    >Logout</button>
                </div>
            </form>
        </div>
    );
}
