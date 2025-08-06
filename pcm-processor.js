class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0];
      const pcm = new Int16Array(channelData.length);

      for (let i = 0; i < channelData.length; i++) {
        // Clamp and scale float [-1, 1] to int16 [-32768, 32767]
        let s = Math.max(-1, Math.min(1, channelData[i]));
        pcm[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }

      // Send as ArrayBuffer (little-endian by default)
      this.port.postMessage(pcm.buffer, [pcm.buffer]);
    }
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
