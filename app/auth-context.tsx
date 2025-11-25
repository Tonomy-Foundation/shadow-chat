"use client";

import { ExternalUser, isErrorCode, SdkErrors } from "@tonomy/tonomy-id-sdk";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initTonomySettings } from "./tonomy-settings";

type AuthContextValue = {
  ready: boolean;
  loggedIn: boolean;
  login: (user: ExternalUser) => void;
  logout: () => void;
  setLoggedIn: (v: boolean) => void;
  user?: ExternalUser;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "tonomy:loggedIn";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loggedIn, _setLoggedIn] = useState(false);
  const [user, setUser] = useState<ExternalUser | undefined>(undefined);

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

  const login = useCallback(
    (user: ExternalUser) => {
      setUser(user);
      setLoggedIn(true);
    },
    [setLoggedIn],
  );
  const logout = useCallback(() => {
    if (user) {
      user.logout();
    }
    setUser(undefined);
    setLoggedIn(false);
  }, [setLoggedIn, user]);

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
    } finally {
      setReady(true);
    }

    const initializeOnStart = async () => {
      try {
        await initTonomySettings();
        const user = await ExternalUser.getUser({ autoLogout: false });
        if (cancelled) return;
        if (user) {
          login(user);
        } else {
          logout();
        }
      } catch (e) {
        try {
          if (
            isErrorCode(e, [
              SdkErrors.AccountNotFound,
              SdkErrors.AccountDoesntExist,
              SdkErrors.UserNotLoggedIn,
            ])
          ) {
            logout();
          } else {
            console.error("initializeOnStart() error:", e);
          }
        } catch {
          console.error("initializeOnStart() secondary error:", e);
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
    () => ({ ready, loggedIn, login, logout, setLoggedIn, user }),
    [ready, loggedIn, login, logout, setLoggedIn, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
