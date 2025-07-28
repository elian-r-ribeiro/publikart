import { IconDots } from "@tabler/icons-react";

export default function Header() {
    return (
        <div className="backdrop-blur h-20 flex justify-center items-center border-b border-zinc-700 gap-4">
            <IconDots className="md:hidden lg:hidden" />
            <input className="inputDefaultStyle" type="text" placeholder="Procurar..." />
        </div>
    );
}