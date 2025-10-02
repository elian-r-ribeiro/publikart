'use client'
import Loading from "@/components/others/Loading";
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<any>(null);

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

export function useLoading() {
    return useContext(LoadingContext);
}
