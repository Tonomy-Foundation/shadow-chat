"use client";

import {
  AppsExternalUser,
  isErrorCode,
  SdkErrors,
} from "@tonomy/tonomy-id-sdk";
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

  // On load, check current session with Tonomy SDK and set auth state accordingly
  useEffect(() => {
    let cancelled = false;

    // prefill from localStorage for a snappier first paint
    try {
      const v =
        typeof window !== "undefined"
          ? window.localStorage.getItem(STORAGE_KEY)
          : null;
      _setLoggedIn(!!v);
    } catch {
      _setLoggedIn(false);
    }

    const initializeOnStart = async () => {
      try {
        const user = await AppsExternalUser.getUser({ autoLogout: false });
        if (cancelled) return;
        if (user) {
          login();
        } else {
          logout();
        }
      } catch (e) {
        if (
          isErrorCode(e, [
            SdkErrors.AccountNotFound,
            SdkErrors.AccountDoesntExist,
            SdkErrors.UserNotLoggedIn,
          ])
        ) {
          logout();
        } else {
          console.error(e);
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    initializeOnStart();
    return () => {
      cancelled = true;
    };
  }, [login, logout]);

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
