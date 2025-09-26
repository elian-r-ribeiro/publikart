import MiniMusicInfo from "../mini/MiniMusicInfo";
import MiniPlayer from "../mini/MiniPlayer";
import VolumeController from "../mini/VolumeController";

export default function Footer() {

    return (
        <div className="backdrop-blur h-20 flex justify-center lg:justify-between items-center border-t border-zinc-700 p-5">
            <MiniMusicInfo></MiniMusicInfo>
            <MiniPlayer></MiniPlayer>
            <VolumeController></VolumeController>
        </div>
    );
}