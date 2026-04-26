import React from 'react';
import { Settings } from 'lucide-react';

const MODES = [
  { name: 'Assistant Mode', active: true },
  { name: 'Developer Mode', active: false },
  { name: 'Security Mode', active: false },
  { name: 'Surveillance Mode', active: false },
  { name: 'Automation Mode', active: false },
  { name: 'Offline Mode', active: false },
];

export function ModeSwitcher() {
  return (
    <div className="flex flex-col h-full justify-between relative">
      <div className="w-full flex justify-between items-start mb-2">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">AI MODE</div>
        <Settings className="w-3 h-3 text-primary/70" />
      </div>

      <div className="flex-1 flex items-center justify-start gap-4">
        {/* Dial */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0 ml-2">
          {/* Outer glowing ring */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-primary fill-none animate-rotate-slow">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" opacity="0.5" />
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="40 100" />
          </svg>
          {/* Inner ring */}
          <div className="absolute inset-2 rounded-full border border-primary/30 animate-rotate-slow-reverse" />
          {/* Center text */}
          <div className="text-[9px] font-heading text-primary font-bold tracking-widest glow-text">
            ASSISTANT
          </div>
        </div>

        {/* Mode List */}
        <div className="flex-1 space-y-1.5 pt-1">
           {MODES.map((mode, i) => (
             <div key={i} className="flex items-center gap-2">
               <div className={`w-1.5 h-1.5 rounded-full ${mode.active ? 'bg-primary shadow-[0_0_8px_rgba(0,229,255,1)]' : 'bg-primary/20'}`} />
               <div className={`text-[9px] font-mono ${mode.active ? 'text-primary font-bold' : 'text-primary/50'}`}>
                 {mode.name}
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
