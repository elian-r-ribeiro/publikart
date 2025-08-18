import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

interface DefaultImageInputProps {
    imageSrc: string;
    setImageSrc: Dispatch<SetStateAction<string | null>>
    defaultImageURL?: string;
    register: UseFormRegister<any>;
    isRequired: boolean;
}

export default function DefaultImageInput(props: DefaultImageInputProps) {

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
                    src={props.imageSrc || props.defaultImageURL || 'https://t3.ftcdn.net/jpg/02/70/09/98/360_F_270099822_9zbx236dHn1hyxYNl9HSOBvpUEpU0eOz.jpg'}
                    alt="Image"
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
                {...props.register("imageInput", {
                    required: props.isRequired ? "A imagem é obrigatória" : false,
                    onChange: (e) => {
                        handleImageChange(e);
                    }
                })}
            />

        </div>
    );
}
