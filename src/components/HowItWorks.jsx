import React from "react";

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="bg-section"
      style={{ padding: "var(--space-12) 0" }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 var(--space-6)",
          display: "grid",
          gap: "var(--space-6)",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {/* Perceive */}
        <article className="nero-card" style={{ padding: "var(--space-6)" }}>
          <h2 className="h2">Perceive</h2>
          <p className="text-muted" style={{ marginTop: "var(--space-2)" }}>
            Sensors and signals captured continuously.
          </p>
          <div
            style={{
              height: 160,
              marginTop: "var(--space-4)",
              position: "relative",
            }}
          >
            <div
              className="act-ring"
              style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: 120,
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                border: "2px solid var(--nero-accent-2)",
                animation: "ringExpand var(--dur-3) var(--easing) infinite",
                opacity: 0.5,
              }}
              aria-hidden="true"
            />
          </div>
        </article>

        {/* Correlate */}
        <article className="nero-card" style={{ padding: "var(--space-6)" }}>
          <h2 className="h2">Correlate</h2>
          <p className="text-muted" style={{ marginTop: "var(--space-2)" }}>
            Signals linked and weighed to infer intent.
          </p>
          <div style={{ height: 160, marginTop: "var(--space-4)" }}>
            <svg
              viewBox="0 0 200 160"
              className="correlate-svg"
              aria-hidden="true"
              style={{ width: "100%", height: "100%" }}
            >
              <g className="nodes">
                <circle cx="32" cy="38" r="3" />
                <circle cx="84" cy="92" r="3" />
                <circle cx="120" cy="56" r="3" />
                <circle cx="162" cy="128" r="3" />
                <circle cx="56" cy="118" r="3" />
              </g>
              <g className="links">
                <line x1="32" y1="38" x2="84" y2="92" />
                <line x1="84" y1="92" x2="120" y2="56" />
                <line x1="84" y1="92" x2="162" y2="128" />
                <line x1="56" y1="118" x2="84" y2="92" />
              </g>
            </svg>
          </div>
        </article>

        {/* Act */}
        <article className="nero-card" style={{ padding: "var(--space-6)" }}>
          <h2 className="h2">Act</h2>
          <p className="text-muted" style={{ marginTop: "var(--space-2)" }}>
            Decisions executed safely at machine speed.
          </p>
          <div
            style={{
              height: 160,
              marginTop: "var(--space-4)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <button className="btn btn-primary">Trigger a safe action</button>
          </div>
        </article>
      </div>
    </section>
  );
}

