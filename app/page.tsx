// import { Home } from "./components/home";
import Start from "./components/start";
import TopMenuBar from "./components/top-menu-bar";

export default async function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopMenuBar />
      <div style={{ flex: 1 }}>
        <Start />
      </div>
    </div>
  );
}
