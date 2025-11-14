"use client";

import { setFetch, setSettings } from "@tonomy/tonomy-id-sdk";

const origin = typeof window !== "undefined" ? window.location.origin : "/";

if (origin === "https://chat.tonomy.io") {
  setSettings({
    blockchainUrl: "https://pangea.eosusa.io",
    ssoWebsiteOrigin: "https://accounts.tonomy.io",
    communicationUrl: "wss://communication.tonomy.io",
    currencySymbol: "TONO",
  });
} else {
  setSettings({
    blockchainUrl: "https://test.pangea.eosusa.io",
    ssoWebsiteOrigin: "https://accounts.testnet.tonomy.io",
    communicationUrl: "wss://communication.testnet.tonomy.io",
    currencySymbol: "TONO",
  });
}

setFetch(window.fetch.bind(window));
