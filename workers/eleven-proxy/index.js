// Cloudflare Worker: proxy for ElevenLabs sessions
// - Store ELEVENLABS_API_KEY as a Worker secret (wrangler secret put ELEVENLABS_API_KEY)
// - Replace ACCESS_CONTROL_ORIGIN with your GitHub Pages origin for stricter security

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const ACCESS_CONTROL_ORIGIN = "*"; // TODO: replace with your GH Pages URL e.g. https://youruser.github.io

async function handleRequest(request) {
  const CORS_HEADERS = {
    "Access-Control-Allow-Origin": ACCESS_CONTROL_ORIGIN,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    const url = new URL(request.url);
    // Route: POST /api/eleven-proxy/sessions -> create session at ElevenLabs
    if (request.method === "POST" && url.pathname.endsWith("/api/eleven-proxy/sessions")) {
      const body = await request.json();

      // Forward to ElevenLabs sessions endpoint
      const resp = await fetch("https://api.elevenlabs.io/v1/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ELEVENLABS_API_KEY must be configured as a Worker secret
          "Authorization": `Bearer ${ELEVENLABS_API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      const text = await resp.text();
      const headers = new Headers(CORS_HEADERS);
      const ct = resp.headers.get("content-type") || "application/json";
      headers.set("Content-Type", ct);
      return new Response(text, { status: resp.status, headers });
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: CORS_HEADERS });
  } catch (err) {
    const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
