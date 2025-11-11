"use client";

// import { Home } from "./components/home";
import { setSettings } from "@tonomy/tonomy-id-sdk";
import Start from "./components/start";
import TopMenuBar from "./components/top-menu-bar";

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

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopMenuBar />
      <div style={{ flex: 1 }}>
        <Start />
      </div>
    </div>
  );
}
