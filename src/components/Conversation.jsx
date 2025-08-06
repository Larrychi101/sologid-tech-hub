'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export function Conversation() {
  const ws = useRef(null);
  const [status, setStatus] = useState('disconnected');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.send(JSON.stringify({ type: 'session.stop' }));
        ws.current.close();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  const playAudioChunk = async (base64Audio) => {
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binaryString.charCodeAt(i);
    }

    const int16Array = new Int16Array(buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }

    const audioBuffer = audioContextRef.current.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    source.start();
  };

  const startConversation = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);

      const audioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = audioContext;
      await audioContext.audioWorklet.addModule('/pcm-processor.js');

      const source = audioContext.createMediaStreamSource(stream);
      const workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');

      const wsUrl = 'wss://ai-lawrence5576ai414338821473.cognitiveservices.azure.com/voice-live/realtime?api-version=2025-05-01-preview&model=gpt-4o-mini-realtime-preview&api-key=8MzlxZIZqiOJryrtTK0ScacHlqKQz8Shl8bdOP9PvnWEJuqbAOWBJQQJ99BDACHYHv6XJ3w3AAAAACOGE7FI';
      ws.current = new WebSocket(wsUrl);
      ws.current.binaryType = 'arraybuffer';

      ws.current.onopen = () => {
        setStatus('connected');
        console.log('WebSocket connected');

        ws.current.send(JSON.stringify({
          type: 'session.update',
          session: {
            // Optional: customize voice, instructions, etc.
          }
        }));
      };

      ws.current.onmessage = async (event) => {
        const message = JSON.parse(event.data);

        if (message.type === 'response.content_part.added' &&
            message.part?.type === 'audio' &&
            message.part?.data) {
          await playAudioChunk(message.part.data);
          setIsSpeaking(true);
          setTimeout(() => setIsSpeaking(false), 1000);
        } else {
          console.log('Received from backend:', message);
        }
      };

      workletNode.port.onmessage = (event) => {
        const buffer = new Uint8Array(event.data);
        if (ws.current?.readyState === WebSocket.OPEN) {
          const base64Audio = btoa(String.fromCharCode(...buffer));
          ws.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: base64Audio
          }));
        }
      };

      source.connect(workletNode).connect(audioContext.destination);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, []);

  const stopConversation = useCallback(() => {
    if (ws.current) {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 'session.stop' }));
      }
      ws.current.close();
      setStatus('disconnected');
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
  }, [mediaStream]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={status !== 'connected'}
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
        <p className="text-white">Status: {status}</p>
        <p className="text-white">Agent is {isSpeaking ? 'speaking' : 'listening'}</p>
      </motion.div>
    </div>
  );
}
