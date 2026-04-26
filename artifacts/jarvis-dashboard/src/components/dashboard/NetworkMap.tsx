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
        {/* Simple stylized world map using SVG paths (abstracted) */}
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-30 text-primary fill-current">
          <path d="M50,100 C80,80 120,70 150,90 C180,110 220,120 250,100 C280,80 320,70 350,90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="85" r="40" className="opacity-20" />
          <circle cx="280" cy="95" r="30" className="opacity-20" />
        </svg>

        {/* Nodes */}
        <NetworkNode x="30%" y="45%" color="green" pulse />
        <NetworkNode x="45%" y="60%" color="primary" />
        <NetworkNode x="65%" y="35%" color="primary" pulse />
        <NetworkNode x="75%" y="55%" color="amber" />
        <NetworkNode x="20%" y="55%" color="primary" pulse />
        
        {/* Connections (Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
           <line x1="30%" y1="45%" x2="45%" y2="60%" stroke="hsl(var(--primary))" strokeWidth="1" />
           <line x1="45%" y1="60%" x2="65%" y2="35%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2 2" />
           <line x1="65%" y1="35%" x2="75%" y2="55%" stroke="hsl(var(--primary))" strokeWidth="1" />
           <line x1="30%" y1="45%" x2="20%" y2="55%" stroke="hsl(var(--primary))" strokeWidth="1" />
        </svg>
      </div>

      <div className="flex justify-between items-center text-[8px] font-mono">
         <div className="flex items-center gap-2">
            <span className="text-primary/70">Active Connections:</span>
            <span className="text-primary">12</span>
         </div>
         <div className="flex items-center gap-2">
            <span className="text-primary/70">Status:</span>
            <span className="text-green-400">STABLE</span>
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
