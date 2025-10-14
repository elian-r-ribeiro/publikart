'use client'

import Message from "@/components/others/Message";
import React, { createContext, useContext, useState } from "react";

type MessageContextType = {
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setOnConfirmFunction: React.Dispatch<React.SetStateAction<(() => void) | null>>;
    setOptionalOnDismissFunction: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: React.ReactNode }) {

    const [show, setIsShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [onConfirmFunction, setOnConfirmFunction] = useState<(() => void) | null>(null);
    const [optionalOnDismissFunction, setOptionalOnDismissFunction] = useState<any>(null);

    return (
        <MessageContext.Provider value={{ setIsShow, setMessage, setOnConfirmFunction, setOptionalOnDismissFunction }}>
            {show && (
                <Message optionalOnDismissFunction={optionalOnDismissFunction} onConfirmFunction={onConfirmFunction} setOnConfirmFunction={setOnConfirmFunction} message={message} setIsShow={setIsShow} />
            )}
            {children}
        </MessageContext.Provider>
    );
}

export function useMessage(): MessageContextType {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error("useMessage deve ser usado dentro de um MessageProvider");
    }

    return context;
}