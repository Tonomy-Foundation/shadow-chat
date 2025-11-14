"use client";

import { Home } from "./components/home";
import Start from "./components/start";
import "./tonomy-settings";
import { useAuth } from "./auth-context";

export default function App() {
  const { ready, loggedIn } = useAuth();
  if (!ready) return <div>Loading...</div>;
  return loggedIn ? <Home /> : <Start />;
}
