interface SideBarProps {
    label: string
}

export default function SideBarLabel(props: SideBarProps) {
    return (
        <div className="text-xs text-zinc-400 mt-5">
            {props.label}
        </div>
    );
}