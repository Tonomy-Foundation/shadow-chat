"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-context";
import LoadingIcon from "../icons/three-dots.svg";
import { ExternalUser } from "@tonomy/tonomy-id-sdk";
import { initTonomySettings } from "../tonomy-settings";

export default function Callback() {
  const router = useRouter();
  const { login, logout } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function finalizeLogin() {
      try {
        initTonomySettings();
        const { user } = await ExternalUser.verifyLoginResponse();
        if (!cancelled) {
          login(user);
          router.replace("/");
        } else {
          console.warn("Callback: login cancelled");
        }
      } catch (e) {
        console.error("Callback() error:", e);
      }
    }
    finalizeLogin();
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
