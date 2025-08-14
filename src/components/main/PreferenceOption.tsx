'use client'

import { Icon } from "@tabler/icons-react";

interface PreferenceOptionProps {
    text: string;
    iconName: Icon;
    isDisabled?: boolean;
    onClick?: () => void;
};

export default function PreferenceOption(props: PreferenceOptionProps) {

    function renderText(text: string) {
        return (
            <span className="text-xl font-black">
                {text}
            </span>
        );
    };

    function renderIcon(IconName: Icon) {
        return (<IconName size={90} />);
    };

    function renderTextDisabled(text: string) {
        return (
            <span className="text-xl font-black blur">
                {text}
            </span>
        );
    };

    function renderIconDisabled(IconName: Icon) {
        return (
            <IconName className="blur" size={90}></IconName>
        );
    };

    return (
        <>
            {props.isDisabled ? (
                <div className="h-50 w-50 border-2 rounded-2xl centerItems text-center backdrop-blur">
                    <span className="absolute text-2xl font-black">Em breve</span>
                    {renderIconDisabled(props.iconName)}
                    {renderTextDisabled(props.text)}
                </div>
            ) : (
                <div onClick={props.onClick} className="h-50 w-50 border-2 rounded-2xl centerItems text-center backdrop-blur changeScaleOnHoverDefaultStyle cursor-pointer">
                    {renderIcon(props.iconName)}
                    {renderText(props.text)}
                </div>
            )};
        </>
    );
};