'use client';

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function RegisterForm() {

    type FormValues = {
        email: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

    return (
        <div className="centerItems h-screen">
            <div className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <h1 className="text-2xl font-black mb-4">Registrar</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="centerItems gap-4">

                        {/* <input type="text"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Seu lindo nome de usuário"
                        /> */}
                        <input type="email"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Seu melhor Email"
                            {...register("email", { required: "Email é obrigatório" })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <input type="password"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Sua melhor senha"
                            {...register("password", { required: "A senha é obrigatória" })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        {/* <input type="password"
                            className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                            placeholder="Sua melhor senha de novo"
                        /> */}
                        <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black" type="submit">Registrar</button>

                        <Link href="/login" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                            <span>Já tem uma conta? Logue aqui</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}