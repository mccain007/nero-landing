// src/App.jsx
import React from "react";
import Hero from "./components/Hero.jsx";
import HowItWorks from "./components/HowItWorks.jsx";

// Optional: if you’re running Nero’s reduced-motion detection globally
import "./utils/reduce-motion.js";

// ------------------------------------------------------------
// Main landing page component
// ------------------------------------------------------------
function NeroLanding() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-400/30">
      {/* Ambient animated grid background */}
      <div className="fx-grid" aria-hidden="true"></div>

      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Optional footer placeholder */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 0",
          color: "var(--nero-text-2)",
          fontSize: "0.9rem",
        }}
      >
        © {new Date().getFullYear()} NERO • Intelligent Systems Lab
      </footer>
    </div>
  );
}

// ------------------------------------------------------------
// Entry point for Vite / ReactDOM.createRoot()
// ------------------------------------------------------------
export default function App() {
  return <NeroLanding />;
}

// Named export (handy for testing or storybook)
export { NeroLanding };

