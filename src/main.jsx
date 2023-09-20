import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Check if the browser supports service workers
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        console.log("Service Worker loaded");
        navigator.serviceWorker
            .register("/service-worker.js") // Path to your service worker file
            .then((registration) => {
                console.log(
                    "Service Worker registered with scope:",
                    registration.scope
                );
            })
            .catch((error) => {
                console.error("Service Worker registration failed:", error);
            });
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
