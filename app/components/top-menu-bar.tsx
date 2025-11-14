"use client";

import React, { useContext, useEffect, useState } from "react";
import ArrowForwardIcon from "../icons/ArrowForward.svg";
import ShadowLogo from "../icons/appSwitcherIcons/shadow.png";
import "./top-menu-bar.scss";
// import {
//     ExternalUser,
//     isErrorCode,
//     SdkErrors,
// } from "@tonomy/tonomy-id-sdk";
// import { AuthContext } from "../../tonomyAppList/providers/AuthProvider";
// import LogoutIcon from "../icons/Logout.svg'";
import KeyboardArrowDownIcon from "../icons/KeyboardArrawDown.svg";
import KeyboardArrowUpIcon from "../icons/KeyboardArrowUp.svg";
import AppSwitcherIcon from "../icons/app-switcher.png";
import AppSwitcher from "./app-switcher";
// import useErrorStore from "../../common/stores/errorStore";
import Debug from "debug";
const debug = Debug("tonomy-app-websites:accounts:pages:Login");

const TopMenuBar = () => {
  // const { signout, signin } = useContext(AuthContext);
  // const [username, setUsername] = useState<string>("");
  const [showSwitcher, setShowSwitcher] = useState(false);
  // const [open, setOpen] = useState(false);
  // const errorStore = useErrorStore();
  const username = false; // placeholder for username state

  // useEffect(() => {
  //     async function authentication() {
  //         try {
  //             const externalUser = await ExternalUser.getUser({
  //                 autoLogout: false,
  //             });
  //             debug("externalUser", externalUser);
  //             if (externalUser) {
  //                 signin(externalUser);
  //                 const uname = await externalUser.getUsername();
  //                 if (!uname) throw new Error("No username found");
  //                 setUsername(uname.getBaseUsername());
  //             } else {
  //                 setUsername("");
  //             }
  //         } catch (e) {
  //             console.log("e", e);
  //             if (
  //                 isErrorCode(e, [
  //                     SdkErrors.AccountNotFound,
  //                     SdkErrors.UserNotLoggedIn,
  //                     SdkErrors.AccountDoesntExist,
  //                 ])
  //             ) {
  //                 setUsername("");
  //             } else {
  //                 errorStore.setError({ error: e, expected: false });
  //             }
  //         }
  //     }
  //     authentication();
  // }, []); // watch for changes

  // function handleLogout() {
  //     signout();
  //     setUsername("");
  // }

  async function onButtonPress() {
    // ExternalUser.loginWithTonomy({
    //     callbackPath: '/callback',
    //     dataRequest: { username: true },
    // });
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "/";

  return (
    <div className="tonomy-header">
      <div className="tonomy-title">
        <a
          href={origin}
          className="tonomy-title"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={ShadowLogo.src}
            alt="Tonomy Logo"
            className="tonomy-logo"
            width={37}
            height={37}
          />
          <h1 className="tonomy-main-title">Tonomy Shadow Chat</h1>
        </a>
      </div>
      <div className="tonomy-time-container">
        <div className="switcher-container">
          <img
            src={AppSwitcherIcon.src}
            alt="App Switcher"
            className="tonomy-logo cursor-pointer"
            width={18}
            height={18}
            onClick={() => setShowSwitcher(!showSwitcher)}
          />
          {showSwitcher && <AppSwitcher />}
        </div>

        {username ? (
          // <div className="dropdown">
          //     {/* Trigger */}
          //     <div className="dropdown-trigger" onClick={() => setOpen(!open)}>
          //         <span className="username">@{username}</span>
          //         {open ? (
          //             <KeyboardArrowUpIcon className="arrow" />
          //         ) : (
          //             <KeyboardArrowDownIcon className="arrow" />
          //         )}
          //     </div>

          //     {/* Dropdown menu */}
          //     {open && (
          //         <div className="dropdown-menu cursor-pointer">
          //             <button className="dropdown-item" onClick={handleLogout}>
          //                 Log out
          //                 <LogoutIcon className="icon" />
          //             </button>
          //         </div>
          //     )}
          // </div>
          <> </>
        ) : (
          <>
            <span onClick={() => onButtonPress()} className="tonomy-time">
              Login
            </span>
            <ArrowForwardIcon
              onClick={() => onButtonPress()}
              className="tonomy-arrow-icon cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TopMenuBar;
