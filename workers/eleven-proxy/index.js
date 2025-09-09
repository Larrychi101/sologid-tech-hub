// Cloudflare Worker: proxy for ElevenLabs sessions
// - Store ELEVENLABS_API_KEY as a Worker secret (wrangler secret put ELEVENLABS_API_KEY)
// - Replace ACCESS_CONTROL_ORIGIN with your GitHub Pages origin for stricter security

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

// Allowlist of origins that may call this Worker. Update as needed.
const ALLOWED_ORIGINS = [
  'https://larrychi101.github.io',
  'https://eleven-proxy.sologid-technology-hub.workers.dev',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  // Add other dev ports you use here
];

// We'll echo back the Origin header if it's in the allowlist. Browsers send only the origin (scheme + host + port) — not the path — so include the plain github.io origin above.
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin);
  const acao = allowed ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': acao,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

async function handleRequest(request) {
  const CORS_HEADERS = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    const url = new URL(request.url);

    // Debug root to verify the worker is reachable and show incoming Origin
    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      const origin = request.headers.get('Origin') || null;
      const allowed = ALLOWED_ORIGINS.includes(origin);
      const body = JSON.stringify({ ok: true, origin, allowed });
      const headers = new Headers(CORS_HEADERS);
      headers.set('Content-Type', 'application/json');
      return new Response(body, { status: 200, headers });
    }

    // Route: POST /api/eleven-proxy/sessions -> try multiple ElevenLabs endpoints until one succeeds
    if (request.method === "POST" && url.pathname.endsWith("/api/eleven-proxy/sessions")) {
      const body = await request.json();

      // ELEVENLABS_API_KEY must be configured as a Worker secret
      if (typeof ELEVENLABS_API_KEY === 'undefined' || !ELEVENLABS_API_KEY) {
        const headers = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
        return new Response(JSON.stringify({ error: 'Server misconfiguration: ELEVENLABS_API_KEY not set' }), { status: 500, headers });
      }

      const agentId = body?.agentId || '';
      const regionHosts = [
        'https://api.elevenlabs.io',
        'https://api.us.elevenlabs.io',
        'https://api.eu.residency.elevenlabs.io',
        'https://api.in.residency.elevenlabs.io',
      ];

      const candidates = [];
      if (agentId) {
        // convai (agent) endpoints
        candidates.push(`/v1/convai/agents/${agentId}/sessions`);
        candidates.push(`/v1/convai/agents/${agentId}/conversations`);
        // older/non-convai agent endpoints
        candidates.push(`/v1/agents/${agentId}/sessions`);
        candidates.push(`/v1/agents/${agentId}/conversations`);
      }
      // generic options
      candidates.push('/v1/conversations');
      candidates.push('/v1/sessions');

      const attempts = [];

      for (const host of regionHosts) {
        for (const path of candidates) {
          try {
            const upstreamUrl = `${host}${path}`;
            const resp = await fetch(upstreamUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // ElevenLabs expects the API key in the xi-api-key header
                'xi-api-key': ELEVENLABS_API_KEY,
              },
              body: JSON.stringify(body),
            });

            const text = await resp.text();

            // Record attempt
            let parsed = text;
            try { parsed = JSON.parse(text); } catch (e) { /* leave as text */ }
            attempts.push({ host, path, status: resp.status, body: parsed });

            if (resp.ok) {
              // Return successful upstream response as-is (with CORS headers)
              const headers = new Headers(CORS_HEADERS);
              const ct = resp.headers.get('content-type') || 'application/json';
              headers.set('Content-Type', ct);
              // Echo which host/path succeeded for debugging
              headers.set('X-Upstream-Host', host);
              headers.set('X-Upstream-Path', path);
              return new Response(text, { status: resp.status, headers });
            }
          } catch (err) {
            attempts.push({ host, path, error: String(err) });
          }
        }
      }

      // Nothing succeeded — return debug 502 with attempts
      const headersErr = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
      return new Response(JSON.stringify({ error: 'All upstream attempts failed', attempts }), { status: 502, headers: headersErr });
    }

    // Signed URL route: GET /api/eleven-proxy/signed-url?agentId=AGENT_ID
    if (request.method === 'GET' && url.pathname.endsWith('/api/eleven-proxy/signed-url')) {
      const agentId = url.searchParams.get('agentId');
      if (!agentId) {
        const headersBad = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
        return new Response(JSON.stringify({ error: 'agentId query param required' }), { status: 400, headers: headersBad });
      }

      if (typeof ELEVENLABS_API_KEY === 'undefined' || !ELEVENLABS_API_KEY) {
        const headers = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
        return new Response(JSON.stringify({ error: 'Server misconfiguration: ELEVENLABS_API_KEY not set' }), { status: 500, headers });
      }

      const regionHosts = [
        'https://api.elevenlabs.io',
        'https://api.us.elevenlabs.io',
        'https://api.eu.residency.elevenlabs.io',
        'https://api.in.residency.elevenlabs.io',
      ];

      const attempts = [];
      for (const host of regionHosts) {
        try {
          const upstreamUrl = `${host}/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`;
          const resp = await fetch(upstreamUrl, {
            method: 'GET',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY,
            },
          });

          const text = await resp.text();
          let parsed = text;
          try { parsed = JSON.parse(text); } catch (e) { /* leave as text */ }
          attempts.push({ host, status: resp.status, body: parsed });

          if (resp.ok) {
            // Return the signed-url response as-is (contains signed_url or similar)
            const headers = new Headers(CORS_HEADERS);
            headers.set('Content-Type', resp.headers.get('content-type') || 'application/json');
            return new Response(text, { status: resp.status, headers });
          }
        } catch (err) {
          attempts.push({ host, error: String(err) });
        }
      }

      const headersErr = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
      return new Response(JSON.stringify({ error: 'All signed-url upstream attempts failed', attempts }), { status: 502, headers: headersErr });
    }

    // Token route: GET /api/eleven-proxy/token?agentId=AGENT_ID
    if (request.method === 'GET' && url.pathname.endsWith('/api/eleven-proxy/token')) {
      const agentId = url.searchParams.get('agentId');
      if (!agentId) {
        const headersBad = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
        return new Response(JSON.stringify({ error: 'agentId query param required' }), { status: 400, headers: headersBad });
      }

      if (typeof ELEVENLABS_API_KEY === 'undefined' || !ELEVENLABS_API_KEY) {
        const headers = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
        return new Response(JSON.stringify({ error: 'Server misconfiguration: ELEVENLABS_API_KEY not set' }), { status: 500, headers });
      }

      const regionHosts = [
        'https://api.elevenlabs.io',
        'https://api.us.elevenlabs.io',
        'https://api.eu.residency.elevenlabs.io',
        'https://api.in.residency.elevenlabs.io',
      ];

      const attempts = [];
      for (const host of regionHosts) {
        try {
          const upstreamUrl = `${host}/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`;
          const resp = await fetch(upstreamUrl, {
            method: 'GET',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY,
            },
          });

          const text = await resp.text();
          let parsed = text;
          try { parsed = JSON.parse(text); } catch (e) { /* leave as text */ }
          attempts.push({ host, status: resp.status, body: parsed });

          if (resp.ok) {
            // Expect { token: '...' } or similar
            const headers = new Headers(CORS_HEADERS);
            headers.set('Content-Type', 'application/json');
            return new Response(text, { status: resp.status, headers });
          }
        } catch (err) {
          attempts.push({ host, error: String(err) });
        }
      }

      const headersErr = new Headers({ ...CORS_HEADERS, 'Content-Type': 'application/json' });
      return new Response(JSON.stringify({ error: 'All token upstream attempts failed', attempts }), { status: 502, headers: headersErr });
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: CORS_HEADERS });
  } catch (err) {
    const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
