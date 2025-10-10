'use client'

import { sendPasswordRecovery } from "@/services/AuthService";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoading } from "@/context/LoadingContext";
import { useMessage } from "@/context/MessageContext";

type FormValues = {
    email: string
}

export default function PasswordRecoveryForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const { setIsLoading, setLoadingMessage } = useLoading();
    const { setIsShow, setMessage } = useMessage();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingMessage("Enviado email...");
        setIsLoading(true);

        await sendPasswordRecovery(data.email);

        setIsLoading(false);
        setMessage("Se este for um email registrado, um email de recuperação de senha será enviado. Verifique a caixa de spam.");
        setIsShow(true);
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
                <button type="submit" className="buttonDefaultStyle changeScaleOnHoverDefaultStyle">Enviar</button>
                <Link href="/login" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Voltar para o Login</span>
                </Link>
            </form>
        </div>
    );
}