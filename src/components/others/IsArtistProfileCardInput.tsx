import { UseFormRegister } from "react-hook-form";

interface IsArtistProfileCardInputProps {
    isArtistDefaultChecked: boolean,
    register: UseFormRegister<any>
}

export default function IsArtistProfileCardInput(props: IsArtistProfileCardInputProps) {
    return (
        <div className="changeScaleOnHoverDefaultStyle flex items-center gap-2">
            <input type="checkbox"
                defaultChecked={props.isArtistDefaultChecked}
                className="size-6 transform cursor-pointer appearance-none rounded-lg border-2 border-[#ffffff] transition duration-[120ms] ease-in-out checked:border-none checked:border-[#ffffff] checked:bg-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50"
                {...props.register("isArtist")}
            />
            <span>Sou compositor</span>
        </div>
    );
}