import { IconCamera, IconPlayerPlay, IconPlus } from "@tabler/icons-react";

export default function MiniMusicCardForm() {
    return (
        <div className="flex flex-col gap-3 min-h-32 bg-zinc-700/40 rounded-lg p-4 backdrop-blur">
            <IconCamera className="w-full h-32 object-cover rounded-md mb-2 changeScaleOnHoverDefaultStyle" />
            <div className="flex flex-col gap-3 text-center">
                <input type="text"
                    className="inputDefaultStyle changeScaleOnHoverDefaultStyle"
                    placeholder="Título da sua linda música" />
                <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 truncate overflow-hidden whitespace-nowrap">Elian "Lobo" Ribeiro</p>
                </div>
            </div>
            <input type="file" className="fileInputDefaultStyle changeScaleOnHoverDefaultStyle" />
        </div>
    );
}