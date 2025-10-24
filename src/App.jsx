import React from "react";
import Hero from "./components/Hero.jsx";
import HowItWorks from "./components/HowItWorks.jsx";

function NeroLanding() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Ambient background layer; harmless if the class has no styles */}
      <div className="fx-grid" aria-hidden="true"></div>

      <Hero />
      <HowItWorks />

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

export default function App() {
  // Quick runtime breadcrumb in the browser console
  console.log("App mounted: rendering NeroLanding");
  return <NeroLanding />;
}

export { NeroLanding };

