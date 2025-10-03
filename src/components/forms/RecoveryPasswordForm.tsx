'use client'

import { sendPasswordRecovery } from "@/services/AuthService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../others/Loading";
import { useLoading } from "@/context/LoadingContext";
import { useCurrentUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

type FormValues = {
    email: string
}

export default function PasswordRecoveryForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const { setIsLoading, setLoadingMessage } = useLoading();
    const router = useRouter();
    const loggedUser = useCurrentUser();

    useEffect(() => {
        if(loggedUser != null) {
            router.push("/songs");
        }
    }, [loggedUser]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingMessage("Enviado email...");
        setIsLoading(true);
        await sendPasswordRecovery(data.email);
        setIsLoading(false);
    }

    return (
        <div className="centerItems h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-700/20 w-110 h-80 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <h1 className="text-2xl font-black mb-4">Recuperar</h1>
                <div className="centerItems gap-7">
                    <input type="email"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="O Email da sua conta"
                        {...register("email", { required: "O email é obrigatório" })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <button type="submit" className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Enviar</button>
                <Link href="/login" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Voltar para o Login</span>
                </Link>
            </form>
        </div>
    );
}