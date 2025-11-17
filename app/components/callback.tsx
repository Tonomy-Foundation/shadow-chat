"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-context";
import LoadingIcon from "../icons/three-dots.svg";

export default function Callback() {
  const router = useRouter();
  const { login, logout } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function finalize() {
      try {
        const { ExternalUser } = await import("@tonomy/tonomy-id-sdk");
        const { user } = await ExternalUser.verifyLoginResponse();
        if (!cancelled) {
          if (user) {
            login(user);
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

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingIcon />
    </div>
  );
}
