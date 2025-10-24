import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global Nero design system (tokens/typography/motion)
import "./styles/nero.tokens.css";
import "./styles/typography.css";
import "./styles/motion.css";

// Reduced-motion runtime hook (safe if missing; comment out if you didn't add it)
import "./utils/reduce-motion.js";

const rootEl = document.getElementById("root");

// Safety guard: if mount node missing, show a helpful message
if (!rootEl) {
  const fallback = document.createElement("pre");
  fallback.textContent = "Mount node #root not found. Check index.html.";
  document.body.appendChild(fallback);
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

