"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextValue = {
  ready: boolean;
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  setLoggedIn: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "tonomy:loggedIn";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loggedIn, _setLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const v =
        typeof window !== "undefined"
          ? window.localStorage.getItem(STORAGE_KEY)
          : null;
      _setLoggedIn(!!v);
    } catch {
      _setLoggedIn(false);
    } finally {
      setReady(true);
    }
  }, []);

  const setLoggedIn = useCallback((v: boolean) => {
    _setLoggedIn(v);
    try {
      if (typeof window !== "undefined") {
        if (v) window.localStorage.setItem(STORAGE_KEY, "1");
        else window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const login = useCallback(() => setLoggedIn(true), [setLoggedIn]);
  const logout = useCallback(() => setLoggedIn(false), [setLoggedIn]);

  const value = useMemo(
    () => ({ ready, loggedIn, login, logout, setLoggedIn }),
    [ready, loggedIn, login, logout, setLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
