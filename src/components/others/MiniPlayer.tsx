import { IconPlayerPause, IconPlayerSkipBack, IconPlayerSkipBackFilled, IconPlayerSkipForward, IconPlayerSkipForwardFilled, IconRewindBackward10, IconRewindForward10 } from "@tabler/icons-react";

export default function MiniPlayer() {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
                <IconPlayerSkipBack className="cursor-pointer"></IconPlayerSkipBack>
                <IconRewindBackward10 className="cursor-pointer"></IconRewindBackward10>
                <IconPlayerPause className="cursor-pointer"></IconPlayerPause>
                <IconRewindForward10 className="cursor-pointer"></IconRewindForward10>
                <IconPlayerSkipForward className="cursor-pointer"></IconPlayerSkipForward>
            </div>
            <div className="flex items-center gap-3">
                <span>00:00</span>
                    <input className="w-128" type="range"></input>
                <span>03:24</span>
            </div>
        </div>
    );
}