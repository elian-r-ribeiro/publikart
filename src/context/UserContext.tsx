'use client'
import { createContext, useContext } from "react";
import User from "@/model/User";
import { getLoggedUserInfoHook } from "@/services/AuthServiceHolder";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const user = getLoggedUserInfoHook();

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(UserContext);
}
