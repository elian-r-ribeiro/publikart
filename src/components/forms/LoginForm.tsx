import Link from "next/link";

export default function LoginForm() {
    return (
        <div className="centerItems h-screen">
            <div className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <h1 className="text-2xl font-black mb-4">Login</h1>
                <div className="centerItems gap-7">
                    <input type="email"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Seu melhor Email" />
                    <input type="password"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Sua melhor senha" />
                </div>

                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Login</button>
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