import React from 'react';
import { Settings } from 'lucide-react';

const MODES = [
  { name: 'ASSISTANT', active: true, angle: 0 },
  { name: 'DEVELOPER', active: false, angle: 60 },
  { name: 'SECURITY', active: false, angle: 120 },
  { name: 'SURVEILLANCE', active: false, angle: 180 },
  { name: 'AUTOMATION', active: false, angle: 240 },
  { name: 'OFFLINE', active: false, angle: 300 },
];

export function ModeSwitcher() {
  return (
    <div className="flex flex-col h-full justify-between items-center relative">
      <div className="w-full flex justify-between items-start mb-2">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">AI MODE</div>
        <Settings className="w-3 h-3 text-primary/70" />
      </div>

      <div className="flex-1 flex items-center justify-center relative w-full">
        {/* Dial Background */}
        <div className="absolute w-32 h-32 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
           <div className="absolute w-24 h-24 rounded-full border border-primary/30 border-dashed animate-rotate-slow" />
           <div className="absolute w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center bg-background/80 shadow-[0_0_15px_rgba(0,229,255,0.3)] z-10">
              <span className="text-[10px] font-heading text-primary glow-text font-bold">ASSISTANT</span>
           </div>
        </div>

        {/* Mode Nodes */}
        <div className="absolute w-40 h-40">
           {MODES.map((mode, i) => {
             const rad = (mode.angle - 90) * (Math.PI / 180);
             const x = 80 + 65 * Math.cos(rad);
             const y = 80 + 65 * Math.sin(rad);
             
             return (
               <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1" style={{ left: x, top: y }}>
                 <div className={`w-2 h-2 rounded-full ${mode.active ? 'bg-primary shadow-[0_0_8px_rgba(0,229,255,1)] animate-pulse' : 'bg-primary/30 border border-primary/50'}`} />
                 <div className={`text-[6px] font-mono whitespace-nowrap absolute top-3 ${mode.active ? 'text-primary font-bold' : 'text-primary/50'}`}>{mode.name}</div>
               </div>
             );
           })}
        </div>
      </div>

      <div className="mt-4 text-[9px] font-mono text-primary/70 bg-primary/10 px-3 py-1 rounded-sm border border-primary/20">
        CURRENT MODE: <span className="text-primary font-bold">ASSISTANT</span>
      </div>
    </div>
  );
}
