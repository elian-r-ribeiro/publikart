'use client'

import Song from "@/model/Song";
import Playlist from "@/model/Playlist";
import { IconMinus, IconPencil, IconPlayerPlay, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { deleteSongFromFirebase } from "@/services/SongsService";
import { removeSongFromPlaylist, saveSongToPlaylist } from "@/services/PlaylistsService";
import { getDocumentsThatUserUidIsOwnerFromFirebase } from "@/services/FirebaseService";
import { useCurrentUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { usePlayerContext } from "@/context/PlayerContext";
import Loading from "../others/Loading";
import { useMessage } from "@/context/MessageContext";
import { useLoading } from "@/context/LoadingContext";

interface MiniMusicCardProps {
  song: Song;
  isSongInProfile?: boolean;
  isSongInPlaylist?: boolean;
  isLoggedUserPlaylistOwner?: boolean;
  playlistId?: string;
  onSongRemoved?: (songId: string) => void;
}

export default function MiniMusicCard(props: MiniMusicCardProps) {
  const loggedUser = useCurrentUser();
  const router = useRouter();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [showSelect, setShowSelect] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { setSongsQueue, setIndex } = usePlayerContext();
  const { setOnConfirmFunction, setIsShow, setMessage } = useMessage();
  const { setIsLoading, setLoadingMessage } = useLoading();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setShowSelect(false);
      }
    }

    if (showSelect) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelect]);

  if (!loggedUser) {
    return <Loading isSupposedToBeStatic={true} text="Carregando..." />;
  }

  const isUserSongOwner = props.song.artistUid === loggedUser.uid;

  function handleSongPlayAndPause() {
    setSongsQueue([props.song]);
    setIndex(0);
  }

  async function handleSongSaving(e: React.ChangeEvent<HTMLSelectElement>) {
    const playlistId = e.target.value;
    if (!playlistId) return;
    await saveSongToPlaylist(props.song.id, playlistId);
    setShowSelect(false);
  }

  async function handlePencilClick() {
    router.push(`/uploadOrEditSong/${props.song.id}`);
  }

  async function handleTrashClick() {
    setMessage("Tem certeza que deseja excluir esta música permanentemente? Isso não pode ser desfeito.");
    setOnConfirmFunction(() => onDeleteConfirmation);
    setIsShow(true);
  }

  async function onDeleteConfirmation() {
    setLoadingMessage("Deletando...");
    setIsLoading(true);
    await deleteSongFromFirebase(props.song.id, loggedUser!.uid);
    setIsLoading(false);
    window.location.reload();
  }

  async function handlePlusClick() {
    setShowSelect((prev) => !prev);
    if (!showSelect) {
      const userPlaylists = await getDocumentsThatUserUidIsOwnerFromFirebase(
        loggedUser!.uid,
        "playlists"
      ) as Playlist[];
      setPlaylists(userPlaylists);
    }
  }

  async function handleMinusClick() {
    setMessage("Tem certeza que deseja remover esta música desta playlist?");
    setOnConfirmFunction(() => onRemotionConfirmation);
    setIsShow(true);
  }

  async function onRemotionConfirmation() {
    setLoadingMessage("Removendo...");
    setIsLoading(true);
    await removeSongFromPlaylist(props.song.id, props.playlistId!);
    props.onSongRemoved?.(props.song.id);
    setIsLoading(false);
  }

  return (
    <div className="centerItems defaultCardsSize bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
      <img src={props.song.imgUrl} alt="Song image" className="w-32 h-32 object-cover rounded-md mb-2" />
      <h2 className="w-full text-center text-lg font-semibold truncate overflow-hidden whitespace-nowrap">
        {props.song.title}
      </h2>
      <div className="flex flex-col items-center gap-2" ref={selectRef}>
        <div className="flex justify-center gap-2">
          <IconPlayerPlay onClick={handleSongPlayAndPause} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
          <IconPlus onClick={handlePlusClick} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />

          {props.isSongInPlaylist && props.isLoggedUserPlaylistOwner && (
            <IconMinus onClick={handleMinusClick} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
          )}

          {props.isSongInProfile && isUserSongOwner && (
            <>
              <IconPencil onClick={handlePencilClick} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
              <IconTrash onClick={handleTrashClick} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
            </>
          )}
        </div>

        {showSelect && (
          <select onChange={handleSongSaving} className="bg-zinc-800 text-white rounded p-1 w-49">
            <option value="">Selecione uma playlist...</option>
            <option value={loggedUser.savedSongsPlaylistId}>Músicas Salvas</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.playlistTitle}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
