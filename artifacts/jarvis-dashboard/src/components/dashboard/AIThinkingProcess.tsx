import React from 'react';
import { Brain, CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';
import { useJarvis, ThinkingStage } from '@/store/jarvis';

const STEPS: { key: ThinkingStage; title: string; desc: string }[] = [
  { key: 'input',     title: 'INPUT RECEIVED', desc: 'User Command Detected' },
  { key: 'analyzing', title: 'ANALYZING',      desc: 'Understanding Intent' },
  { key: 'reasoning', title: 'REASONING',      desc: 'Finding Best Action' },
  { key: 'decision',  title: 'DECISION MADE',  desc: 'Action Selected' },
  { key: 'executing', title: 'EXECUTING',      desc: 'Command in Progress' },
  { key: 'completed', title: 'COMPLETED',      desc: 'Task Executed Successfully' },
];

const ORDER: ThinkingStage[] = ['idle', 'input', 'analyzing', 'reasoning', 'decision', 'executing', 'completed'];

function statusFor(stage: ThinkingStage, current: ThinkingStage) {
  const ci = ORDER.indexOf(current);
  const si = ORDER.indexOf(stage);
  if (current === 'idle') {
    // Show all completed when idle (last successful run rest state)
    return 'completed';
  }
  if (ci > si) return 'completed';
  if (ci === si) return 'active';
  return 'pending';
}

export function AIThinkingProcess() {
  const { thinking } = useJarvis();
  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <Brain className="w-32 h-32 text-primary" />
      </div>

      <div className="flex justify-between items-start mb-3">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">AI THINKING PROCESS</div>
        <div className="flex items-center gap-1.5">
          {thinking !== 'idle' && <Loader2 className="w-3 h-3 text-primary animate-spin" />}
          <Brain className="w-4 h-4 text-primary relative z-10" />
        </div>
      </div>

      <div className="flex-1 relative min-h-0">
        <div className="absolute left-[7px] top-2 bottom-6 w-px bg-primary/20" />

        <div className="space-y-2.5 relative z-10">
          {STEPS.map((step) => {
            const s = statusFor(step.key, thinking);
            return (
              <div key={step.key} className="flex gap-3 items-start group">
                <div className="mt-0.5 bg-card">
                  {s === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : s === 'active' ? (
                    <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center animate-pulse-cyan">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <CircleDashed className="w-4 h-4 text-primary/30" />
                  )}
                </div>
                <div>
                  <div className={`text-[10px] font-mono font-bold ${
                    s === 'completed' ? 'text-primary' :
                    s === 'active' ? 'text-primary glow-text' : 'text-primary/40'
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-[9px] font-mono ${
                    s === 'completed' ? 'text-primary/70' :
                    s === 'active' ? 'text-primary/90' : 'text-primary/30'
                  }`}>
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
