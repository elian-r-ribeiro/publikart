interface LoadingProps {
    isSupposedToBeStatic: boolean,
    show?: boolean,
    text: string
}

export default function Loading(props: LoadingProps) {
    if (!props.show && !props.isSupposedToBeStatic) return null;

    return (
        <div className="fixed backdrop-blur inset-0 flex items-center justify-center z-50">
            <div className="bg-zinc-700/40 p-8 rounded-lg shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600"></div>
                <p className="text-white">{props.text}</p>
            </div>
        </div>
    )
}