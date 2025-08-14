'use client'

import { getLoggedUserInfoHook, updateUserProfile, updateUserProfileWithProfilePicture } from "@/services/AuthService";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        }
    };

    return (
        <div className="centerItems">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <label htmlFor="fileInput" className="cursor-pointer">
                    <Image
                        src={imageSrc || loggedUserData.profilePictureURL}
                        alt="Profile Picture"
                        height={128}
                        width={128}
                        className="w-32 h-32 object-cover border-2 border-gray-300 rounded-full"
                    />
                </label>

                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("profilePicture")}
                    onChange={(e) => {
                        handleImageChange(e);
                        setProfilePicture(e.target.files);
                    }}
                />
                <input type="text"
                    className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                    placeholder="Nome de Usuário" defaultValue={loggedUserData.userName}
                    {...register("userName", { required: "Nome de usuário é obrigatório", minLength: { value: 6, message: "O nome de usuário deve ter no mínimo 6 caracteres" } })}
                />
                {errors.userName && <p>{errors.userName.message}</p>}
                {isArtist ?
                    <div className="flex flex-col gap-2">
                        <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Enviar Música</button>
                        <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Playlist</button>
                        <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Álbum</button>
                    </div>
                    :
                    <div></div>
                }

                <div className="changeScaleOnHoverDefaultStyle flex items-center gap-2">
                    <input type="checkbox"
                        defaultChecked={isArtist}
                        className="size-6 transform cursor-pointer appearance-none rounded-lg border-2 border-[#ffffff] transition duration-[120ms] ease-in-out checked:border-none checked:border-[#ffffff] checked:bg-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("isArtist")}
                    />
                    <span>Sou compositor</span>
                </div>
                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black" type="submit">Salvar</button>
            </form>
        </div>
    );
}