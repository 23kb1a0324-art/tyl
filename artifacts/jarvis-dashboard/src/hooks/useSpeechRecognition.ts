import { useState, useEffect, useRef, useCallback } from 'react';

type SpeechRec = {
  supported: boolean;
  listening: boolean;
  transcript: string;
  interimTranscript: string;
  confidence: number;
  micLevel: number;
  error: string | null;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  clear: () => void;
};

export function useSpeechRecognition(onResult?: (text: string) => void): SpeechRec {
  const SR = typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;
  const supported = !!SR;

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterim] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [micLevel, setMicLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  const cleanupAudio = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (audioCtxRef.current) { audioCtxRef.current.close().catch(() => {}); audioCtxRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    setMicLevel(0);
  }, []);

  const start = useCallback(async () => {
    if (!supported) {
      setError('Speech recognition not supported in this browser');
      return;
    }
    setError(null);
    try {
      // Audio level meter
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        src.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          analyser.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i];
          const avg = sum / data.length;
          setMicLevel(Math.min(100, Math.round((avg / 128) * 100)));
          rafRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (e) {
        // Mic permission denied — still try recognition
      }

      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      rec.onresult = (event: any) => {
        let interim = '';
        let final = '';
        let conf = 0;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const r = event.results[i];
          if (r.isFinal) {
            final += r[0].transcript;
            conf = Math.max(conf, r[0].confidence || 0.9);
          } else {
            interim += r[0].transcript;
          }
        }
        if (final) {
          setTranscript(prev => (prev + ' ' + final).trim());
          setConfidence(Math.round(conf * 100));
          setInterim('');
          if (onResultRef.current) onResultRef.current(final.trim());
        } else {
          setInterim(interim);
        }
      };
      rec.onerror = (e: any) => {
        setError(e.error || 'recognition error');
        setListening(false);
        cleanupAudio();
      };
      rec.onend = () => {
        setListening(false);
        cleanupAudio();
      };
      rec.start();
      recRef.current = rec;
      setListening(true);
    } catch (e: any) {
      setError(e?.message || 'failed to start');
      setListening(false);
      cleanupAudio();
    }
  }, [SR, supported, cleanupAudio]);

  const stop = useCallback(() => {
    try { recRef.current?.stop(); } catch {}
    cleanupAudio();
    setListening(false);
  }, [cleanupAudio]);

  const toggle = useCallback(() => {
    if (listening) stop(); else start();
  }, [listening, start, stop]);

  const clear = useCallback(() => {
    setTranscript('');
    setInterim('');
    setConfidence(0);
  }, []);

  useEffect(() => () => {
    try { recRef.current?.stop(); } catch {}
    cleanupAudio();
  }, [cleanupAudio]);

  return { supported, listening, transcript, interimTranscript, confidence, micLevel, error, start, stop, toggle, clear };
}

export function speak(text: string, opts?: { rate?: number; pitch?: number }) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts?.rate ?? 1;
    u.pitch = opts?.pitch ?? 1;
    // Prefer a male/clear voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      /male|david|alex|fred|google.*us|daniel/i.test(v.name)
    ) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  } catch {}
}
