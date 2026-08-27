import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// Remove service workers and their caches left by earlier PWA releases.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

if ("caches" in window) {
  caches.keys().then((names) => {
    names
      .filter((name) => name.startsWith("ahenkan-"))
      .forEach((name) => caches.delete(name));
  });
}
