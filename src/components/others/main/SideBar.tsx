import { IconAlbum, IconFolder, IconMusic, IconPlaylist, IconPlaylistAdd, IconRadio, IconUsersGroup } from "@tabler/icons-react";
import SideBarItem from "./SideBarItem";
import SideBarLabel from "./SideBarLabel";
import MiniUserProfile from "../mini/MiniUserProfile";

export default function SideBar() {
    return (
        <nav className="hidden w-80 lg:flex flex-col gap-5 my-4 mx-4">
            <MiniUserProfile />
            <SideBarLabel label="Para você" />
            <SideBarItem link="/explore" iconName={IconFolder} text="Explorar" />
            <SideBarItem link="/songs" iconName={IconMusic} text="Músicas" />
            <SideBarItem link="/artists" iconName={IconUsersGroup} text="Compositores" />
            <SideBarLabel label="Playlists" />
            <SideBarItem link="/publicPlaylists" iconName={IconPlaylist} text="Playlists Públicas" />
            <SideBarItem link="/savedPlaylists" iconName={IconPlaylistAdd} text="Playlists Salvas" />
            <SideBarItem link="/myPlaylists" iconName={IconPlaylistAdd} text="Minhas Playlists" />
            <SideBarLabel label="Álbuns" />
            <SideBarItem link="/publicAlbums" iconName={IconAlbum} text="Álbuns Públicos" />
            <SideBarItem link="/savedAlbums" iconName={IconAlbum} text="Álbuns Salvos" />
            <SideBarItem link="/myAlbums" iconName={IconAlbum} text="Meus Álbuns" />
            <SideBarLabel label="Outros" />
            <SideBarItem link="radio" iconName={IconRadio} text="Rádio" />
        </nav>
    );
}