'use client'

import { useEffect, useState } from "react";
import DefaultImageInput from "../others/DefaultImageInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCurrentUser } from "@/context/UserContext";
import User from "@/model/User";
import { tryUpdateSong, tryUploadSongToFirebase } from "@/services/SongsService";
import { getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import Song from "@/model/Song";
import { useLoading } from "@/context/LoadingContext";
import { useMessage } from "@/context/MessageContext";
import { SongUploadResult } from "@/model/Types";

type FormValues = {
    songTitle: string;
    imageInput: FileList;
    songFile: FileList;
};

interface SongFormProps {
    songId?: string
}

export default function SongForm(props: SongFormProps) {

    const loggedUserInfo: User | null = useCurrentUser();
    const isSongImageAndFileRequired: boolean = props.songId === "new";
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ mode: "onBlur" });
    const { setIsLoading, setLoadingMessage } = useLoading();
    const { setIsShow, setMessage, setOptionalOnDismissFunction } = useMessage();

    useEffect(() => {
        fetchSongData();
    }, [props.songId, reset]);

    const fetchSongData = async () => {
        setLoadingMessage("Carregando...");
        setIsLoading(true);

        if (props.songId) {
            const songData: Song = await getSomethingFromFirebaseByDocumentId("songs", props.songId) as Song;

            if (songData) {
                reset({
                    songTitle: songData.title
                });
                setImageSrc(songData.imgUrl);
            }
        }

        setIsLoading(false);
    }

    if (!loggedUserInfo) {
        return;
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingMessage("Salvando música...");
        setIsLoading(true);

        if (props.songId === "new") {
            const songUploadTask = await tryUploadSongToFirebase(loggedUserInfo.uid, data.songTitle, data.songFile[0], data.imageInput[0]);
            validateSongUploadOrUpdate(songUploadTask);
            setIsLoading(false);
        } else {
            const songUpdateTask = await tryUpdateSong(loggedUserInfo.uid, props.songId!, data.songTitle, data.imageInput[0], data.songFile[0]);
            validateSongUploadOrUpdate(songUpdateTask);
            setIsLoading(false);
        }
    };

    const validateSongUploadOrUpdate = (songUploadResult: SongUploadResult) => {
        switch (songUploadResult.status) {
            case "success": {
                setOptionalOnDismissFunction(() => onDismissFunction);
                setMessage("Música salva com sucesso!");
                setIsShow(true);
                break;
            }
            case "invalidSongImageFile": {
                setMessage("Formato da imagem da música não suportado.");
                setIsShow(true);
                break;
            }
            case "invalidSongFile": {
                setMessage("Formato do arquivo da música não suportado.");
                setIsShow(true);
                break;
            }
            case "notASupporter": {
                setMessage("O uso de GIFs é restrito apenas para apoiadores. Entre em contato com elianribeiro.contato@gmail.com ou em seu WhatsApp pessoal, se o possuir.");
                setIsShow(true);
                break;
            }
            case "error": {
                setMessage("Erro inesperado.");
                setIsShow(true);
                break;
            }
        }
    }

    const onDismissFunction = () => {
        window.location.reload();
    }

    return (
        <div className="bg-zinc-700/20 w-110 h-110 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 text-center">
                <DefaultImageInput
                    imageSrc={imageSrc || ""}
                    setImageSrc={setImageSrc}
                    register={register}
                    isRequired={isSongImageAndFileRequired}
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
                    {...register("songFile", { required: isSongImageAndFileRequired ? "O arquivo da música é obrigatório" : false })}
                />
                {errors.songFile && <p>{errors.songFile.message}</p>}

                {props.songId === "new" ? (
                    <button className="buttonDefaultStyle changeScaleOnHoverDefaultStyle" type="submit">
                        Enviar música
                    </button>
                ) : (
                    <button className="buttonDefaultStyle changeScaleOnHoverDefaultStyle" type="submit">
                        Salvar música
                    </button>
                )}

            </form>
        </div>
    );
}