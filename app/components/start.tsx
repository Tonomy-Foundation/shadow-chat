"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  AppsExternalUser,
  isErrorCode,
  SdkErrors,
} from "@tonomy/tonomy-id-sdk";
// import settings from "../../common/settings";
import "./start.scss";
// import { TP, TH2 } from "../../common/atoms/THeadings";
// import { useNavigate } from "react-router-dom";
// import useErrorStore from "../../common/stores/errorStore";
// import { AuthContext } from "../../tonomyAppList/providers/AuthProvider";
import ShadowLogo from "../icons/appSwitcherIcons/shadow.png";

export default function Start() {
  // const { signin } = useContext(AuthContext);
  // const [loading, setLoading] = useState(true);
  // const navigation = useNavigate();
  // const errorStore = useErrorStore();

  // async function onRender() {
  //     try {
  //         const user = await AppsExternalUser.getUser({ autoLogout: false });
  //         if (user) {
  //             signin(user, "bankless/swap");
  //         }

  //         setLoading(false);
  //     } catch (e) {
  //         if (
  //             isErrorCode(e, [
  //                 SdkErrors.AccountNotFound,
  //                 SdkErrors.AccountDoesntExist,
  //                 SdkErrors.UserNotLoggedIn,
  //             ])
  //         ) {
  //             // User not logged in
  //             setLoading(false);
  //             navigation("/bankless");
  //             return;
  //         }

  //         errorStore.setError({ error: e, expected: false });
  //     }
  // }

  // useEffect(() => {
  //     onRender();
  // }, []);

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
