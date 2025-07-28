import { IconVolume } from "@tabler/icons-react";

export default function VolumeController() {
    return (
        <div className="hidden lg:flex gap-1">
            <IconVolume></IconVolume>
            <input className="w-30" type="range" />
        </div>
    );
}