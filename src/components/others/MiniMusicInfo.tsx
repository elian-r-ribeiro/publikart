import Image from "next/image";

export default function MiniMusicInfo() {
    return (
        <div className="flex gap-3">
            <Image alt="Music Image" className="w-[70px] h-[50px] object-cover rounded-md" src={"https://t3.ftcdn.net/jpg/02/58/74/04/360_F_258740443_wapJBPEhkqGKLxmbCWRWXD6m7xbTYFuL.jpg"} width={70} height={50}/>
            <div className="flex flex-col">
                <span className="text-lg">Music Name</span>
                <span className="text-sm text-zinc-400">Music Owner</span>
            </div>
        </div>
    );
}