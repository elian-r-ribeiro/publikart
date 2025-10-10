'use client';

import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DefaultImageInput from "../others/DefaultImageInput";
import { tryRegisterUser } from "@/services/AuthServiceHolder";
import { useLoading } from "@/context/LoadingContext";
import { useMessage } from "@/context/MessageContext";
import { ProfileUpdateResult } from "@/model/Types";

export default function RegisterForm() {

    type FormValues = {
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
        imageInput: FileList;
    };

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const { setIsLoading, setLoadingMessage } = useLoading();
    const { setIsShow, setMessage } = useMessage();
    const password = watch("password");

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingMessage("Registrando usuário...");
        setIsLoading(true);

        const registerResult = await tryRegisterUser(data.email, data.password, data.userName, data.imageInput);

        setIsLoading(false);

        switch (registerResult.status) {
            case "success": {
                setMessage("Se esse email existir, foi enviado um email de validação. Verifique sua caixa de spam.");
                break;
            }
            case "invalidProfilePictureFile": {
                setMessage("Formato da imagem de perfil não suportado.");
                break;
            }
            case "error": {
                errorHandling(registerResult.code);
                break;
            }
        }

        setIsShow(true);
    };

    const errorHandling = (errorCode: string) => {
        switch (errorCode) {
            case "auth/email-already-in-use":
                setMessage("O email informado já está registrado.");
                break;
            case "auth/invalid-email":
                setMessage("O formato do email fornecido é inválido.");
                break;
        }

        setIsShow(true);
    }

    return (
        <div className="centerItems h-screen">
            <div className="bg-zinc-700/20 w-110 min-h-130 max-h-180 rounded-2xl overflow-hidden centerItems border-2 backdrop-blur">
                <h1 className="text-2xl font-black mb-4">Registrar</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="centerItems gap-4">

                        <DefaultImageInput
                            imageSrc={imageSrc || ""}
                            setImageSrc={setImageSrc}
                            register={register}
                            isRequired={true}
                        ></DefaultImageInput>
                        {errors.imageInput && <p>{errors.imageInput.message}</p>}

                        <input type="text"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Seu lindo nome de usuário"
                            {...register("userName", {
                                required: "O nome de usuário é obrigatório",
                                minLength: { value: 6, message: "O nome de usuário deve ter no mínimo 6 caracteres" },
                                maxLength: { value: 32, message: "O nome de usuário deve ter no máximo 32 caracteres" }
                            })}
                        />
                        {errors.userName && <p>{errors.userName.message}</p>}
                        <input type="email"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Seu melhor Email"
                            {...register("email", {
                                required: "Email é obrigatório",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email inválido"
                                }
                            })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}

                        <input type="password"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Sua melhor senha"
                            {...register("password", {
                                required: "A senha é obrigatória",
                                minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" }
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        <input type="password"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Sua melhor senha de novo"
                            {...register("confirmPassword", {
                                required: "A confirmação de senha é obrigatória",
                                validate: (value) => value === password || "As senhas não coincidem"
                            })}
                        />
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                        <button className="buttonDefaultStyle changeScaleOnHoverDefaultStyle" type="submit">Registrar</button>

                        <Link href="/login" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                            <span>Já tem uma conta? Logue aqui</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}