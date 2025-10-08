interface MessageProps {
    message: string,
    setIsShow: (value: boolean) => void,
    onConfirmFunction: any,
    optionalOnDismissFunction?: any,
    setOnConfirmFunction: any
}

export default function Message(props: MessageProps) {

    const changeStatesOnConfirmFunction = async (isConfirmed: boolean) => {
        props.setIsShow(false);
        if (isConfirmed === true) await props.onConfirmFunction();
        props.setOnConfirmFunction(null);
    }

    const executeOptionalOnDismissFunction = async () => {
        props.setIsShow(false);
        if (props.optionalOnDismissFunction != null) props.optionalOnDismissFunction();
    }

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur">
            <div className="bg-zinc-700/40 p-8 rounded-lg shadow-lg text-center min-w-128 max-w-128">
                <p className="text-lg mb-4">{props.message}</p>
                {props.onConfirmFunction === null &&
                    <button
                        onClick={() => executeOptionalOnDismissFunction()}
                        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                    >Ok</button>
                }
                {props.onConfirmFunction != null &&
                    <div className="centerItemsRow p-4 gap-3">
                        <button
                            onClick={() => changeStatesOnConfirmFunction(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                        >Sim</button>

                        <button
                            onClick={() => changeStatesOnConfirmFunction(false)}
                            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                        >Não</button>
                    </div>
                }

            </div>
        </div>
    );
}