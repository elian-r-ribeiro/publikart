'use client'

import { usePlayerContext } from "@/context/PlayerContext";
import { IconVolume } from "@tabler/icons-react";
import React from "react";

export default function VolumeController() {

    const { audio, volume, setVolume } = usePlayerContext();

    const testFunction = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = Number(e.target.value);

        setVolume(value);

        if (audio) {
            audio.volume = value;
        }
    }

    return (
        <div className="hidden lg:flex gap-1">
            <IconVolume></IconVolume>
            <input min={0} max={1} step={0.01} value={volume} onChange={testFunction} className="w-30" type="range" />
        </div>
    );
}