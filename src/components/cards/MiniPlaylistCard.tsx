import { useCurrentUser } from "@/context/UserContext";
import Playlist from "@/model/Playlist";
import { addPlaylistToLoggedUserSavedPlaylists, deletePlaylistFromFirebase } from "@/services/PlaylistsService";
import { IconDots, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Loading from "../others/Loading";
import { useMessage } from "@/context/MessageContext";
import { useLoading } from "@/context/LoadingContext";

interface PlaylistCardProps {
    playlist: Playlist;
    isPlaylistInProfile?: boolean;
};

export default function MiniPlaylistCard(props: PlaylistCardProps) {

    const loggedUserInfo = useCurrentUser();
    const router = useRouter();
    const { setIsLoading, setLoadingMessage } = useLoading();
    const { setOnConfirmFunction, setIsShow, setMessage } = useMessage();

    if (!loggedUserInfo) {
        return <Loading isSupposedToBeStatic={true} text="Carregando..." />;
    }

    async function savePlaylist() {
        await addPlaylistToLoggedUserSavedPlaylists(loggedUserInfo!.uid, props.playlist.id);
    }

    function goToEditPlaylist() {
        router.push(`/createOrEditPlaylist/${props.playlist.id}`);
    }

    function goToPlaylistDetailsPage() {
        router.push(`/playlist/${props.playlist.id}`);
    }

    async function handlePlaylistDeletion() {
        setMessage("Tem certeza que deseja excluir esta playlist permanentemente? Isso não pode ser desfeito.");
        setOnConfirmFunction(() => onDeletionConfirmation);
        setIsShow(true);
    }   

    async function onDeletionConfirmation() {
        setLoadingMessage("Deletando...");
        setIsLoading(true);

        await deletePlaylistFromFirebase(props.playlist.id, loggedUserInfo!.uid);

        setIsLoading(false);
        window.location.reload();
    }

    return (
        <div className="centerItems defaultCardsSize bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.playlist.imgUrl} alt="Playlist image" className="w-32 h-32 object-cover rounded-lg mb-2" />
            <h2 className="w-full text-center text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.playlist.playlistTitle}</h2>
            <div className="flex justify-center">
                <IconDots
                    onClick={goToPlaylistDetailsPage}
                    className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                />
                <IconPlus
                    onClick={savePlaylist}
                    className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                />
                {props.isPlaylistInProfile &&
                    <div className="flex">
                        <IconPencil
                            className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                            onClick={goToEditPlaylist}
                        />
                        <IconTrash
                            onClick={handlePlaylistDeletion}
                            className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                        />
                    </div>
                }
            </div>
        </div>
    );
}