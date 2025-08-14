import { Icon } from "@tabler/icons-react";
import Link from "next/link";

interface SideBarItemProps {
    text: string,
    iconName: Icon,
    link: string
}

export default function SideBarItem(props: SideBarItemProps) {
    return (
        <Link className="flex gap-2 changeScaleOnHoverDefaultStyle cursor-pointer" href={props.link}>
            {renderIcon(props.iconName)}
            <span>{props.text}</span>
        </Link>
    );
}

function renderIcon(IconName: Icon) {
    return (<IconName />);
}