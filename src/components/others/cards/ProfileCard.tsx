'use client'

import { getLoggedUserInfoHook, updateUserProfile } from "@/services/AuthService";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ProfileCard() {

    const loggedUserData = getLoggedUserInfoHook();

    type FormValues = {
        userName: string,
        isArtist: boolean
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });

    if (!loggedUserData) {
        return <div>Carregando...</div>;
    }

    const isArtist = loggedUserData.isArtist;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await updateUserProfile(loggedUserData.uid, data.userName, data.isArtist);
        window.location.reload();
    }

    return (
        <div className="centerItems">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <Image className="rounded-full" width={128} height={128}
                    src={loggedUserData.profilePictureURL || "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"}
                    alt="Profile Image" />
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