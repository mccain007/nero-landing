import React from "react";

export default function Hero() {
  return (
    <section
      className="hero-wrap"
      style={{ padding: "var(--space-16) 0" }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 var(--space-6)",
        }}
      >
        <h1 className="hero">
          The intelligent nervous system for your home
        </h1>

        <p className="lede" style={{ marginTop: "var(--space-4)" }}>
          Nero perceives your environment, correlates signals in real time,
          and acts—safely and autonomously.
        </p>

        <div
          style={{
            display: "flex",
            gap: "var(--space-4)",
            marginTop: "var(--space-8)",
            flexWrap: "wrap",
          }}
        >
          <a className="btn btn-primary" href="#demo">
            Launch Interactive Demo
          </a>
          <a className="btn btn-ghost" href="#how">
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}

