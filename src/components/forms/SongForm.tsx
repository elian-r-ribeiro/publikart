'use client'

import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import DefaultImageInput from "../others/DefaultImageInput";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
    songName: string;
    imageInput: FileList;
    songInput: FileList;
};

export default function SongForm() {

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(data);
    };

    return (
        <div className="bg-zinc-700/20 w-110 h-80 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
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
                    placeholder="Título da sua linda música" />
                <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 truncate overflow-hidden whitespace-nowrap">Elian "Lobo" Ribeiro</p>
                </div>
                <input type="file" className="fileInputDefaultStyle changeScaleOnHoverDefaultStyle" />
                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black" type="submit">Enviar música</button>
            </form>
        </div>
    );
}