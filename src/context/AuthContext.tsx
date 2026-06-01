"use client";

import { createContext, useContext, useMemo, useCallback, type ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import type { AuthContextType, User } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);

const ONBOARDED_KEY = "geoai_onboarded";
const WEBSITE_KEY = "geoai_website";

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();

  const user: User | null = useMemo(() => {
    if (!session?.user) return null;
    return {
      id: session.user.id || undefined,
      name: session.user.name || undefined,
      email: session.user.email || undefined,
      picture: session.user.image || undefined,
      onboarded: localStorage.getItem(ONBOARDED_KEY) === "true",
      website: localStorage.getItem(WEBSITE_KEY) || undefined,
      auth_provider: (session.user as any)?.provider === "google" ? "google" : "credentials",
    };
  }, [session]);

  const refreshUser = useCallback(() => {
    update();
  }, [update]);

  const logout_ = useCallback(async () => {
    localStorage.removeItem(ONBOARDED_KEY);
    localStorage.removeItem(WEBSITE_KEY);
    await signOut({ callbackUrl: "/login" });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading: status === "loading",
      logout: logout_,
      refreshUser,
      setUser: () => {},
    }}>
      {children}
    </AuthContext.Provider>
  );
}
