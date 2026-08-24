import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// Register the service worker for web push notifications.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw-enhanced.js`, { updateViaCache: 'none' }).catch(error => {
    console.log('Service Worker registration failed:', error);
  });
}
