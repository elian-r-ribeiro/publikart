import MiniMusicInfo from "./MiniMusicInfo";
import MiniPlayer from "./MiniPlayer";
import VolumeController from "./VolumeController";

export default function Footer() {
    return (
        <div className="backdrop-blur h-20 flex justify-between items-center p-5">
            <MiniMusicInfo></MiniMusicInfo>
            <MiniPlayer></MiniPlayer>
            <VolumeController></VolumeController>
        </div>
    );
}