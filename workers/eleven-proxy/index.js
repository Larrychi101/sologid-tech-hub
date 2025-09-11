addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const ALLOWED_ORIGINS = [
  'https://larrychi101.github.io',
  'https://eleven-proxy.sologid-technology-hub.workers.dev',
  'http://localhost:4321',
  'http://localhost:4324',
  'http://sologid.com',
  'https://sologid.com',
  'http://127.0.0.1:4321',
  'http://127.0.0.1:4324',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  
  // For development, allow all origins temporarily
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, xi-api-key',
  };
}

async function handleRequest(request) {
  const CORS_HEADERS = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }

  try {
    const url = new URL(request.url);

    // Test endpoint
    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/test')) {
      return new Response(JSON.stringify({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        origin: request.headers.get('Origin')
      }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // Signed URL endpoint
    if (request.method === "GET" && url.pathname.includes("/api/eleven-proxy/signed-url")) {
      const agentId = url.searchParams.get('agentId');
      
      if (!agentId) {
        return new Response(JSON.stringify({ error: 'Missing agentId' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }

      if (typeof ELEVENLABS_API_KEY === 'undefined' || !ELEVENLABS_API_KEY) {
        return new Response(JSON.stringify({ 
          error: 'ELEVENLABS_API_KEY not configured' 
        }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }

      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
          {
            headers: { 'xi-api-key': ELEVENLABS_API_KEY },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          return new Response(JSON.stringify({ 
            error: `ElevenLabs API error: ${response.status}`,
            details: errorText
          }), {
            status: response.status,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
          });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'Request failed', 
          message: error.message 
        }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Not found', { 
      status: 404, 
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}
