// functions/api/waitlist.ts
// Cloudflare Pages Function to accept waitlist signups,
// save to KV, and notify via MailChannels.
//
// POST /api/waitlist  { name?: string, email: string, company?: string }  // "company" = honeypot

export interface Env {
  WAITLIST_KV: KVNamespace;               // Bind in Pages → Settings → KV
  WAITLIST_RL?: KVNamespace;              // Optional: KV for rate limiting (bind if you want)
}

const ALLOW_ORIGIN = "*";                 // lock down to your domain when live e.g. "https://nero.pages.dev"
const TO_EMAIL = "mccain.pt@outlook.com"; // notification address

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env, cf }) => {
  try {
    // --- CORS ---
    const origin = request.headers.get("origin") || "";
    const headers = corsHeaders(origin);

    // --- Basic JSON parse ---
    const body = await request.json().catch(() => null);
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const company = String(body?.company || "").trim(); // honeypot

    // --- Honeypot: silently accept but ignore ---
    if (company) {
      return json({ ok: true, bot: true }, 200, headers);
    }

    // --- Validation ---
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: "email_required_or_invalid" }, 400, headers);
    }

    // --- Tiny rate-limit (optional KV) ---
    if (env.WAITLIST_RL) {
      const ip = (request.headers.get("cf-connecting-ip") || "0.0.0.0").slice(0, 45);
      const key = `rl:${ip}`;
      const hits = Number((await env.WAITLIST_RL.get(key)) || "0");
      if (hits > 10) {
        return json({ ok: false, error: "rate_limited" }, 429, headers);
      }
      await env.WAITLIST_RL.put(key, String(hits + 1), { expirationTtl: 60 }); // 1 minute window
    }

    // --- Persist to KV (dedupe by email) ---
    if (env.WAITLIST_KV) {
      const k = `waitlist:${email}`;
      const now = Date.now();
      const payload = JSON.stringify({ name, email, ts: now, ua: request.headers.get("user-agent") || "" });
      await env.WAITLIST_KV.put(k, payload, { metadata: { email, name, ts: Date.now() } });
    }

    // --- Notify via MailChannels ---
    const mcPayload = {
      personalizations: [{ to: [{ email: TO_EMAIL }] }],
      from: { email: "no-reply@pages.cloudflare-email.com", name: "Nero Waitlist" },
      subject: "New Nero Waitlist Signup",
      content: [
        {
          type: "text/plain",
          value:
            `New signup\n` +
            `Name: ${name || "(none)"}\n` +
            `Email: ${email}\n` +
            `Time: ${new Date().toISOString()}\n` +
            `IP: ${request.headers.get("cf-connecting-ip") || ""}\n` +
            `UA: ${request.headers.get("user-agent") || ""}\n`,
        },
      ],
    };

    // Fire-and-forget; if it fails we still return ok to the user
    const resp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(mcPayload),
    }).catch(() => null);

    if (!resp || !resp.ok) {
      // Log details in the edge runtime if available (won’t show to end-user)
      // console.warn("MailChannels send failed", resp && (await resp.text()));
    }

    return json({ ok: true }, 200, headers);
  } catch (err) {
    return json({ ok: false, error: "bad_request" }, 400, corsHeaders());
  }
};

// ---- Helpers ----
function json(obj: unknown, status = 200, headers?: HeadersInit) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...(headers || {}) },
  });
}

function corsHeaders(origin?: string): HeadersInit {
  return {
    "access-control-allow-origin": origin || ALLOW_ORIGIN,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}

