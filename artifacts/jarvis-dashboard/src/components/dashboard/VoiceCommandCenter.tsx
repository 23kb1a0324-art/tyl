import React from 'react';
import { Mic, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function VoiceCommandCenter() {
  return (
    <div className="jarvis-panel p-4 flex flex-col h-full">
      <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-4">VOICE COMMAND CENTER</div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center relative animate-pulse-cyan">
          <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" />
          <Mic className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-sm font-mono text-primary glow-text">Listening...</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-primary/70 font-mono">Wake Word: JARVIS</span>
            <Badge variant="outline" className="h-4 px-1 border-green-500/50 text-green-400 text-[9px] bg-green-500/10">ACTIVE</Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1.5">
            <span className="text-primary/70">Mic Sensitivity</span>
            <span className="text-primary">82%</span>
          </div>
          <Progress value={82} className="h-1 bg-primary/20" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1.5">
            <span className="text-primary/70">Speech Confidence</span>
            <span className="text-primary">94%</span>
          </div>
          <Progress value={94} className="h-1 bg-primary/20" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
        </div>
      </div>

      <div className="mt-6 bg-primary/5 border border-primary/20 p-3 rounded-sm space-y-2">
        <div className="text-xs font-mono text-primary/80"><span className="text-primary/50">Last Command:</span> Open VS Code</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[10px] font-mono text-green-400">SUCCESS</span>
          </div>
          <span className="text-[10px] font-mono text-primary/60">0.82s</span>
        </div>
      </div>
    </div>
  );
}
