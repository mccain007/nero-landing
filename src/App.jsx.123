import React, { useState, memo } from "react";
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <HowItWorks />
    </>
  )
}
// ---------------------------------------------
// Nero — Landing Page (Vite/ESM friendly)
// - Removes stray starter imports (reactLogo/viteLogo)
// - Safe ENV detection (no `typeof import`)
// - Background FX + pure CSS/SVG animations for How-it-works
// - Waitlist form posts to /api/waitlist (Cloudflare Pages Function)
// ---------------------------------------------

// Safe environment detection without touching the bare `import` identifier
let ENV_MODE = "production";
try {
  if (typeof import.meta !== "undefined" && import.meta?.env?.MODE) {
    ENV_MODE = import.meta.env.MODE;
  }
} catch {}
if (ENV_MODE === "production" && typeof process !== "undefined" && process.env?.NODE_ENV) {
  ENV_MODE = process.env.NODE_ENV;
}
const IS_DEV = ENV_MODE !== "production";
const YEAR = new Date().getFullYear();

// ---------------- Typography helpers ----------------
function H1({ children }) {
  return <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">{children}</h1>;
}
function H2({ children, className = "" }) {
  return <h2 className={`font-serif text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15] ${className}`}>{children}</h2>;
}
function Lead({ children, className = "" }) {
  return <p className={`text-slate-300/95 text-lg md:text-xl leading-relaxed md:leading-[1.9] ${className}`}>{children}</p>;
}

// ---------------- Background FX (CSS keyframes) ----------------
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

// ---------------- Data constants ----------------
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

// ---------------- Waitlist Form ----------------
function WaitlistForm() {
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const email = String(data.email || "").trim().toLowerCase();
    const name = String(data.name || "").trim();
    const company = String(data.company || "").trim(); // honeypot

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

// ---------------- Component ----------------
export default function NeroLanding() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-400/30">
      {/* keyframes for background orbs/grid */}
      <style>{`
        @keyframes floatA { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(50px,-30px) scale(1.1)} 60%{transform:translate(-30px,20px) scale(.95)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes floatB { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(-40px,25px) scale(.9)} 60%{transform:translate(10px,-15px) scale(1.05)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes gridSlide { 0%{background-position:0 0} 50%{background-position:40px 20px} 100%{background-position:0 0} }
      `}</style>
      <BackgroundFX />

      {/* NAV */}
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

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <H1>
              Your home, with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">smarter guardian</span>
            </H1>
            <Lead className="mt-5">
              Nero is a domestic AI that perceives, correlates, and acts—greeting you in the driveway, watching the perimeter, and keeping signal high while noise stays low.
            </Lead>
            <div className="mt-10 flex gap-3">
              <a href="#cta" className="rounded-2xl bg-indigo-500 hover:bg-indigo-400 px-6 py-3 font-medium">Get early access</a>
              <a href="#vision" className="rounded-2xl ring-1 ring-white/10 px-6 py-3 font-medium">Read our vision</a>
            </div>
            <p className="mt-4 text-xs text-slate-400">Local-first. Privacy by design. Drone-ready.</p>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-white/10 p-1">
              <div className="h-full w-full rounded-2xl bg-slate-950 grid place-items-center">
                <div className="text-center px-8">
                  <div className="text-7xl">👁️‍🗨️</div>
                  <p className="mt-3 text-slate-300">Perception → Correlation → Action</p>
                  <p className="text-xs text-slate-500">Frigate • Traccar • Sonos • Drone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="border-y border-white/5 bg-slate-900/30">
        <div className="mx-auto max-w-3xl md:max-w-4xl px-6 py-20 md:py-24">
          <H2 className="mb-6">Our Vision</H2>
          <Lead>
            The home deserves a mind of its own—one that listens quietly, learns continuously, and protects without demanding your attention. Nero is a companion, not a distraction.
          </Lead>
          <p className="mt-6 text-slate-400 italic">“Our mission is to turn every home into a thinking habitat—peaceful, perceptive, and private.”</p>
          <p className="text-sm text-slate-500">— The Nero Founders</p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24">
        <H2 className="mb-3">What Nero does</H2>
        <Lead className="max-w-2xl">Nero decides before it notifies. He greets you, watches the perimeter, and orchestrates devices without spamming your phone.</Lead>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((f) => (
            <div key={f.title} className="rounded-2xl bg-slate-900/50 ring-1 ring-white/10 p-6 md:p-8">
              <div className="text-3xl" aria-hidden>{f.icon}</div>
              <h3 className="mt-3 font-serif text-xl md:text-2xl tracking-tight">{f.title}</h3>
              <p className="mt-2 text-slate-300 leading-relaxed md:leading-8">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KITS */}
      <section id="kits" className="mx-auto max-w-7xl px-4 pb-24">
        <H2 className="mb-3">Build your Nero</H2>
        <Lead className="max-w-2xl">Start with Nero Core. Add Vision for PoE cameras, or Sentinel for autonomous drone patrols.</Lead>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {KITS.map((p) => (
            <div key={p.name} className="rounded-2xl bg-slate-900/50 ring-1 ring-white/10 p-6 md:p-8 flex flex-col">
              <div className={`h-2 rounded-full bg-gradient-to-r ${p.color}`} />
              <h3 className="mt-4 font-serif text-xl md:text-2xl tracking-tight">{p.name}</h3>
              <p className="text-slate-400 text-sm">{p.price}</p>
              <ul className="mt-4 space-y-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-8 list-disc list-inside">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="mt-6">
                <a href="#cta" className="rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 text-sm">Join waitlist</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — pure CSS/SVG animations */}
      <section id="how" className="mx-auto max-w-7xl px-4 pb-24">
        <H2 className="mb-3">How it works</H2>
        <Lead className="max-w-2xl">Three stages, continuously flowing. Now powered by lightweight, pure‑CSS/SVG animations (no videos required).</Lead>

        {/* Animation styles (scoped) */}
        <style>{`
          @keyframes perceivePulse { 0%{opacity:.6; transform:scale(1)} 50%{opacity:.95; transform:scale(1.05)} 100%{opacity:.6; transform:scale(1)} }
          @keyframes drift { 0%{transform:translate(0,0)} 100%{transform:translate(-40px,-20px)} }
          @keyframes dash { 0%{stroke-dashoffset:120} 100%{stroke-dashoffset:0} }
          @keyframes breathe { 0%{opacity:.35} 50%{opacity:.85} 100%{opacity:.35} }
          @keyframes sweep { 0%{transform:translateX(-120%)} 100%{transform:translateX(120%)} }
          @keyframes ripple { 0%{opacity:0; transform:scale(.8)} 50%{opacity:.6; transform:scale(1.05)} 100%{opacity:0; transform:scale(1.2)} }
        `}</style>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Perceive */}
          <div className="rounded-2xl bg-slate-900/50 ring-1 ring-white/10 overflow-hidden">
            <div className="relative aspect-video border-b border-white/10">
              <div className="absolute inset-0" style={{ background: "radial-gradient(80% 60% at 35% 40%, rgba(129,140,248,.35), transparent 60%), radial-gradient(65% 55% at 70% 60%, rgba(244,114,182,.25), transparent 60%)" }} />
              <div className="absolute inset-0 animate-[perceivePulse_6s_ease-in-out_infinite] bg-gradient-to-br from-indigo-500/20 via-sky-400/10 to-fuchsia-400/20" />
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.9) 50%, transparent 51%), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,.7) 50%, transparent 51%), radial-gradient(1px 1px at 70% 45%, rgba(255,255,255,.6) 50%, transparent 51%)" }} />
              <div className="absolute inset-0 animate-[drift_18s_linear_infinite] opacity-20" style={{ backgroundImage: "radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,.8) 50%, transparent 51%), radial-gradient(1px 1px at 85% 80%, rgba(255,255,255,.6) 50%, transparent 51%), radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,.7) 50%, transparent 51%)" }} />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl md:text-2xl tracking-tight">Perceive</h3>
              <p className="mt-2 text-slate-300 leading-relaxed md:leading-8">Cameras, sensors, and presence apps publish to Nero’s Perception Bus.</p>
            </div>
          </div>

          {/* Correlate */}
          <div className="rounded-2xl bg-slate-900/50 ring-1 ring-white/10 overflow-hidden">
            <div className="relative aspect-video border-b border-white/10">
              <svg viewBox="0 0 100 56" className="absolute inset-0 w-full h-full">
                <g strokeWidth=".6" strokeLinecap="round" stroke="url(#grad1)">
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f472b6" stopOpacity=".9" />
                      <stop offset="100%" stopColor="#9333ea" stopOpacity=".9" />
                    </linearGradient>
                  </defs>
                  <path d="M10 45 L35 30" style={{ strokeDasharray: 120, animation: "dash 4s ease-in-out infinite" }} />
                  <path d="M90 12 L60 28" style={{ strokeDasharray: 120, animation: "dash 5s ease-in-out infinite" }} />
                  <path d="M25 12 L50 28" style={{ strokeDasharray: 120, animation: "dash 6s ease-in-out infinite" }} />
                  <path d="M75 48 L54 30" style={{ strokeDasharray: 120, animation: "dash 4.5s ease-in-out infinite" }} />
                </g>
                <g fill="#fff">
                  {[{x:10,y:45},{x:35,y:30},{x:90,y:12},{x:60,y:28},{x:25,y:12},{x:50,y:28},{x:75,y:48},{x:54,y:30}].map((n,i)=> (
                    <circle key={i} cx={n.x} cy={n.y} r={i%2? .8:1.1} opacity={0.6} className="animate-[breathe_5s_ease-in-out_infinite]" />
                  ))}
                </g>
              </svg>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl md:text-2xl tracking-tight">Correlate</h3>
              <p className="mt-2 text-slate-300 leading-relaxed md:leading-8">Nero fuses signals (who / where / when) and applies privacy guardrails.</p>
            </div>
          </div>

          {/* Act */}
          <div className="rounded-2xl bg-slate-900/50 ring-1 ring-white/10 overflow-hidden">
            <div className="relative aspect-video border-b border-white/10">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 bottom-0 -left-1/2 w-1/3 bg-gradient-to-r from-teal-400/0 via-emerald-400/50 to-blue-500/0 blur-md animate-[sweep_2.8s_ease-in-out_infinite]" />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-40 w-40 rounded-full border border-teal-300/40 animate-[ripple_2.8s_ease-out_infinite]" />
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl md:text-2xl tracking-tight">Act</h3>
              <p className="mt-2 text-slate-300 leading-relaxed md:leading-8">Only high-confidence events become alerts, automations, or voice prompts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="border-t border-white/5 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <H2>Be first to meet Nero</H2>
          <Lead className="mt-3">Early adopters help shape the product and get priority access to Vision & Sentinel kits.</Lead>
          <WaitlistForm />
          <p className="mt-3 text-xs text-slate-500">We’ll never sell your data. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-xs text-slate-500">
        <p>© {YEAR} Nero — Domestic Cognition Platform</p>
      </footer>
    </div>
  );
}

// ---------------- Dev-time sanity checks ----------------
if (IS_DEV) {
  console.assert(typeof NeroLanding === "function", "NeroLanding should be a function component");
  console.assert(Array.isArray(KITS) && KITS.length === 3, "KITS should contain 3 entries");
}

