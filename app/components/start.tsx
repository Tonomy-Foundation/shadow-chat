"use client";

import React, { useEffect } from "react";
import { AppsExternalUser } from "@tonomy/tonomy-id-sdk";
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
    AppsExternalUser.loginWithTonomy({
      callbackPath: "/callback",
      dataRequest: { username: true },
    });
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
          <p className="demo-secondary">A research lab project.</p>
          <p className="demo-main">Your sovereign AI assistant.</p>
          <p className="demo-main">
            No prompts or responses are ever sent to external servers,
            guaranteeing your privacy.
          </p>

          <button className="console-login-button" onClick={onButtonPress}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>Login with Tonomy ID</span>
            </div>
          </button>
        </div>
      </header>
    </div>
  );
}
