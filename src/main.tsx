import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const scope = import.meta.env.BASE_URL || "/";
    navigator.serviceWorker
      .register(`${scope}sw.js`, { scope })
      .then(() => console.log("[PWA] Service worker registered."))
      .catch((error) => console.error("[PWA] Service worker registration failed:", error));
  });
}
