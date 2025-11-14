"use client";

import { setSettings } from "@tonomy/tonomy-id-sdk";

if (process.env.NEXT_PUBLIC_TONOMY_ENV === "production") {
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
