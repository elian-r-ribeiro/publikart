import { usePlayerContext } from "@/context/PlayerContext";
import { IconPlayerPause, IconPlayerSkipBack, IconPlayerSkipForward, IconRewindBackward10, IconRewindForward10 } from "@tabler/icons-react";

export default function MiniPlayer() {

    const { audio } = usePlayerContext();

    const testFunction = () => {
        console.log(audio.duration);
    }

    const formatTime = (seconds: number) => {
        if(!seconds) return "00:00";

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
                <IconPlayerSkipBack className="cursor-pointer"></IconPlayerSkipBack>
                <IconRewindBackward10 className="cursor-pointer"></IconRewindBackward10>
                <IconPlayerPause onClick={testFunction} className="cursor-pointer"></IconPlayerPause>
                <IconRewindForward10 className="cursor-pointer"></IconRewindForward10>
                <IconPlayerSkipForward className="cursor-pointer"></IconPlayerSkipForward>
            </div>
            <div className="flex items-center gap-3">
                <span>00:00</span>
                <input className="sm:w-64 md:w-96 lg:w-128" type="range"></input>
                <span>{formatTime(audio?.duration)}</span>
            </div>
        </div>
    );
}