import { IconAlbum, IconAlbumOff, IconBook, IconMusic, IconMusicCheck, IconMusicX, IconPlaylist, IconPlaylistAdd, IconPlaylistX, IconRadio, IconUsersGroup } from "@tabler/icons-react";
import SideBarItem from "./SideBarItem";
import SideBarLabel from "./SideBarLabel";
import MiniUserProfile from "../mini/MiniUserProfile";

export default function SideBar() {
    return (
        <nav className="hidden w-80 lg:flex flex-col gap-5 my-4 mx-4">
            <MiniUserProfile />
            <SideBarLabel label="Explorar" />
            <SideBarItem link="/songs" iconName={IconMusic} text="Músicas" />
            <SideBarItem link="/artists" iconName={IconUsersGroup} text="Compositores" />
            <SideBarItem link="/publicPlaylists" iconName={IconPlaylist} text="Playlists Públicas" />
            <SideBarItem link="/publicAlbums" iconName={IconBook} text="Álbuns Públicos" />
            <SideBarLabel label="Seus" />
            <SideBarItem link="/mySongs" iconName={IconMusicX} text="Suas Músicas" />
            <SideBarItem link="/savedSongs" iconName={IconMusicCheck} text="Músicas Salvas" />
            <SideBarItem link="/savedPlaylists" iconName={IconPlaylistAdd} text="Playlists Salvas" />
            <SideBarItem link="/myPlaylists" iconName={IconPlaylistX} text="Minhas Playlists" />
            <SideBarItem link="/savedAlbums" iconName={IconAlbum} text="Álbuns Salvos" />
            <SideBarItem link="/myAlbums" iconName={IconAlbumOff} text="Meus Álbuns" />
            <SideBarLabel label="Outros" />
            <SideBarItem link="radio" iconName={IconRadio} text="Rádio" />
        </nav>
    );
}