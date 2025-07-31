export default function ProfileCard() {

    const isCompositor = true;

    return (
        <div className="centerItems">
            <div className="bg-zinc-700/20 w-110 h-130 rounded-2xl overflow-hidden centerItems gap-6 border-2 backdrop-blur">
                <img className="rounded-full h-32 w-32"
                    src="https://images.scalebranding.com/skull-wolf-logo-da286447-5c6d-4e6b-84a2-05a8acf94436.jpg"
                    alt="Profile Image" />
                <input type="text"
                    className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                    placeholder="Nome de Usuário" defaultValue={"Elian \"Lobo\" Ribeiro"} />
                <div className="flex flex-col gap-2">
                    <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Enviar Música</button>
                    <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Playlist</button>
                    <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Álbum</button>
                </div>
                <div className="changeScaleOnHoverDefaultStyle flex items-center gap-2">
                    <input type="checkbox"
                        defaultChecked={isCompositor}
                        className="size-6 transform cursor-pointer appearance-none rounded-lg border-2 border-[#ffffff] transition duration-[120ms] ease-in-out checked:border-none checked:border-[#ffffff] checked:bg-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50" />
                    <span>Sou compositor</span>
                </div>
            </div>
        </div>
    );
}