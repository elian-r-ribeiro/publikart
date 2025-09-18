'use client'

import { useState } from "react";
import DefaultImageInput from "../others/DefaultImageInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCurrentUser } from "@/context/UserContext";
import User from "@/model/User";
import DefaultCheckboxInput from "../others/DefaultCheckboxInput";
import { createPlaylist } from "@/services/PlaylistsService";

type FormValues = {
    playlistTitle: string;
    playlistDescription?: string;
    imageInput: FileList;
    isPrivate: boolean;
};

interface PlaylistFormProps {
    playlistId?: string | null;
}

export default function PlaylistForm(props: PlaylistFormProps) {

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });

    const loggedUserInfo: User | null = useCurrentUser();

    if (!loggedUserInfo) {
        return <p>Carregando...</p>
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await createPlaylist(loggedUserInfo.uid, data.playlistTitle, data.imageInput[0], data.isPrivate, data.playlistDescription);
    };

    return (
        <div className="bg-zinc-700/20 w-110 h-110 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 text-center">
                <DefaultImageInput
                    imageSrc={imageSrc || ""}
                    setImageSrc={setImageSrc}
                    register={register}
                    isRequired={true}
                />
                {errors.imageInput && <p>{errors.imageInput.message}</p>}
                <input type="text"
                    className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                    placeholder="Título da sua linda playlist"
                    {...register("playlistTitle", {
                        required: "O nome da playlist é obrigatório",
                        minLength: { value: 6, message: "O nome da playlist deve ter no mínimo 6 caracteres" }
                    })}
                />
                {errors.playlistTitle && <p>{errors.playlistTitle.message}</p>}
                <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 truncate overflow-hidden whitespace-nowrap">{loggedUserInfo.userName}</p>
                </div>

                <DefaultCheckboxInput defaultChecked={false} register={register} registerName="isPrivate" inputText="Playlist privada" />

                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black" type="submit">Criar playlist</button>
            </form>
        </div>
    );
}