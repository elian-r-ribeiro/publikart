'use client'
import Loading from "@/components/others/Loading";
import { createContext, SetStateAction, useContext, useState } from "react";

type LoadingContextType = {
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
    setLoadingMessage: React.Dispatch<SetStateAction<string>>;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>("Carregando...");

    return (
        <LoadingContext.Provider value={{ setIsLoading, setLoadingMessage }}>
            {isLoading && <Loading text={loadingMessage} isSupposedToBeStatic={true} />}
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading(): LoadingContextType {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useLoading deve ser usado dentro de um LoadingProvider");
    }

    return context;
}
