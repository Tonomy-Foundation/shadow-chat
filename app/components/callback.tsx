"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExternalUser } from "@tonomy/tonomy-id-sdk";
import { useAuth } from "../auth-context";

export default function Callback() {
  const router = useRouter();
  const { login, logout } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function finalize() {
      try {
        const { user } = await ExternalUser.verifyLoginResponse();
        if (!cancelled) {
          if (user) {
            login();
          } else {
            logout();
          }
        }
      } catch (e) {
        console.error("Callback() error:", e);
        if (!cancelled) {
          logout();
        }
      } finally {
        router.replace("/");
      }
    }
    finalize();
    return () => {
      cancelled = true;
    };
  }, [login, logout, router]);

  return <div>Redirecting...</div>;
}
