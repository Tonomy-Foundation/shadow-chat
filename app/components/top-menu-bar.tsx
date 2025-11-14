"use client";

import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "../icons/ArrowForward.svg";
import ShadowLogo from "../icons/appSwitcherIcons/shadow.png";
import "./top-menu-bar.scss";
import LogoutIcon from "../icons/Logout.svg";
import KeyboardArrowDownIcon from "../icons/KeyboardArrawDown.svg";
import KeyboardArrowUpIcon from "../icons/KeyboardArrowUp.svg";
import AppSwitcherIcon from "../icons/app-switcher.png";
import AppSwitcher from "./app-switcher";
import Debug from "debug";
import { ExternalUser } from "@tonomy/tonomy-id-sdk";
import { useAuth } from "../auth-context";
const debug = Debug("tonomy-app-websites:accounts:pages:Login");

const TopMenuBar = () => {
  const { logout, user } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    setUsername("");
  }

  async function onButtonPress() {
    try {
      ExternalUser.loginWithTonomy({
        callbackPath: "/callback",
        dataRequest: { username: true },
      });
    } catch (e) {
      console.error("onButtonPress() error", e);
    }
  }

  useEffect(() => {
    async function fetchUsername() {
      if (user) {
        const username = await user.getUsername();
        if (username) {
          setUsername(username.getBaseUsername());
        } else {
          console.error("Username not found on user object");
        }
      }
    }
    fetchUsername();
  }, [user]);

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
          <div className="dropdown">
            {/* Trigger */}
            <div className="dropdown-trigger" onClick={() => setOpen(!open)}>
              <span className="username">@{username}</span>
              {open ? (
                <KeyboardArrowUpIcon className="arrow" />
              ) : (
                <KeyboardArrowDownIcon className="arrow" />
              )}
            </div>

            {/* Dropdown menu */}
            {open && (
              <div className="dropdown-menu cursor-pointer">
                <button className="dropdown-item" onClick={handleLogout}>
                  Log out
                  <LogoutIcon className="icon" />
                </button>
              </div>
            )}
          </div>
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
