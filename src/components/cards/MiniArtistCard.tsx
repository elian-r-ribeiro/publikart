import Artist from "@/model/User";
import { IconDots } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface MiniArtistCardProps {
    artist: Artist;
};

export default function MiniArtistCard(props: MiniArtistCardProps) {

    const router = useRouter();

    function goToArtistPage() {
        router.push(`artists/${props.artist.uid}`);
    }

    return (
        <div className="defaultCardsSize centerItems min-w-32 bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.artist.profilePictureURL} alt="Artist image" className="w-32 h-32 object-cover rounded-full mb-2" />
            <h2 className="text-lg text-center font-semibold truncate overflow-hidden w-full whitespace-nowrap">{props.artist.userName}</h2>
            <IconDots onClick={goToArtistPage} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
        </div>
    );
}