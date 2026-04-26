import React from 'react';
import { Brain, CheckCircle2, CircleDashed } from 'lucide-react';

const STEPS = [
  { title: 'INPUT RECEIVED', desc: 'User Command Detected', status: 'completed' },
  { title: 'ANALYZING', desc: 'Understanding Intent', status: 'completed' },
  { title: 'REASONING', desc: 'Finding Best Action', status: 'completed' },
  { title: 'DECISION MADE', desc: 'Action Selected', status: 'completed' },
  { title: 'EXECUTING', desc: 'Command in Progress', status: 'active' },
  { title: 'COMPLETED', desc: 'Task Executed Successfully', status: 'pending' },
];

export function AIThinkingProcess() {
  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <Brain className="w-32 h-32 text-primary" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">AI THINKING PROCESS</div>
        <Brain className="w-4 h-4 text-primary relative z-10" />
      </div>

      <div className="flex-1 relative">
        <div className="absolute left-[7px] top-2 bottom-6 w-px bg-primary/20" />
        
        <div className="space-y-4 relative z-10">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-3 items-start group">
              <div className="mt-0.5 bg-card">
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : step.status === 'active' ? (
                  <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center animate-pulse-cyan">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                ) : (
                  <CircleDashed className="w-4 h-4 text-primary/30" />
                )}
              </div>
              <div>
                <div className={`text-[10px] font-mono font-bold ${
                  step.status === 'completed' ? 'text-primary' : 
                  step.status === 'active' ? 'text-primary glow-text' : 'text-primary/40'
                }`}>
                  {step.title}
                </div>
                <div className={`text-[9px] font-mono ${
                  step.status === 'completed' ? 'text-primary/70' : 
                  step.status === 'active' ? 'text-primary/90' : 'text-primary/30'
                }`}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
