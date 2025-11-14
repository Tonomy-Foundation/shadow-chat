"use client";

import { setSettings } from "@tonomy/tonomy-id-sdk";

// setSettings({
//   blockchainUrl: "https://pangea.eosusa.io",
//   ssoWebsiteOrigin: "https://accounts.tonomy.io",
//   communicationUrl: "wss://communication.tonomy.io",
//   currencySymbol: "TONO",
// });

setSettings({
  blockchainUrl: "https://test.pangea.eosusa.io",
  ssoWebsiteOrigin: "https://accounts.testnet.tonomy.io",
  communicationUrl: "wss://communication.testnet.tonomy.io",
  currencySymbol: "TONO",
});
