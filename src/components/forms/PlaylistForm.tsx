'use client'

import { useEffect, useState } from "react";
import DefaultImageInput from "../others/DefaultImageInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCurrentUser } from "@/context/UserContext";
import User from "@/model/User";
import DefaultCheckboxInput from "../others/DefaultCheckboxInput";
import { createPlaylist, updatePlaylist } from "@/services/PlaylistsService";
import { getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import Playlist from "@/model/Playlist";
import { useLoading } from "@/context/LoadingContext";
import { useMessage } from "@/context/MessageContext";
import { PlaylistUploadOrUpdateResult } from "@/model/Types";

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
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ mode: "onBlur" });
    const { setIsLoading, setLoadingMessage } = useLoading();
    const { setIsShow, setMessage, setOptionalOnDismissFunction } = useMessage();
    const loggedUserInfo: User | null = useCurrentUser();

    useEffect(() => {
        fetchPlaylistData();
    }, [props.playlistId, reset]);

    const fetchPlaylistData = async () => {
        setLoadingMessage("Carregando...");
        setIsLoading(true);

        if (props.playlistId) {
            const playlistData: Playlist = await getSomethingFromFirebaseByDocumentId("playlists", props.playlistId) as Playlist;

            if (playlistData) {
                reset({
                    playlistTitle: playlistData.playlistTitle || "",
                    playlistDescription: playlistData.playlistDescription || "",
                    isPrivate: playlistData.isPrivate
                });
                setImageSrc(playlistData.imgUrl);
            }
        }

        setIsLoading(false);
    };

    if (!loggedUserInfo) {
        return;
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingMessage("Salvando playlist...");
        setIsLoading(true);

        if (props.playlistId === "new") {
            const playlistUploadTask = await createPlaylist(loggedUserInfo.uid, data.playlistTitle, data.imageInput[0], data.isPrivate, data.playlistDescription);
            validatePlaylistUploadOrUpdate(playlistUploadTask);
        } else {
            if (data.imageInput) {
                const playlistUpdateTask = await updatePlaylist(loggedUserInfo.uid, props.playlistId!, data.playlistTitle, data.isPrivate, data.playlistDescription, data.imageInput[0])
                validatePlaylistUploadOrUpdate(playlistUpdateTask);
            } else {
                await updatePlaylist(loggedUserInfo.uid, props.playlistId!, data.playlistTitle, data.isPrivate, data.playlistDescription);
            }
        }
    };

    const validatePlaylistUploadOrUpdate = (playlistUploadResult: PlaylistUploadOrUpdateResult) => {

        setIsLoading(false);
        switch (playlistUploadResult.status) {
            case "success": {
                setOptionalOnDismissFunction(() => onDismissMessage);
                setMessage("Playlist salva com sucesso!");
                setIsShow(true);
                break;
            }
            case "invalidPlaylistImageFile": {
                setMessage("Formato da imagem da playlist não suportado.");
                setIsShow(true);
                break;
            }
            case "notASupporter": {
                setMessage("O uso de GIFs é restrito apenas para apoiadores. Entre em contato com elianribeiro.contato@gmail.com ou em seu WhatsApp pessoal, se o possuir.");
                setIsShow(true);
                break;
            }
            case "error": {
                setMessage("Erro desconhecido.");
                setIsShow(true);
                break;
            }
        }
    }

    const onDismissMessage = () => {
        window.location.reload();
    }

    return (
        <div className="bg-zinc-700/20 w-90 lg:w-110 h-110 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 text-center">
                <DefaultImageInput
                    imageSrc={imageSrc || ""}
                    setImageSrc={setImageSrc}
                    register={register}
                    isRequired={props.playlistId === "new"}
                />
                {errors.imageInput && <p>{errors.imageInput.message}</p>}

                <input
                    type="text"
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

                <DefaultCheckboxInput
                    defaultChecked={false}
                    register={register}
                    registerName="isPrivate"
                    inputText="Playlist privada"
                />

                {props.playlistId === "new" ? (
                    <button className="buttonDefaultStyle changeScaleOnHoverDefaultStyle" type="submit">
                        Criar playlist
                    </button>
                ) : (
                    <button className="buttonDefaultStyle changeScaleOnHoverDefaultStyle" type="submit">
                        Salvar playlist
                    </button>
                )}
            </form>
        </div>
    );
}
