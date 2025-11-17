"use client";

// Dynamic initializer to avoid evaluating @tonomy/tonomy-id-sdk during build/SSR.
// Call this from a client-only effect before first SDK usage.
export async function initTonomySettings() {
  // Only run in browser.
  if (typeof window === "undefined") return;
  const { setFetch, setSettings } = await import("@tonomy/tonomy-id-sdk");
  const origin = window.location.origin;
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
}

// Optionally auto-run when directly imported (defensive), but since we removed
// side-effect imports this will normally be invoked explicitly.
// void initTonomySettings();
