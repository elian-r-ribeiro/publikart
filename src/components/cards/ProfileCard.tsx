'use client'

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ArtistProfileButtons from "../others/ArtistProfileButtons";
import DefaultImageInput from "../others/DefaultImageInput";
import { useRouter } from "next/navigation";
import User from "../../model/User";
import DefaultCheckboxInput from "../others/DefaultCheckboxInput";
import { updateUserProfile } from "@/services/UserService";
import { logoutFromFirebase } from "@/services/AuthService";
import { useLoading } from "@/context/LoadingContext";
import { ProfileUpdateResult } from "@/model/Types";
import { useMessage } from "@/context/MessageContext";

interface ProfileCardProps {
    userData: User;
}

export default function ProfileCard(props: ProfileCardProps) {

    type FormValues = {
        userName: string,
        isArtist: boolean,
        imageInput: FileList
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const router = useRouter();
    const { setIsLoading, setLoadingMessage } = useLoading();
    const { setIsShow, setMessage } = useMessage();

    const isArtist = props.userData.isArtist;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingMessage("Salvando...");
        setIsLoading(true);

        let profileUpdateTask;

        if (data.imageInput && data.imageInput.length > 0) {
            profileUpdateTask = await updateUserProfile(props.userData.uid, data.userName, data.isArtist, data.imageInput[0]!);
        } else {
            profileUpdateTask = await updateUserProfile(props.userData.uid, data.userName, data.isArtist);
        }

        setIsLoading(false);
        validateProfileUpdate(profileUpdateTask);
    }

    const validateProfileUpdate = (profileUpdateResult: ProfileUpdateResult) => {
        switch (profileUpdateResult.status) {
            case "success": {
                window.location.reload();
                break;
            }
            case "invalidProfilePictureFile": {
                setMessage("Formato da imagem de perfil não suportado.");
                setIsShow(true);
                break;
            }
            case "error": {
                setMessage("Erro desconhecido");
                setIsShow(true);
                break;
            }
        }
    }

    const logout = async () => {
        logoutFromFirebase();
        router.push("/login");
    }

    return (
        <div className="centerItems">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-700/20 w-80 md:w-110 h-150 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <DefaultImageInput
                    imageSrc={imageSrc ?? ""}
                    defaultImageURL={props.userData.profilePictureURL}
                    register={register}
                    setImageSrc={setImageSrc}
                    isRequired={false}
                />

                <input type="text"
                    className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                    placeholder="Nome de Usuário" defaultValue={props.userData.userName}
                    {...register("userName", { required: "Nome de usuário é obrigatório", minLength: { value: 6, message: "O nome de usuário deve ter no mínimo 6 caracteres" } })}
                />
                {errors.userName && <p>{errors.userName.message}</p>}

                {isArtist ? <ArtistProfileButtons /> : <div></div>}

                <DefaultCheckboxInput defaultChecked={isArtist} register={register} registerName="isArtist" inputText="Sou compositor" />

                <div className="centerItems gap-2">
                    <button className="buttonDefaultStyle changeScaleOnHoverDefaultStyle" type="submit">Salvar</button>
                    <button className="buttonDefaultStyle changeScaleOnHoverDefaultStyle" type="button"
                        onClick={logout}
                    >Logout</button>
                </div>
            </form>
        </div>
    );
}
