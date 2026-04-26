import React from 'react';
import { Globe } from 'lucide-react';

export function NetworkMap() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-2">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">NETWORK MAP</div>
        <div className="text-[9px] font-mono text-primary hover:underline cursor-pointer">VIEW FULL MAP</div>
      </div>

      <div className="flex-1 relative border border-primary/20 bg-black/20 rounded-sm mb-3 flex items-center justify-center overflow-hidden">
        {/* Simple stylized world map using SVG paths */}
        <svg viewBox="0 0 400 200" className="absolute w-[120%] h-[120%] opacity-30 text-primary fill-none stroke-current" strokeWidth="1" strokeDasharray="1 3">
           {/* Continents rough outlines */}
           <path d="M80,40 Q100,20 140,30 T160,80 T130,140 T90,160 T60,110 Z" />
           <path d="M220,30 Q260,10 320,40 T360,100 T290,140 T240,110 T200,70 Z" />
           <path d="M160,150 Q180,130 220,150 T240,180 T180,190 Z" />
        </svg>

        {/* Nodes */}
        <NetworkNode x="25%" y="35%" color="green" pulse />
        <NetworkNode x="45%" y="60%" color="primary" />
        <NetworkNode x="65%" y="30%" color="primary" pulse />
        <NetworkNode x="80%" y="45%" color="amber" pulse />
        <NetworkNode x="35%" y="75%" color="primary" />
        <NetworkNode x="75%" y="75%" color="primary" pulse />
        
        {/* Connections (Lines) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
           <path d="M 25 35 Q 35 45 45 60" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" />
           <path d="M 45 60 Q 55 40 65 30" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
           <path d="M 65 30 Q 75 35 80 45" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" />
           <path d="M 25 35 Q 30 55 35 75" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
           <path d="M 45 60 Q 60 70 75 75" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" />
        </svg>
      </div>

      <div className="flex flex-col text-[8px] font-mono">
         <div className="flex gap-3 mb-1 justify-center flex-wrap">
           <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> This Device</div>
           <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Camera Node</div>
           <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Cloud Server</div>
           <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Mobile Device</div>
         </div>
      </div>
    </div>
  );
}

function NetworkNode({ x, y, color, pulse }: { x: string, y: string, color: string, pulse?: boolean }) {
  const colorClass = color === 'green' ? 'bg-green-400' : color === 'amber' ? 'bg-yellow-400' : 'bg-primary';
  const shadowClass = color === 'green' ? 'shadow-[0_0_10px_rgba(0,255,148,0.8)]' : color === 'amber' ? 'shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'shadow-[0_0_10px_rgba(0,229,255,0.8)]';
  
  return (
    <div className="absolute w-2.5 h-2.5 transform -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      {pulse && <div className={`absolute inset-0 rounded-full ${colorClass} animate-ping opacity-75`} />}
      <div className={`relative w-full h-full rounded-full ${colorClass} ${shadowClass} border border-background`} />
    </div>
  );
}
