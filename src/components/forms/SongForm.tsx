'use client'

import { useState } from "react";
import DefaultImageInput from "../others/DefaultImageInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCurrentUser } from "@/context/UserContext";
import User from "@/model/User";
import { uploadSongToFirebase } from "@/services/SongsService";

type FormValues = {
    songTitle: string;
    imageInput: FileList;
    songFile: FileList;
};

export default function SongForm() {

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });

    const loggedUserInfo: User | null = useCurrentUser();

    if (!loggedUserInfo) {
        return <p>Carregando...</p>
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await uploadSongToFirebase(data.songTitle, loggedUserInfo.uid, data.songFile[0], data.imageInput[0]);
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
                    placeholder="Título da sua linda música"
                    {...register("songTitle", {
                        required: "O nome da música é obrigatório",
                        minLength: { value: 6, message: "O nome da música deve ter no mínimo 6 caracteres" }
                    })}
                />
                {errors.songTitle && <p>{errors.songTitle.message}</p>}
                <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 truncate overflow-hidden whitespace-nowrap">{loggedUserInfo.userName}</p>
                </div>
                <input
                    type="file"
                    className="fileInputDefaultStyle changeScaleOnHoverDefaultStyle"
                    {...register("songFile", { required: "O arquivo da música é obrigatório" })}
                />
                {errors.songFile && <p>{errors.songFile.message}</p>}

                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black" type="submit">Enviar música</button>
            </form>
        </div>
    );
}