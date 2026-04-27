import React from 'react';
import { Mic, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function VoiceCommandCenter() {
  return (
    <div className="jarvis-panel p-3 flex flex-col h-full min-h-0">
      <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-2 shrink-0">VOICE COMMAND CENTER</div>

      <div className="flex items-center gap-3 mb-3 shrink-0">
        <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center relative animate-pulse-cyan shrink-0">
          <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" />
          <Mic className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-mono text-primary glow-text leading-tight">Listening...</div>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className="text-[10px] text-primary/70 font-mono">Wake Word: JARVIS</span>
            <Badge variant="outline" className="h-4 px-1 border-green-500/50 text-green-400 text-[9px] bg-green-500/10">ACTIVE</Badge>
          </div>
        </div>
      </div>

      <div className="space-y-2 flex-1 min-h-0">
        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-primary/70">Mic Sensitivity</span>
            <span className="text-primary">82%</span>
          </div>
          <Progress value={82} className="h-1 bg-primary/20" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-primary/70">Speech Confidence</span>
            <span className="text-primary">94%</span>
          </div>
          <Progress value={94} className="h-1 bg-primary/20" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
        </div>
      </div>

      <div className="mt-2 bg-primary/5 border border-primary/20 p-2 rounded-sm space-y-1 shrink-0">
        <div className="text-[10px] font-mono text-primary/80 truncate">
          <span className="text-primary/50">Last Command:</span> Open VS Code
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[9px] font-mono text-primary/50 shrink-0">Execution:</span>
            <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
            <span className="text-[9px] font-mono text-green-400">SUCCESS</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] font-mono text-primary/50">Response:</span>
            <span className="text-[9px] font-mono text-primary">0.82s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
