import { usePlayerContext } from "@/context/PlayerContext";
import User from "@/model/User";
import { getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MiniMusicInfo() {

    const { currentSong } = usePlayerContext();

    const [songOwner, setSongOwner] = useState<User>()

    useEffect(() => {
        fetchSongOwnerInfo()
    }, [currentSong]);

    const fetchSongOwnerInfo = async () => {
        if (!currentSong) {
            setSongOwner(undefined);
        } else {
            const dataFromFirebase = await getSomethingFromFirebaseByDocumentId("users", currentSong!.artistUid) as User;
            setSongOwner(dataFromFirebase);
        };
    }

    return (
        <div className="hidden lg:flex gap-3">
            <Image alt="Music Image" className="w-[70px] h-[50px] object-cover rounded-md" src={currentSong?.imgUrl || "https://t3.ftcdn.net/jpg/02/58/74/04/360_F_258740443_wapJBPEhkqGKLxmbCWRWXD6m7xbTYFuL.jpg"} width={70} height={50} />
            <div className="flex flex-col">
                <span className="text-lg">{currentSong?.title || "Music Name"}</span>
                <span className="text-sm text-zinc-400">{songOwner?.userName || "Music Owner"}</span>
            </div>
        </div>
    );
}