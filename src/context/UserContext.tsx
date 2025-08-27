'use client'
import { createContext, useContext, useEffect, useState } from "react";
import User from "@/model/User";
import { getLoggedUserInfoHook } from "@/services/AuthService";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const loggedUser = getLoggedUserInfoHook();

    useEffect(() => {
        setUser(loggedUser);
    }, [loggedUser]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export function useCurrentUser() {
    return useContext(UserContext);
}
