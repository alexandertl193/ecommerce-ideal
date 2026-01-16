
import { GoogleGenAI, Modality } from "@google/genai";

let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;
let analyser: AnalyserNode | null = null;
let animationFrameId: number | null = null;
let currentRequestId = 0;
let onSpeakingChange: ((isSpeaking: boolean) => void) | null = null;
let smoothedIntensity = 0;

export const setSpeechListener = (listener: (isSpeaking: boolean) => void) => {
  onSpeakingChange = listener;
};

// Helper to warm up audio context on user gesture
export const initAudio = async () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.5;
    analyser.connect(audioContext.destination);
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
};

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const updateIntensity = () => {
  if (!analyser) return;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);

  let sum = 0;
  for (let i = 4; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  const avg = sum / (dataArray.length - 4);
  const targetIntensity = Math.min(avg / 90, 1.2);
  
  smoothedIntensity = smoothedIntensity + (targetIntensity - smoothedIntensity) * 0.25;
  
  document.documentElement.style.setProperty('--voice-intensity', smoothedIntensity.toFixed(4));
  animationFrameId = requestAnimationFrame(updateIntensity);
};

export const stopSpeaking = () => {
  currentRequestId++;
  if (onSpeakingChange) onSpeakingChange(false);
  document.documentElement.style.setProperty('--voice-intensity', '0');
  smoothedIntensity = 0;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (currentSource) {
    try {
      currentSource.stop();
    } catch (e) {}
    currentSource = null;
  }
};

export const speak = async (text: string) => {
  if (!text) return;
  const requestId = ++currentRequestId;
  
  try {
    await initAudio();

    stopSpeaking(); 
    currentRequestId = requestId;

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Minimalist prompt for the fastest possible TTS generation
    const prompt = text;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    if (requestId !== currentRequestId) return;

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio && audioContext && analyser) {
      const audioData = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioData, audioContext, 24000, 1);
      
      if (requestId !== currentRequestId) return;

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      
      if (onSpeakingChange) onSpeakingChange(true);
      source.start();
      currentSource = source;
      updateIntensity();
      
      source.onended = () => {
        if (currentSource === source) {
          stopSpeaking();
        }
      };
    }
  } catch (error) {
    console.error("Audio error:", error);
    stopSpeaking();
  }
};
