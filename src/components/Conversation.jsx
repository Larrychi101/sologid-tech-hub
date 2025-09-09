'use client';


import { useConversation } from '@elevenlabs/react';
import { useCallback, useState } from 'react';


// Set your deployed worker base URL here
const WORKER_BASE = import.meta.env.PUBLIC_WORKER_URL || 'https://eleven-proxy.sologid-technology-hub.workers.dev';


export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastLog, setLastLog] = useState('idle');

  const appendLog = (msg) => {
    console.log(msg);
    setLastLog(msg);
  };

  const startConversation = useCallback(async () => {
    setErrorMsg('');
    setLoading(true);
    appendLog('startConversation invoked');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API not available in this browser');
      }

      appendLog('requesting microphone permission');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      appendLog('microphone permission granted');

      if (WORKER_BASE.includes('example.workers.dev')) {
        appendLog('WARNING: WORKER_BASE is not configured (using example). Update PUBLIC_WORKER_URL in your build.');
        setErrorMsg('Worker URL not configured. Set PUBLIC_WORKER_URL to your deployed worker URL.');
        setLoading(false);
        return;
      }

      // Request a signed URL for private agents from the secure worker
      const agentId = import.meta.env.PUBLIC_AGENT_ID;
      appendLog(`requesting signed URL from ${WORKER_BASE}/api/eleven-proxy/signed-url?agentId=${agentId}`);
      const res = await fetch(`${WORKER_BASE}/api/eleven-proxy/signed-url?agentId=${encodeURIComponent(agentId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      appendLog(`signed-url response ${res.status}`);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Signed URL error ${res.status}: ${errText}`);
      }

      const payload = await res.json();
      appendLog(`signed-url payload received: ${JSON.stringify(payload).slice(0, 300)}`);

      // Try common key names returned by the worker/upstream
      const signedUrl = payload?.signed_url || payload?.signedUrl || payload?.url || payload?.signedURL || null;
      if (!signedUrl) {
        throw new Error('No signedUrl returned from worker');
      }

      appendLog('starting conversation with signedUrl');
      await conversation.startSession({ signedUrl });
      appendLog('conversation.startSession completed');
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setErrorMsg(error.message ?? String(error));
    } finally {
      setLoading(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    try {
      appendLog('ending session');
      await conversation.endSession();
    } catch (err) {
      console.error(err);
      setErrorMsg(String(err));
    }
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected' || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {loading ? 'Starting...' : 'Start Conversation'}
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-white transition-all duration-500 ease-in-out">Status: {conversation.status}</p>
        <p
          className={`text-white transition-all duration-500 ease-in-out ${
            conversation.isSpeaking ? 'animate-pulse' : 'animate-fadeIn'
          }`}
        >
          Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}
        </p>
      </div>

      {/* Visible debug and error info to help trace why start does nothing */}
      <div className="mt-2 text-sm text-left w-full max-w-xl">
        {errorMsg && <div className="p-2 bg-red-700 text-white rounded">Error: {errorMsg}</div>}
        <div className="mt-2 p-2 bg-gray-800 text-gray-200 rounded">Last log: {lastLog}</div>
      </div>
    </div>
  );
}
