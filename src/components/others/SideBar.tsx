import { IconAlbum, IconFolder, IconMusic, IconPlaylist, IconPlaylistAdd, IconRadio, IconUsersGroup } from "@tabler/icons-react";
import SideBarItem from "./SideBarItem";
import SideBarLabel from "./SideBarLabel";
import MiniUserProfile from "./MiniUserProfile";

export default function SideBar() {
    return (
        <nav className="w-80 flex flex-col gap-6 my-4 mx-4">
            <MiniUserProfile />
            <SideBarLabel label="Para você" />
            <SideBarItem link="explore" iconName={IconFolder} text="Explorar" />
            <SideBarItem link="songs" iconName={IconMusic} text="Músicas" />
            <SideBarItem link="artists" iconName={IconUsersGroup} text="Compositores" />
            <SideBarItem link="albums" iconName={IconAlbum} text="Álbuns" />
            <SideBarLabel label="Playlists" />
            <SideBarItem link="publicPlaylists" iconName={IconPlaylist} text="Playlists Públicas" />
            <SideBarItem link="myPlaylists" iconName={IconPlaylistAdd} text="Minhas Playlists" />
            <SideBarLabel label="Outros" />
            <SideBarItem link="radio" iconName={IconRadio} text="Rádio" />
        </nav>
    );
}