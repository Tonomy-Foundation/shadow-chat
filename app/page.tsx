"use client";

import { Home } from "./components/home";
import Start from "./components/start";
import { useAuth } from "./auth-context";
import LoadingIcon from "./icons/three-dots.svg";

export default function App() {
  const { ready, loggedIn } = useAuth();
  if (!ready)
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingIcon />
      </div>
    );
  return loggedIn ? <Home /> : <Start />;
}
