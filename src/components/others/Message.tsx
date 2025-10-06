interface MessageProps {
    message: string,
    setIsShow: (value: boolean) => void
}

export default function Message(props: MessageProps) {
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur">
            <div className="bg-zinc-700/40 p-8 rounded-lg shadow-lg text-center min-w-128 max-w-128">
                <p className="text-lg mb-4">{props.message}</p>
                <button
                    onClick={() => props.setIsShow(false)}
                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Ok
                </button>
            </div>
        </div>
    );
}