"use client";

import React from "react";
import "./start.scss";
import ShadowLogo from "../icons/appSwitcherIcons/shadow.png";
import { ExternalUser } from "@tonomy/tonomy-id-sdk";

export default function Start() {
  async function onButtonPress() {
    try {
      await ExternalUser.loginWithTonomy({
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
