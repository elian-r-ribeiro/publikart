import Link from "next/link";

export default function PasswordRecoveryForm() {
    return (
        <div className="centerItems h-screen">
            <div className="bg-zinc-700/20 w-110 h-80 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <h1 className="text-2xl font-black mb-4">Recuperar</h1>
                <div className="centerItems gap-7">
                    <input type="email"
                        className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                        placeholder="O Email da sua conta" />
                </div>
                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Enviar</button>
                <Link href="/login" className="cursor-pointer changeScaleOnHoverDefaultStyle">
                    <span>Voltar para o Login</span>
                </Link>
            </div>
        </div>
    );
}