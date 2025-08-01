'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { motion } from 'framer-motion';

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

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: 'agent_01jz0e2bj6efea9t0pvajxdp79', // Replace with your agent ID
      });

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

      <motion.div
        className="flex flex-col items-center"
        animate={{
          scale: [1, 1.08, 1],
          boxShadow: [
            "0 0 0px #2563eb",
            "0 0 16px #2563eb",
            "0 0 0px #2563eb"
          ]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <p className="text-white">Status: {conversation.status}</p>
        <p className="text-white">Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </motion.div>
    </div>
  );
}
