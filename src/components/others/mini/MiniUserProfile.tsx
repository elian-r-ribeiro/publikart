'use client';

import Image from "next/image";

export default function MiniUserProfile() {
    return (
        <div className="flex items-center mt-5 gap-3 changeScaleOnHoverDefaultStyle cursor-pointer" onClick={() => window.location.href = "/profile"}>
            <Image className="rounded-full" width={60} height={60} alt="Profile Image" src={"https://media.istockphoto.com/id/1248347439/vector/elegant-black-head-wolf-art-logo-design-inspiration.jpg?s=612x612&w=0&k=20&c=UcvfTH0zQwwNXFxjZ7iWgxDQQ4YJXVtaczECJZa_uCI="} />
            <div className="flex flex-col">
                <span className="max-w-[200px] truncate overflow-hidden whitespace-nowrap font-medium">
                    Elian "Lobo" Ribeiro
                </span>
                <span className="text-xs text-zinc-400">Ver perfil</span>
            </div>
        </div>
    );
}