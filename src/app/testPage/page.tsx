'use client'

import { useState } from "react";

export default function TestPage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 h-screen">
            <label htmlFor="fileInput" className="cursor-pointer">
                <img
                    src={imageSrc || 'https://t3.ftcdn.net/jpg/02/70/09/98/360_F_270099822_9zbx236dHn1hyxYNl9HSOBvpUEpU0eOz.jpg'}
                    alt="Camera"
                    className="w-64 h-64 object-cover border-2 border-gray-300 rounded-md"
                />
            </label>

            <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
        </div>
    )
}