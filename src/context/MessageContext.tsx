'use client'

import Message from "@/components/others/Message";
import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext<any>(null);

export function MessageProvider({ children }: { children: React.ReactNode }) {

    const [show, setIsShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    return (
        <MessageContext.Provider value={{ setIsShow, setMessage }}>
            {show && (
                <Message message={message} setIsShow={setIsShow} />
            )}
            {children}
        </MessageContext.Provider>
    );
}

export function useMessage() {
    return useContext(MessageContext);
}