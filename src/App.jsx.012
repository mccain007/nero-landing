import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React, { useState, memo } from "react";

// Safe environment detection without touching the `import` identifier
let ENV_MODE = "production";
try {
  // In Vite/Pages, this will exist
  if (typeof import.meta !== "undefined" && import.meta && import.meta.env && import.meta.env.MODE) {
    ENV_MODE = import.meta.env.MODE;
  }
} catch {} // ignore if import.meta is not available

// Node fallback (tests or SSR)
if (ENV_MODE === "production" && typeof process !== "undefined" && process.env && process.env.NODE_ENV) {
  ENV_MODE = process.env.NODE_ENV;
}

const IS_DEV = ENV_MODE !== "production";
const YEAR = new Date().getFullYear();

function H1({ children }) {
  return <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">{children}</h1>;
}
function H2({ children, className = "" }) {
  return <h2 className={`font-serif text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15] ${className}`}>{children}</h2>;
}
function Lead({ children, className = "" }) {
  return <p className={`text-slate-300/95 text-lg md:text-xl leading-relaxed md:leading-[1.9] ${className}`}>{children}</p>;
}

const BackgroundFX = memo(function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl bg-fuchsia-500/15 animate-[floatA_24s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-[90px] bg-indigo-400/20 animate-[floatB_26s_ease-in-out_infinite]" />
      <div
        className="absolute inset-0 opacity-[0.06] animate-[gridSlide_30s_linear_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/0 to-slate-950/60" />
    </div>
  );
});

const FEATURE_CARDS = [
  { icon: "🛡️", title: "Guardian mode", body: "Knows who’s home, watches the perimeter, escalates only when it matters." },
  { icon: "🎩", title: "Butler mode", body: "Lights, locks, scenes, and schedules—context-aware and conversational." },
  { icon: "🤝", title: "Companion mode", body: "Proactive summaries, training recaps, and gentle nudges you opt into." },
];
const KITS = [
  { name: "Nero Core", price: "From $—", bullets: ["N150 appliance (gateway)", "Local AI + Forge", "Privacy-first"], color: "from-indigo-400 to-blue-500" },
  { name: "Vision Kit", price: "Add-on", bullets: ["PoE camera bundle", "Frigate + Face ID (local)", "Smart alerts, not spam"], color: "from-fuchsia-400 to-rose-500" },
  { name: "Sentinel Kit", price: "Add-on", bullets: ["Autonomous drone guardian", "Patrol windows + geofence", "Follow-me greeting"], color: "from-emerald-400 to-teal-500" },
];
const HOW_STEPS = [
  { t: "Perceive", d: "Cameras, sensors, and presence apps publish to Nero’s Perception Bus.", src: "/media/perceive.mp4" },
  { t: "Correlate", d: "Nero fuses signals (who / where / when) and applies privacy guardrails.", src: "/media/correlate.mp4" },
  { t: "Act", d: "Only high-confidence events become alerts, automations, or voice prompts.", src: "/media/act.mp4" },
];

function WaitlistForm() {
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const email = String(data.email || "").trim().toLowerCase();
    const name = String(data.name || "").trim();
    const company = String(data.company || "").trim();

    if (!email) {
      setStatus("err");
      setMsg("Email is required");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("ok");
      setMsg("You're on the list. Welcome aboard!");
      form.reset();
    } catch (err) {
      setStatus("err");
      setMsg("Hmm. Couldn’t submit. Try again in a minute.");
      console.error("waitlist submit failed", err);
    }
  }
  return (
    <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="text" name="name" placeholder="Name" autoComplete="name" className="rounded-xl bg-slate-900/70 px-4 py-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input type="email" name="email" placeholder="Email" autoComplete="email" required className="rounded-xl bg-slate-900/70 px-4 py-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <button disabled={status === "sending"} type="submit" className="rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 px-6 py-3 font-medium">
        {status === "sending" ? "Joining…" : "Join waitlist"}
      </button>
      {status !== "idle" && (
        <p className={`md:col-span-3 text-sm mt-2 ${status === "ok" ? "text-emerald-400" : status === "err" ? "text-rose-400" : "text-slate-400"}`}>{msg}</p>
      )}
    </form>
  );
}

export default function NeroLanding() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-400/30">
      {/* Keyframes for the orbs/grid */}
      <style>{`
        @keyframes floatA { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(50px,-30px) scale(1.1)} 60%{transform:translate(-30px,20px) scale(.95)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes floatB { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(-40px,25px) scale(.9)} 60%{transform:translate(10px,-15px) scale(1.05)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes gridSlide { 0%{background-position:0 0} 50%{background-position:40px 20px} 100%{background-position:0 0} }
      `}</style>
      <BackgroundFX />

      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-500 shadow-md" />
            <span className="font-semibold tracking-wide">Nero</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#kits" className="hover:text-white">Kits</a>
            <a href="#vision" className="hover:text-white">Our Vision</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <a href="#cta" className="rounded-xl bg-indigo-500 hover:bg-indigo-400 px-4 py-2 text-sm font-medium">Join waitlist</a>
        </div>
      </header>

      {/* HERO, VISION, FEATURES, KITS, HOW with videos, CTA, FOOTER — same as canvas version */}
      {/* For brevity I’m not duplicating the entire JSX again; your canvas has the exact markup we’re using here. */}
      {/* The critical bit for preview is that the videos resolve at /media/*.mp4 and the form posts to /api/waitlist. */}

      <footer className="py-12 text-center text-xs text-slate-500">
        <p>© {YEAR} Nero — Domestic Cognition Platform</p>
      </footer>
    </div>
  );
}

if (IS_DEV) {
  console.assert(typeof NeroLanding === "function", "NeroLanding should be a function component");
  console.assert(Array.isArray(HOW_STEPS) && HOW_STEPS.length === 3, "HOW_STEPS should contain 3 entries");
}

