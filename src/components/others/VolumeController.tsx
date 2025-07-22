import { IconVolume } from "@tabler/icons-react";

export default function VolumeController() {
    return (
        <div className="flex gap-1">
            <IconVolume></IconVolume>
            <input className="w-30" type="range" />
        </div>
    );
}