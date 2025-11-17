"use client";

import React, { useEffect } from "react";
import "./start.scss";
import ShadowLogo from "../icons/appSwitcherIcons/shadow.png";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../auth-context";

export default function Start() {
  // const router = useRouter();
  // const { login, logout } = useAuth();
  // useEffect(() => {
  //   if (loggedIn) {
  //     // Already logged in, send to home
  //     router.replace("/");
  //   }
  // }, [loggedIn, router]);

  async function onButtonPress() {
    try {
      const { ExternalUser } = await import("@tonomy/tonomy-id-sdk");
      ExternalUser.loginWithTonomy({
        callbackPath: "/callback",
        dataRequest: { username: true },
      });
    } catch (e) {
      console.error("onButtonPress() error", e);
    }
  }

  return (
    <div className="container">
      <header className="header-column">
        <div className="app-logo">
          <img
            src={ShadowLogo.src}
            alt="Tonomy Logo"
            className="tonomy-logo"
            width={80}
          />
        </div>
        <div className="text-center">
          <p className="demo-head">Tonomy Shadow Chat</p>
          <p className="demo-secondary">A research lab project</p>
          <p className="demo-main">
            AI that lives in your browser, not in the cloud
          </p>

          <button className="console-login-button" onClick={onButtonPress}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>Try Locally</span>
            </div>
          </button>
        </div>
      </header>
    </div>
  );
}
