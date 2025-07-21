import { IconAlbum, IconFolder, IconMusic, IconPlaylist, IconPlaylistAdd, IconRadio, IconUsersGroup } from "@tabler/icons-react";
import SideBarItem from "./SideBarItem";
import SideBarLabel from "./SideBarLabel";
import MiniUserProfile from "./MiniUserProfile";

export default function SideBar() {
    return (
        <nav className="w-80 flex flex-col gap-6 my-4 mx-4">
            <MiniUserProfile />
            <SideBarLabel label="Para você" />
            <SideBarItem iconName={IconFolder} text="Explorar" />
            <SideBarItem iconName={IconMusic} text="Músicas" />
            <SideBarItem iconName={IconUsersGroup} text="Compositores" />
            <SideBarItem iconName={IconAlbum} text="Álbuns" />
            <SideBarLabel label="Playlists" />
            <SideBarItem iconName={IconPlaylist} text="Playlists Públicas" />
            <SideBarItem iconName={IconPlaylistAdd} text="Minhas Playlists" />
            <SideBarLabel label="Outros" />
            <SideBarItem iconName={IconRadio} text="Rádio" />
        </nav>
    );
}