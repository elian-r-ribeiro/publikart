import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

interface ProfileCardImageInputProps {
    imageSrc: string;
    profilePictureURL: string;
    register: UseFormRegister<any>;
    setProfilePicture: React.Dispatch<React.SetStateAction<FileList | null>>;
    setImageSrc: Dispatch<SetStateAction<string | null>>
}

export default function ProfileCardImageInput(props: ProfileCardImageInputProps) {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            props.setImageSrc(imageUrl);
        }
    };

    return (
        <div>
            <label htmlFor="fileInput" className="cursor-pointer">
                <Image
                    src={props.imageSrc || props.profilePictureURL}
                    alt="Profile Picture"
                    height={128}
                    width={128}
                    className="w-32 h-32 object-cover border-2 border-gray-300 rounded-full"
                />
            </label>

            <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                {...props.register("profilePicture")}
                onChange={(e) => {
                    handleImageChange(e);
                    props.setProfilePicture(e.target.files);
                }}
            />
        </div>
    );
}
