'use client'

import { logoutFromFirebase, tryLogin } from "@/services/AuthServiceHolder";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import DefaultMusicComponent from "../main/DefaultMusicComponent";
import { useLoading } from "@/context/LoadingContext";
import { useMessage } from "@/context/MessageContext";

export default function LoginForm() {

    const router = useRouter();
    const { setIsLoading, setLoadingMessage } = useLoading();
    const { setIsShow, setMessage } = useMessage();

    type FormValues = {
        email: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingMessage("Logando...");
        setIsLoading(true);
        const loginResult = await tryLogin(data.email, data.password);
        setIsLoading(false);

        switch (loginResult.status) {
            case "success":
                router.push("/songs");
                break;
            case "unverified":
                setMessage("Email não verificado. Um novo link de verificação foi enviado.");
                setIsShow(false);
                logoutFromFirebase();
                break;
            case "error":
                errorHandling(loginResult.code);
                break;
        }
    };

    const errorHandling = (errorCode: string) => {

        switch (errorCode) {
            case "auth/invalid-credential":
                setMessage("Email ou(e) senha inválido(s).");
                break;
            case "auth/too-many-requests":
                setMessage("Muitas requisições em pouco tempo. Tente novamente mais tarde.");
                break;
        }

        setIsShow(true);
    }

    return (
        <div className="centerItems h-screen">
            <div className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur z-1">
                <h1 className="text-2xl font-black mb-4">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="centerItems gap-7">
                    <input type="email"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Seu melhor Email"
                        {...register("email", {
                            required: "Email é obrigatório"
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <input type="password"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Sua melhor senha"
                        {...register("password", {
                            required: "Senha é obrigatória"
                        }
                        )}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <button type="submit" className="buttonDefaultStyle changeScaleOnHoverDefaultStyle">Login</button>
                </form>
                <Link href="/passwordRecovery" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Esqueceu sua senha? Recupere aqui</span>
                </Link>
                <Link href="/register" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Não tem uma conta? Registre aqui</span>
                </Link>
            </div>
            <div className="flex justify-end items-end absolute h-screen w-screen p-6 z-0">
                <DefaultMusicComponent />
            </div>
        </div>
    );
}