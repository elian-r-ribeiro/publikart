import MiniMusicCard from "@/components/cards/MiniMusicCard";
import MiniMusicCardForm from "@/components/cards/MiniMusicCardForm";

export default function SendSong() {
    return (
        <div className="flex items-center justify-center h-screen w-screen gap-5">
            <MiniMusicCardForm />
        </div>
    );
}