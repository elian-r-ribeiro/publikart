import { IconMusic } from "@tabler/icons-react";

export default function DefaultMusicComponent() {
    return (
        <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer">
            <IconMusic size={32} color="black" />
        </div>
    );
}