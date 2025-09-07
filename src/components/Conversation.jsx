'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';

// Set your deployed worker base URL here
const WORKER_BASE = import.meta.env.PUBLIC_WORKER_URL || 'https://eleven-proxy.example.workers.dev';

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Ask our worker to create/authorize a session with ElevenLabs
      const res = await fetch(`${WORKER_BASE}/api/eleven-proxy/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: import.meta.env.PUBLIC_AGENT_ID }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Proxy error ${res.status}: ${errText}`);
      }

      const payload = await res.json();
      // payload is forwarded ElevenLabs response. Adjust field names if ElevenLabs returns different structure.
      // If the SDK needs a sessionToken, pass it here. Otherwise pass returned object as needed by SDK.
      if (payload && (payload.sessionToken || payload.id || payload.token)) {
        // Try common token fields
        const token = payload.sessionToken || payload.token || payload.id;
        await conversation.startSession({ agentId: import.meta.env.PUBLIC_AGENT_ID, sessionToken: token });
      } else {
        // If no token field, attempt to pass full payload
        await conversation.startSession({ agentId: import.meta.env.PUBLIC_AGENT_ID, sessionData: payload });
      }

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
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
    </div>
  );
}
