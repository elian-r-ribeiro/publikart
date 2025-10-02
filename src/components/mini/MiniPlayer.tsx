import { useEffect, useState } from "react";
import { usePlayerContext } from "@/context/PlayerContext";
import { IconPlayerPause, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward, IconRewindBackward10, IconRewindForward10 } from "@tabler/icons-react";

export default function MiniPlayer() {

    const { audio, currentIndex, setIndex, songsQueue } = usePlayerContext();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSongPaused, setIsSongPaused] = useState(false);

    useEffect(() => {
        if (!audio) return;

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", setMeta);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", setMeta);
        };
    }, [audio]);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    function formatTime(seconds: number): string {
        if (isNaN(seconds)) return "00:00";

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audio) return;

        const value = Number(e.target.value);

        audio.currentTime = value;

        setCurrentTime(value);
    };

    const playOrPauseSong = () => {
        if (!audio) {
            return;
        } else {
            if (isSongPaused) {
                audio.play();
                setIsSongPaused(false);
            } else {
                audio.pause();
                setIsSongPaused(true);
            }
        }
    }

    const nextSong = () => {
        if (currentIndex + 1 >= songsQueue.length) {
            return;
        } else {
            setIndex(currentIndex + 1);
        }
    }

    const previousSong = () => {
        if (currentIndex - 1 < 0) {
            return;
        } else {
            setIndex(currentIndex - 1);
        };
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
                <IconPlayerSkipBack onClick={previousSong} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
                {isSongPaused
                    ? (<IconPlayerPlay onClick={playOrPauseSong} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />)
                    : (<IconPlayerPause onClick={playOrPauseSong} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />)}

                <IconPlayerSkipForward onClick={nextSong} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
            </div>
            <div className="flex items-center gap-3 w-full">
                <span>{formatTime(currentTime)}</span>
                <input
                    className="sm:w-64 md:w-96 lg:w-128"
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                />
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
