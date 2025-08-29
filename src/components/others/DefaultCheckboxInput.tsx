import { UseFormRegister } from "react-hook-form";

interface DefaultCheckboxInputProps {
    defaultChecked: boolean,
    register: UseFormRegister<any>,
    registerName: string,
    inputText: string
}

export default function DefaultCheckboxInput(props: DefaultCheckboxInputProps) {
    return (
        <div className="changeScaleOnHoverDefaultStyle flex items-center gap-2">
            <input type="checkbox"
                defaultChecked={props.defaultChecked}
                className="size-6 transform cursor-pointer appearance-none rounded-lg border-2 border-[#ffffff] transition duration-[120ms] ease-in-out checked:border-none checked:border-[#ffffff] checked:bg-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50"
                {...props.register(props.registerName)}
            />
            <span>{props.inputText}</span>
        </div>
    );
}