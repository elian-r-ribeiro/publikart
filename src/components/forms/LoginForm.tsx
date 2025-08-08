'use client'

import { login } from "@/services/AuthService";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const router = useRouter();

    type FormValues = {
        email: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await login(data.email, data.password);
            router.push("/songs")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="centerItems h-screen">
            <div className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
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
                    <button type="submit" className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Login</button>
                </form>
                <Link href="/passwordRecovery" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Esqueceu sua senha? Recupere aqui</span>
                </Link>
                <Link href="/register" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Não tem uma conta? Registre aqui</span>
                </Link>
            </div>
        </div>
    );
}