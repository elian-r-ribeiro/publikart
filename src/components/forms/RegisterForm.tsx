import Link from "next/link";

export default function RegisterForm() {
    return (
        <div className="centerItems h-screen">
            <div className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <h1 className="text-2xl font-black mb-4">Registrar</h1>
                <div className="centerItems gap-7">
                    <input type="text"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Seu lindo nome de usuário" />
                    <input type="email"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Seu melhor Email" />
                    <input type="password"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Sua melhor senha" />
                    <input type="password"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="Sua melhor senha de novo" />
                </div>

                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Registrar</button>
                <Link href="/login" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Já tem uma conta? Logue aqui</span>
                </Link>
            </div>
        </div>
    );
}