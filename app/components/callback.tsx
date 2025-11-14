"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppsExternalUser } from "@tonomy/tonomy-id-sdk";
import { useAuth } from "../auth-context";
import "../tonomy-settings";

export default function Callback() {
  const router = useRouter();
  const { login, logout } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function finalize() {
      try {
        const user = await AppsExternalUser.getUser({ autoLogout: false });
        if (!cancelled) {
          if (user) {
            login();
            router.replace("/");
          } else {
            logout();
            router.replace("/");
          }
        }
      } catch (_) {
        if (!cancelled) {
          logout();
          router.replace("/");
        }
      }
    }
    finalize();
    return () => {
      cancelled = true;
    };
  }, [login, logout, router]);

  return <div>Redirecting...</div>;
}
