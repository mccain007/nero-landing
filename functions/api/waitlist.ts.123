export interface Env { WAITLIST_KV: KVNamespace } // optional but recommended

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { name = "", email = "", company = "" } = await request.json();
    if (!email) return new Response(JSON.stringify({ ok:false, error:"email_required" }), { status: 400 });
    if (company.trim()) return new Response(JSON.stringify({ ok:true }), { status: 200 }); // honeypot

    if (env.WAITLIST_KV) {
      await env.WAITLIST_KV.put(`waitlist:${email.toLowerCase().trim()}`, JSON.stringify({ name, email, ts: Date.now() }), {
        metadata: { email, name }
      });
    }

    const payload = {
      personalizations: [{ to: [{ email: "mccain.pt@outlook.com" }] }],
      from: { email: "no-reply@pages.cloudflare-email.com", name: "Nero Waitlist" },
      subject: "New Nero Waitlist Signup",
      content: [
        { type: "text/plain", value: `New signup\nName: ${name || "(none)"}\nEmail: ${email}\nTime: ${new Date().toISOString()}` },
      ],
    };

    await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
    });

    return Response.json({ ok:true });
  } catch {
    return new Response(JSON.stringify({ ok:false, error:"bad_json" }), { status: 400 });
  }
};
