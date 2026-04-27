import React, { useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSpeechRecognition, speak } from '@/hooks/useSpeechRecognition';
import { useJarvis } from '@/store/jarvis';
import { parseCommand, fuzzyFind } from '@/lib/commandProcessor';

export function VoiceCommandCenter() {
  const j = useJarvis();
  const speech = useSpeechRecognition(async (final) => {
    // Wake-word check: only execute if it starts with "jarvis" OR if we're already in conversation mode
    const cleaned = final.toLowerCase().replace(/^(hey\s+|ok\s+)?jarvis[\s,!.?-]*/i, '').trim();
    const text = cleaned || final.trim();
    const start = performance.now();
    j.addChat({ role: 'user', text });
    j.addLog(`Voice: ${text}`, 'info');

    const stages = ['input', 'analyzing', 'reasoning', 'decision', 'executing', 'completed'] as const;
    for (const s of stages) {
      j.setThinking(s as any);
      await new Promise(r => setTimeout(r, 150));
    }

    const intent = parseCommand(text);
    let success = true;
    switch (intent.kind) {
      case 'set-mode': j.setMode(intent.mode); break;
      case 'toggle-device': {
        const d = fuzzyFind(j.devices, intent.query);
        if (d) j.toggleDevice(d.id); else success = false;
        break;
      }
      case 'toggle-automation': {
        const a = fuzzyFind(j.automations, intent.query);
        if (a) j.toggleAutomation(a.id); else success = false;
        break;
      }
      case 'toggle-module': {
        const m = fuzzyFind(j.modules, intent.query);
        if (m) j.toggleModule(m.id); else success = false;
        break;
      }
      case 'clear-chat': j.clearChat(); break;
      case 'search':
        try { window.open(`https://www.google.com/search?q=${encodeURIComponent(intent.query)}`, '_blank', 'noopener'); } catch {}
        break;
    }
    const reply = success ? intent.reply : `I could not find a match for that.`;
    j.addChat({ role: 'jarvis', text: reply });
    speak(reply);
    const dur = Math.round(performance.now() - start);
    j.setLastCommand({ text, success, durationMs: dur });
    j.addLog(`JARVIS: ${reply}`, success ? 'success' : 'warn');
    setTimeout(() => j.setThinking('idle'), 1000);
  });

  const sensitivity = Math.max(20, Math.min(100, speech.micLevel + 30));

  return (
    <div className="jarvis-panel p-3 flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">VOICE COMMAND CENTER</div>
        {!speech.supported && (
          <Badge variant="outline" className="h-4 px-1 border-yellow-500/50 text-yellow-400 text-[8px] bg-yellow-500/10">
            <AlertTriangle className="w-2.5 h-2.5 mr-1" />NO API
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-3 mb-3 shrink-0">
        <button
          onClick={speech.toggle}
          disabled={!speech.supported}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center relative shrink-0 transition-all ${
            speech.listening
              ? 'border-green-400 animate-pulse-cyan bg-green-500/10'
              : 'border-primary hover:bg-primary/10'
          } ${!speech.supported ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          title={speech.listening ? 'Click to stop listening' : 'Click to start listening'}
        >
          {speech.listening && <div className="absolute inset-0 rounded-full border border-green-400/50 animate-ping" />}
          {speech.listening
            ? <Mic className="w-4 h-4 text-green-400" />
            : <MicOff className="w-4 h-4 text-primary" />
          }
        </button>
        <div className="min-w-0 flex-1">
          <div className={`text-sm font-mono leading-tight ${speech.listening ? 'text-green-400 glow-text' : 'text-primary'}`}>
            {speech.listening ? 'Listening...' : speech.error ? 'Mic Error' : 'Click mic to start'}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className="text-[10px] text-primary/70 font-mono">Wake Word: JARVIS</span>
            <Badge variant="outline" className={`h-4 px-1 text-[9px] ${
              speech.listening
                ? 'border-green-500/50 text-green-400 bg-green-500/10'
                : 'border-primary/30 text-primary/70 bg-primary/5'
            }`}>
              {speech.listening ? 'ACTIVE' : 'IDLE'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-2 flex-1 min-h-0">
        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-primary/70">Mic Sensitivity</span>
            <span className="text-primary tabular-nums">{sensitivity}%</span>
          </div>
          <Progress value={sensitivity} className="h-1 bg-primary/20" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)] transition-all" />
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-primary/70">Speech Confidence</span>
            <span className="text-primary tabular-nums">{speech.confidence}%</span>
          </div>
          <Progress value={speech.confidence} className="h-1 bg-primary/20" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)] transition-all" />
        </div>
        {speech.interimTranscript && (
          <div className="text-[9px] font-mono text-primary/50 italic truncate">
            ...{speech.interimTranscript}
          </div>
        )}
      </div>

      <div className="mt-2 bg-primary/5 border border-primary/20 p-2 rounded-sm space-y-1 shrink-0">
        <div className="text-[10px] font-mono text-primary/80 truncate">
          <span className="text-primary/50">Last Command:</span> {j.lastCommand?.text || '—'}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[9px] font-mono text-primary/50 shrink-0">Execution:</span>
            {j.lastCommand?.success ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                <span className="text-[9px] font-mono text-green-400">SUCCESS</span>
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 text-red-400 shrink-0" />
                <span className="text-[9px] font-mono text-red-400">FAILED</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] font-mono text-primary/50">Response:</span>
            <span className="text-[9px] font-mono text-primary tabular-nums">
              {j.lastCommand ? (j.lastCommand.durationMs / 1000).toFixed(2) : '0.00'}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
