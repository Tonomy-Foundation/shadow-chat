"use client";

import { Home } from "./components/home";
import Start from "./components/start";
import { useAuth } from "./auth-context";
import "./tonomy-settings";

export default function App() {
  const { ready, loggedIn } = useAuth();
  if (!ready) return <div>Loading...</div>;
  return loggedIn ? <Home /> : <Start />;
}
