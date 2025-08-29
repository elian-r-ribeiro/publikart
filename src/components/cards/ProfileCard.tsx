'use client'

import { updateUserProfile, updateUserProfileWithProfilePicture, logoutFromFirebase } from "@/services/AuthService";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ArtistProfileButtons from "../others/ArtistProfileButtons";
import DefaultImageInput from "../others/DefaultImageInput";
import { useRouter } from "next/navigation";
import User from "../../model/User";
import { useCurrentUser } from "@/context/UserContext";
import DefaultCheckboxInput from "../others/DefaultCheckboxInput";

export default function ProfileCard() {

    type FormValues = {
        userName: string,
        isArtist: boolean,
        imageInput: FileList
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const loggedUserData: User | null = useCurrentUser();
    const router = useRouter();

    if (!loggedUserData) {
        return <div>Carregando...</div>;
    }

    const isArtist = loggedUserData.isArtist;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (data.imageInput && data.imageInput.length > 0) {
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

                <DefaultCheckboxInput defaultChecked={isArtist} register={register} registerName="isArtist" inputText="Sou compositor" />

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
