"use client";
import { Session } from "@/lib/types/types";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<Session | null>(null);
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  return session;
}
