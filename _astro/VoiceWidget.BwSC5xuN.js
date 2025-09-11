import{j as d}from"./jsx-runtime.ClP7wGfN.js";import{r as v}from"./index.DK-fsZOb.js";function k(){return k=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(i[n]=s[n])}return i},k.apply(null,arguments)}const U=new Uint8Array(0);class _{static getFullOptions(e){return k({clientTools:{},onConnect:()=>{},onDebug:()=>{},onDisconnect:()=>{},onError:()=>{},onMessage:()=>{},onAudio:()=>{},onModeChange:()=>{},onStatusChange:()=>{},onCanSendFeedbackChange:()=>{}},e)}constructor(e,s){var n=this;this.options=void 0,this.connection=void 0,this.lastInterruptTimestamp=0,this.mode="listening",this.status="connecting",this.volume=1,this.currentEventId=1,this.lastFeedbackEventId=1,this.canSendFeedback=!1,this.endSessionWithDetails=async function(t){n.status!=="connected"&&n.status!=="connecting"||(n.updateStatus("disconnecting"),await n.handleEndSession(),n.updateStatus("disconnected"),n.options.onDisconnect(t))},this.onMessage=async function(t){switch(t.type){case"interruption":return void n.handleInterruption(t);case"agent_response":return void n.handleAgentResponse(t);case"user_transcript":return void n.handleUserTranscript(t);case"internal_tentative_agent_response":return void n.handleTentativeAgentResponse(t);case"client_tool_call":return void await n.handleClientToolCall(t);case"audio":return void n.handleAudio(t);case"ping":return void n.connection.sendMessage({type:"pong",event_id:t.ping_event.event_id});default:return void n.options.onDebug(t)}},this.setVolume=({volume:t})=>{this.volume=t},this.options=e,this.connection=s,this.options.onConnect({conversationId:s.conversationId}),this.connection.onMessage(this.onMessage),this.connection.onDisconnect(this.endSessionWithDetails),this.updateStatus("connected")}endSession(){return this.endSessionWithDetails({reason:"user"})}async handleEndSession(){this.connection.close()}updateMode(e){e!==this.mode&&(this.mode=e,this.options.onModeChange({mode:e}))}updateStatus(e){e!==this.status&&(this.status=e,this.options.onStatusChange({status:e}))}updateCanSendFeedback(){const e=this.currentEventId!==this.lastFeedbackEventId;this.canSendFeedback!==e&&(this.canSendFeedback=e,this.options.onCanSendFeedbackChange({canSendFeedback:e}))}handleInterruption(e){e.interruption_event&&(this.lastInterruptTimestamp=e.interruption_event.event_id)}handleAgentResponse(e){this.options.onMessage({source:"ai",message:e.agent_response_event.agent_response})}handleUserTranscript(e){this.options.onMessage({source:"user",message:e.user_transcription_event.user_transcript})}handleTentativeAgentResponse(e){this.options.onDebug({type:"tentative_agent_response",response:e.tentative_agent_response_internal_event.tentative_agent_response})}async handleClientToolCall(e){if(this.options.clientTools.hasOwnProperty(e.client_tool_call.tool_name))try{var s;const n=(s=await this.options.clientTools[e.client_tool_call.tool_name](e.client_tool_call.parameters))!=null?s:"Client tool execution successful.",t=typeof n=="object"?JSON.stringify(n):String(n);this.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:t,is_error:!1})}catch(n){this.onError("Client tool execution failed with following error: "+n?.message,{clientToolName:e.client_tool_call.tool_name}),this.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:"Client tool execution failed: "+n?.message,is_error:!0})}else{if(this.options.onUnhandledClientToolCall)return void this.options.onUnhandledClientToolCall(e.client_tool_call);this.onError(`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,{clientToolName:e.client_tool_call.tool_name}),this.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,is_error:!0})}}handleAudio(e){}onError(e,s){console.error(e,s),this.options.onError(e,s)}getId(){return this.connection.conversationId}isOpen(){return this.status==="connected"}setMicMuted(e){}getInputByteFrequencyData(){return U}getOutputByteFrequencyData(){return U}getInputVolume(){return 0}getOutputVolume(){return 0}sendFeedback(e){this.canSendFeedback?(this.connection.sendMessage({type:"feedback",score:e?"like":"dislike",event_id:this.currentEventId}),this.lastFeedbackEventId=this.currentEventId,this.updateCanSendFeedback()):console.warn(this.lastFeedbackEventId===0?"Cannot send feedback: the conversation has not started yet.":"Cannot send feedback: feedback has already been sent for the current response.")}sendContextualUpdate(e){this.connection.sendMessage({type:"contextual_update",text:e})}sendUserMessage(e){this.connection.sendMessage({type:"user_message",text:e})}sendUserActivity(){this.connection.sendMessage({type:"user_activity"})}sendMCPToolApprovalResult(e,s){this.connection.sendMessage({type:"mcp_tool_approval_result",tool_call_id:e,is_approved:s})}}function O(i){return!!i.type}let T=class q{static async create(e){let s=null;try{var n;const o=(n=e.origin)!=null?n:"wss://api.elevenlabs.io",r=e.signedUrl?e.signedUrl:o+"/v1/convai/conversation?agent_id="+e.agentId,c=["convai"];e.authorization&&c.push(`bearer.${e.authorization}`),s=new WebSocket(r,c);const h=await new Promise((p,m)=>{s.addEventListener("open",()=>{var y;const w={type:"conversation_initiation_client_data"};var A,D,E,L,R;e.overrides&&(w.conversation_config_override={agent:{prompt:(A=e.overrides.agent)==null?void 0:A.prompt,first_message:(D=e.overrides.agent)==null?void 0:D.firstMessage,language:(E=e.overrides.agent)==null?void 0:E.language},tts:{voice_id:(L=e.overrides.tts)==null?void 0:L.voiceId},conversation:{text_only:(R=e.overrides.conversation)==null?void 0:R.textOnly}}),e.customLlmExtraBody&&(w.custom_llm_extra_body=e.customLlmExtraBody),e.dynamicVariables&&(w.dynamic_variables=e.dynamicVariables),(y=s)==null||y.send(JSON.stringify(w))},{once:!0}),s.addEventListener("error",y=>{setTimeout(()=>m(y),0)}),s.addEventListener("close",m),s.addEventListener("message",y=>{const w=JSON.parse(y.data);O(w)&&(w.type==="conversation_initiation_metadata"?p(w.conversation_initiation_metadata_event):console.warn("First received message is not conversation metadata."))},{once:!0})}),{conversation_id:f,agent_output_audio_format:u,user_input_audio_format:g}=h,a=j(g??"pcm_16000"),l=j(u);return new q(s,f,a,l)}catch(o){var t;throw(t=s)==null||t.close(),o}}constructor(e,s,n,t){this.socket=void 0,this.conversationId=void 0,this.inputFormat=void 0,this.outputFormat=void 0,this.queue=[],this.disconnectionDetails=null,this.onDisconnectCallback=null,this.onMessageCallback=null,this.socket=e,this.conversationId=s,this.inputFormat=n,this.outputFormat=t,this.socket.addEventListener("error",o=>{setTimeout(()=>this.disconnect({reason:"error",message:"The connection was closed due to a socket error.",context:o}),0)}),this.socket.addEventListener("close",o=>{this.disconnect(o.code===1e3?{reason:"agent",context:o}:{reason:"error",message:o.reason||"The connection was closed by the server.",context:o})}),this.socket.addEventListener("message",o=>{try{const r=JSON.parse(o.data);if(!O(r))return;this.onMessageCallback?this.onMessageCallback(r):this.queue.push(r)}catch{}})}close(){this.socket.close()}sendMessage(e){this.socket.send(JSON.stringify(e))}onMessage(e){this.onMessageCallback=e;const s=this.queue;this.queue=[],s.length>0&&queueMicrotask(()=>{s.forEach(e)})}onDisconnect(e){this.onDisconnectCallback=e;const s=this.disconnectionDetails;s&&queueMicrotask(()=>{e(s)})}disconnect(e){var s;this.disconnectionDetails||(this.disconnectionDetails=e,(s=this.onDisconnectCallback)==null||s.call(this,e))}};function j(i){const[e,s]=i.split("_");if(!["pcm","ulaw"].includes(e))throw new Error(`Invalid format: ${i}`);const n=parseInt(s);if(isNaN(n))throw new Error(`Invalid sample rate: ${s}`);return{format:e,sampleRate:n}}function B(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}async function N(i={default:0,android:3e3}){let e=i.default;var s;if(/android/i.test(navigator.userAgent))e=(s=i.android)!=null?s:e;else if(B()){var n;e=(n=i.ios)!=null?n:e}e>0&&await new Promise(t=>setTimeout(t,e))}let V=class P extends _{static async startSession(e){const s=_.getFullOptions(e);s.onStatusChange({status:"connecting"}),s.onCanSendFeedbackChange({canSendFeedback:!1});let n=null;try{return await N(s.connectionDelay),n=await T.create(e),new P(s,n)}catch(o){var t;throw s.onStatusChange({status:"disconnected"}),(t=n)==null||t.close(),o}}};function $(i){const e=new Uint8Array(i);return window.btoa(String.fromCharCode(...e))}function z(i){const e=window.atob(i),s=e.length,n=new Uint8Array(s);for(let t=0;t<s;t++)n[t]=e.charCodeAt(t);return n.buffer}const x=new Map;function W(i,e){return async s=>{const n=x.get(i);if(n)return s.addModule(n);const t=new Blob([e],{type:"application/javascript"}),o=URL.createObjectURL(t);try{return await s.addModule(o),void x.set(i,o)}catch{URL.revokeObjectURL(o)}try{const r=`data:application/javascript;base64,${btoa(e)}`;await s.addModule(r),x.set(i,r)}catch{throw new Error(`Failed to load the ${i} worklet module. Make sure the browser supports AudioWorklets.`)}}}const G=W("raw-audio-processor",`
const BIAS = 0x84;
const CLIP = 32635;
const encodeTable = [
  0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,
  4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
  5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
  5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7
];

function encodeSample(sample) {
  let sign;
  let exponent;
  let mantissa;
  let muLawSample;
  sign = (sample >> 8) & 0x80;
  if (sign !== 0) sample = -sample;
  sample = sample + BIAS;
  if (sample > CLIP) sample = CLIP;
  exponent = encodeTable[(sample>>7) & 0xFF];
  mantissa = (sample >> (exponent+3)) & 0x0F;
  muLawSample = ~(sign | (exponent << 4) | mantissa);
  
  return muLawSample;
}

class RawAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
              
    this.port.onmessage = ({ data }) => {
      switch (data.type) {
        case "setFormat":
          this.isMuted = false;
          this.buffer = []; // Initialize an empty buffer
          this.bufferSize = data.sampleRate / 4;
          this.format = data.format;

          if (globalThis.LibSampleRate && sampleRate !== data.sampleRate) {
            globalThis.LibSampleRate.create(1, sampleRate, data.sampleRate).then(resampler => {
              this.resampler = resampler;
            });
          }
          break;
        case "setMuted":
          this.isMuted = data.isMuted;
          break;
      }
    };
  }
  process(inputs) {
    if (!this.buffer) {
      return true;
    }
    
    const input = inputs[0]; // Get the first input node
    if (input.length > 0) {
      let channelData = input[0]; // Get the first channel's data

      // Resample the audio if necessary
      if (this.resampler) {
        channelData = this.resampler.full(channelData);
      }

      // Add channel data to the buffer
      this.buffer.push(...channelData);
      // Get max volume 
      let sum = 0.0;
      for (let i = 0; i < channelData.length; i++) {
        sum += channelData[i] * channelData[i];
      }
      const maxVolume = Math.sqrt(sum / channelData.length);
      // Check if buffer size has reached or exceeded the threshold
      if (this.buffer.length >= this.bufferSize) {
        const float32Array = this.isMuted 
          ? new Float32Array(this.buffer.length)
          : new Float32Array(this.buffer);

        let encodedArray = this.format === "ulaw"
          ? new Uint8Array(float32Array.length)
          : new Int16Array(float32Array.length);

        // Iterate through the Float32Array and convert each sample to PCM16
        for (let i = 0; i < float32Array.length; i++) {
          // Clamp the value to the range [-1, 1]
          let sample = Math.max(-1, Math.min(1, float32Array[i]));

          // Scale the sample to the range [-32768, 32767]
          let value = sample < 0 ? sample * 32768 : sample * 32767;
          if (this.format === "ulaw") {
            value = encodeSample(Math.round(value));
          }

          encodedArray[i] = value;
        }

        // Send the buffered data to the main script
        this.port.postMessage([encodedArray, maxVolume]);

        // Clear the buffer after sending
        this.buffer = [];
      }
    }
    return true; // Continue processing
  }
}
registerProcessor("raw-audio-processor", RawAudioProcessor);
`);class M{static async create({sampleRate:e,format:s,preferHeadphonesForIosDevices:n}){let t=null,o=null;try{const h={sampleRate:{ideal:e},echoCancellation:{ideal:!0},noiseSuppression:{ideal:!0}};if(B()&&n){const l=(await window.navigator.mediaDevices.enumerateDevices()).find(p=>p.kind==="audioinput"&&["airpod","headphone","earphone"].find(m=>p.label.toLowerCase().includes(m)));l&&(h.deviceId={ideal:l.deviceId})}const f=navigator.mediaDevices.getSupportedConstraints().sampleRate;t=new window.AudioContext(f?{sampleRate:e}:{});const u=t.createAnalyser();f||await t.audioWorklet.addModule("https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js"),await G(t.audioWorklet),o=await navigator.mediaDevices.getUserMedia({audio:h});const g=t.createMediaStreamSource(o),a=new AudioWorkletNode(t,"raw-audio-processor");return a.port.postMessage({type:"setFormat",format:s,sampleRate:e}),g.connect(u),u.connect(a),await t.resume(),new M(t,u,a,o)}catch(h){var r,c;throw(r=o)==null||r.getTracks().forEach(f=>f.stop()),(c=t)==null||c.close(),h}}constructor(e,s,n,t){this.context=void 0,this.analyser=void 0,this.worklet=void 0,this.inputStream=void 0,this.context=e,this.analyser=s,this.worklet=n,this.inputStream=t}async close(){this.inputStream.getTracks().forEach(e=>e.stop()),await this.context.close()}setMuted(e){this.worklet.port.postMessage({type:"setMuted",isMuted:e})}}const J=W("audio-concat-processor",`
const decodeTable = [0,132,396,924,1980,4092,8316,16764];

export function decodeSample(muLawSample) {
  let sign;
  let exponent;
  let mantissa;
  let sample;
  muLawSample = ~muLawSample;
  sign = (muLawSample & 0x80);
  exponent = (muLawSample >> 4) & 0x07;
  mantissa = muLawSample & 0x0F;
  sample = decodeTable[exponent] + (mantissa << (exponent+3));
  if (sign !== 0) sample = -sample;

  return sample;
}

class AudioConcatProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffers = []; // Initialize an empty buffer
    this.cursor = 0;
    this.currentBuffer = null;
    this.wasInterrupted = false;
    this.finished = false;
    
    this.port.onmessage = ({ data }) => {
      switch (data.type) {
        case "setFormat":
          this.format = data.format;
          break;
        case "buffer":
          this.wasInterrupted = false;
          this.buffers.push(
            this.format === "ulaw"
              ? new Uint8Array(data.buffer)
              : new Int16Array(data.buffer)
          );
          break;
        case "interrupt":
          this.wasInterrupted = true;
          break;
        case "clearInterrupted":
          if (this.wasInterrupted) {
            this.wasInterrupted = false;
            this.buffers = [];
            this.currentBuffer = null;
          }
      }
    };
  }
  process(_, outputs) {
    let finished = false;
    const output = outputs[0][0];
    for (let i = 0; i < output.length; i++) {
      if (!this.currentBuffer) {
        if (this.buffers.length === 0) {
          finished = true;
          break;
        }
        this.currentBuffer = this.buffers.shift();
        this.cursor = 0;
      }

      let value = this.currentBuffer[this.cursor];
      if (this.format === "ulaw") {
        value = decodeSample(value);
      }
      output[i] = value / 32768;
      this.cursor++;

      if (this.cursor >= this.currentBuffer.length) {
        this.currentBuffer = null;
      }
    }

    if (this.finished !== finished) {
      this.finished = finished;
      this.port.postMessage({ type: "process", finished });
    }

    return true; // Continue processing
  }
}

registerProcessor("audio-concat-processor", AudioConcatProcessor);
`);class I{static async create({sampleRate:e,format:s}){let n=null;try{n=new AudioContext({sampleRate:e});const o=n.createAnalyser(),r=n.createGain();r.connect(o),o.connect(n.destination),await J(n.audioWorklet);const c=new AudioWorkletNode(n,"audio-concat-processor");return c.port.postMessage({type:"setFormat",format:s}),c.connect(r),await n.resume(),new I(n,o,r,c)}catch(o){var t;throw(t=n)==null||t.close(),o}}constructor(e,s,n,t){this.context=void 0,this.analyser=void 0,this.gain=void 0,this.worklet=void 0,this.context=e,this.analyser=s,this.gain=n,this.worklet=t}async close(){await this.context.close()}}class F extends _{static async startSession(e){var s;const n=_.getFullOptions(e);n.onStatusChange({status:"connecting"}),n.onCanSendFeedbackChange({canSendFeedback:!1});let t=null,o=null,r=null,c=null,h=null;if((s=e.useWakeLock)==null||s)try{h=await navigator.wakeLock.request("screen")}catch{}try{var f;return c=await navigator.mediaDevices.getUserMedia({audio:!0}),await N(n.connectionDelay),o=await T.create(e),[t,r]=await Promise.all([M.create(k({},o.inputFormat,{preferHeadphonesForIosDevices:e.preferHeadphonesForIosDevices})),I.create(o.outputFormat)]),(f=c)==null||f.getTracks().forEach(m=>m.stop()),c=null,new F(n,o,t,r,h)}catch(m){var u,g,a,l;n.onStatusChange({status:"disconnected"}),(u=c)==null||u.getTracks().forEach(y=>y.stop()),(g=o)==null||g.close(),await((a=t)==null?void 0:a.close()),await((l=r)==null?void 0:l.close());try{var p;await((p=h)==null?void 0:p.release()),h=null}catch{}throw m}}constructor(e,s,n,t,o){super(e,s),this.input=void 0,this.output=void 0,this.wakeLock=void 0,this.inputFrequencyData=void 0,this.outputFrequencyData=void 0,this.onInputWorkletMessage=r=>{this.status==="connected"&&this.connection.sendMessage({user_audio_chunk:$(r.data[0].buffer)})},this.onOutputWorkletMessage=({data:r})=>{r.type==="process"&&this.updateMode(r.finished?"listening":"speaking")},this.addAudioBase64Chunk=r=>{this.output.gain.gain.value=this.volume,this.output.worklet.port.postMessage({type:"clearInterrupted"}),this.output.worklet.port.postMessage({type:"buffer",buffer:z(r)})},this.fadeOutAudio=()=>{this.updateMode("listening"),this.output.worklet.port.postMessage({type:"interrupt"}),this.output.gain.gain.exponentialRampToValueAtTime(1e-4,this.output.context.currentTime+2),setTimeout(()=>{this.output.gain.gain.value=this.volume,this.output.worklet.port.postMessage({type:"clearInterrupted"})},2e3)},this.calculateVolume=r=>{if(r.length===0)return 0;let c=0;for(let h=0;h<r.length;h++)c+=r[h]/255;return c/=r.length,c<0?0:c>1?1:c},this.input=n,this.output=t,this.wakeLock=o,this.input.worklet.port.onmessage=this.onInputWorkletMessage,this.output.worklet.port.onmessage=this.onOutputWorkletMessage}async handleEndSession(){await super.handleEndSession();try{var e;await((e=this.wakeLock)==null?void 0:e.release()),this.wakeLock=null}catch{}await this.input.close(),await this.output.close()}handleInterruption(e){super.handleInterruption(e),this.fadeOutAudio()}handleAudio(e){this.lastInterruptTimestamp<=e.audio_event.event_id&&(this.options.onAudio(e.audio_event.audio_base_64),this.addAudioBase64Chunk(e.audio_event.audio_base_64),this.currentEventId=e.audio_event.event_id,this.updateCanSendFeedback(),this.updateMode("speaking"))}setMicMuted(e){this.input.setMuted(e)}getInputByteFrequencyData(){return this.inputFrequencyData!=null||(this.inputFrequencyData=new Uint8Array(this.input.analyser.frequencyBinCount)),this.input.analyser.getByteFrequencyData(this.inputFrequencyData),this.inputFrequencyData}getOutputByteFrequencyData(){return this.outputFrequencyData!=null||(this.outputFrequencyData=new Uint8Array(this.output.analyser.frequencyBinCount)),this.output.analyser.getByteFrequencyData(this.outputFrequencyData),this.outputFrequencyData}getInputVolume(){return this.calculateVolume(this.getInputByteFrequencyData())}getOutputVolume(){return this.calculateVolume(this.getOutputByteFrequencyData())}}class H extends _{static startSession(e){return e.textOnly?V.startSession(e):F.startSession(e)}}function S(){return S=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(i[n]=s[n])}return i},S.apply(null,arguments)}const K=["micMuted","volume"];function Z(i={}){const{micMuted:e,volume:s}=i,n=function(a,l){if(a==null)return{};var p={};for(var m in a)if({}.hasOwnProperty.call(a,m)){if(l.includes(m))continue;p[m]=a[m]}return p}(i,K),t=v.useRef(null),o=v.useRef(null),[r,c]=v.useState("disconnected"),[h,f]=v.useState(!1),[u,g]=v.useState("listening");return v.useEffect(()=>{var a;e!==void 0&&(t==null||(a=t.current)==null||a.setMicMuted(e))},[e]),v.useEffect(()=>{var a;s!==void 0&&(t==null||(a=t.current)==null||a.setVolume({volume:s}))},[s]),v.useEffect(()=>()=>{var a;(a=t.current)==null||a.endSession()},[]),{startSession:async a=>{var l;if((l=t.current)!=null&&l.isOpen())return t.current.getId();if(o.current)return(await o.current).getId();try{return o.current=H.startSession(S({},n??{},a??{},{onModeChange:({mode:p})=>{g(p)},onStatusChange:({status:p})=>{c(p)},onCanSendFeedbackChange:({canSendFeedback:p})=>{f(p)}})),t.current=await o.current,e!==void 0&&t.current.setMicMuted(e),s!==void 0&&t.current.setVolume({volume:s}),t.current.getId()}finally{o.current=null}},endSession:async()=>{const a=t.current;t.current=null,await a?.endSession()},setVolume:({volume:a})=>{var l;(l=t.current)==null||l.setVolume({volume:a})},getInputByteFrequencyData:()=>{var a;return(a=t.current)==null?void 0:a.getInputByteFrequencyData()},getOutputByteFrequencyData:()=>{var a;return(a=t.current)==null?void 0:a.getOutputByteFrequencyData()},getInputVolume:()=>{var a,l;return(a=(l=t.current)==null?void 0:l.getInputVolume())!=null?a:0},getOutputVolume:()=>{var a,l;return(a=(l=t.current)==null?void 0:l.getOutputVolume())!=null?a:0},sendFeedback:a=>{var l;(l=t.current)==null||l.sendFeedback(a)},getId:()=>{var a;return(a=t.current)==null?void 0:a.getId()},sendContextualUpdate:a=>{var l;(l=t.current)==null||l.sendContextualUpdate(a)},sendUserMessage:a=>{var l;(l=t.current)==null||l.sendUserMessage(a)},sendUserActivity:()=>{var a;(a=t.current)==null||a.sendUserActivity()},sendMCPToolApprovalResult:(a,l)=>{var p;(p=t.current)==null||p.sendMCPToolApprovalResult(a,l)},status:r,canSendFeedback:h,micMuted:e,isSpeaking:u==="speaking"}}const C="https://eleven-proxy.sologid-technology-hub.workers.dev",b="agent_01jz0e2bj6efea9t0pvajxdp79";function Q(){const i=Z({onConnect:()=>console.log("Connected"),onDisconnect:()=>console.log("Disconnected"),onMessage:u=>console.log("Message:",u),onError:u=>console.error("Error:",u)}),[e,s]=v.useState(!1),[n,t]=v.useState(""),[o,r]=v.useState("idle"),c=u=>{console.log(u),r(u)},h=v.useCallback(async()=>{t(""),s(!0),c("startConversation invoked");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error("Microphone API not available in this browser");if(c("requesting microphone permission"),await navigator.mediaDevices.getUserMedia({audio:!0}),c("microphone permission granted"),C.includes("example.workers.dev")){c("WARNING: WORKER_BASE is not configured (using example). Update PUBLIC_WORKER_URL in your build."),t("Worker URL not configured. Set PUBLIC_WORKER_URL to your deployed worker URL."),s(!1);return}c(`requesting signed URL from ${C}/api/eleven-proxy/signed-url?agentId=${b} (agentId: ${b})`);const u=await fetch(`${C}/api/eleven-proxy/signed-url?agentId=${encodeURIComponent(b)}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(c(`signed-url response ${u.status}`),!u.ok){const l=await u.text();throw new Error(`Signed URL error ${u.status}: ${l}`)}const g=await u.json();c(`signed-url payload received: ${JSON.stringify(g).slice(0,300)}`);const a=g?.signed_url||g?.signedUrl||g?.url||g?.signedURL||null;if(!a)throw new Error("No signedUrl returned from worker");c("starting conversation with signedUrl"),await i.startSession({signedUrl:a}),c("conversation.startSession completed")}catch(u){console.error("Failed to start conversation:",u),t(u.message??String(u))}finally{s(!1)}},[i]),f=v.useCallback(async()=>{try{c("ending session"),await i.endSession()}catch(u){console.error(u),t(String(u))}},[i]);return d.jsxs("div",{className:"flex flex-col items-center gap-4",children:[d.jsxs("div",{className:"flex gap-2",children:[d.jsx("button",{onClick:h,disabled:i.status==="connected"||e,className:"px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300",children:e?"Starting...":"Start Conversation"}),d.jsx("button",{onClick:f,disabled:i.status!=="connected",className:"px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300",children:"Stop Conversation"})]}),d.jsxs("div",{className:"flex flex-col items-center",children:[d.jsxs("p",{className:"text-white transition-all duration-500 ease-in-out",children:["Status: ",i.status]}),d.jsxs("p",{className:`text-white transition-all duration-500 ease-in-out ${i.isSpeaking?"animate-pulse":"animate-fadeIn"}`,children:["Agent is ",i.isSpeaking?"speaking":"listening"]})]}),d.jsxs("div",{className:"mt-2 text-sm text-left w-full max-w-xl",children:[n&&d.jsxs("div",{className:"p-2 bg-red-700 text-white rounded",children:["Error: ",n]}),d.jsxs("div",{className:"mt-2 p-2 bg-gray-800 text-gray-200 rounded",children:["Last log: ",o]})]})]})}function ee(){const[i,e]=v.useState(!1);return d.jsxs("div",{className:"fixed bottom-24 right-4 z-[9999] pointer-events-auto",children:[!i&&d.jsx("button",{onClick:()=>e(!0),className:"bg-primaryColor shadow-xl text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl hover:bg-primaryColorHover transition-all border-4 border-bgDark1 pointer-events-auto","aria-label":"Open voice call widget",children:d.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",children:[d.jsx("circle",{cx:"12",cy:"12",r:"12",fill:"currentColor",opacity:"0.1"}),d.jsx("path",{d:"M7.5 8.5C8.32843 7.67157 9.67157 7.67157 10.5 8.5L11.5 9.5C12.3284 10.3284 12.3284 11.6716 11.5 12.5L11 13C12.5 15 15 17.5 17 19L17.5 18.5C18.3284 17.6716 19.6716 17.6716 20.5 18.5L21.5 19.5C22.3284 20.3284 22.3284 21.6716 21.5 22.5C19.5 24.5 14.5 19.5 12.5 17.5C10.5 15.5 5.5 10.5 7.5 8.5Z",fill:"currentColor"})]})}),i&&d.jsxs("div",{className:"relative bg-bgDark1 border border-primaryColor rounded-2xl shadow-2xl p-6 min-w-[320px] max-w-[90vw] pointer-events-auto",children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsx("span",{className:"font-bold text-primaryColor text-lg",children:"Voice Assistant"}),d.jsx("button",{onClick:()=>e(!1),className:"text-2xl text-primaryColor hover:text-primaryColorHover transition pointer-events-auto","aria-label":"Close voice call widget",children:"×"})]}),d.jsx(Q,{})]})]})}export{ee as VoiceWidget};
