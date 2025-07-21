import { Icon } from "@tabler/icons-react";

interface SideBarItemProps {
    text: string,
    iconName: Icon
}

export default function SideBarItem(props: SideBarItemProps) {
    return (
        <div className="flex gap-2 changeScaleOnHoverDefaultStyle cursor-pointer">
            {renderIcon(props.iconName)}
            <span>{props.text}</span>
        </div>
    );
}

function renderIcon(IconName: Icon) {
    return (<IconName />);
}