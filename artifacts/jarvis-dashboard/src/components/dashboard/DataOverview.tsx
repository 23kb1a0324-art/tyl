import React from 'react';
import { Database } from 'lucide-react';

export function DataOverview() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-start">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">DATA OVERVIEW</div>
        <Database className="w-4 h-4 text-primary/70" />
      </div>

      <div className="flex justify-between items-end mb-4 relative">
        <div>
          <div className="text-3xl font-heading text-primary glow-text">24.7 TB</div>
          <div className="text-[10px] font-mono text-green-400">+2.4 TB SINCE LAST WEEK</div>
        </div>
        
        <div className="w-20 h-24 relative flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-full h-full text-primary fill-none stroke-current" strokeWidth="1.5">
            {/* Top Ellipse */}
            <ellipse cx="50" cy="25" rx="35" ry="12" className="fill-primary/10" />
            
            {/* Middle Ellipse */}
            <ellipse cx="50" cy="55" rx="35" ry="12" className="fill-primary/5" />
            
            {/* Bottom Ellipse */}
            <ellipse cx="50" cy="85" rx="35" ry="12" className="fill-primary/10" />
            
            {/* Vertical Lines connecting ellipses */}
            <path d="M15,25 L15,85" />
            <path d="M85,25 L85,85" />
            
            {/* Middle connecting lines */}
            <path d="M15,55 C15,65 85,65 85,55" strokeDasharray="4 4" className="opacity-50" />
            
            {/* Orbital rings */}
            <ellipse cx="50" cy="55" rx="45" ry="20" stroke="rgba(0,229,255,0.4)" strokeWidth="1" transform="rotate(-15 50 55)" />
            <ellipse cx="50" cy="55" rx="45" ry="20" stroke="rgba(0,229,255,0.4)" strokeWidth="1" transform="rotate(15 50 55)" />
            
            {/* Glow / Pulse Dot */}
            <circle cx="50" cy="55" r="3" fill="currentColor" className="animate-pulse" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-primary/20 pt-3">
        <div>
          <div className="text-[8px] font-mono text-primary/50">DATA SOURCES</div>
          <div className="text-xs font-mono text-primary">126</div>
        </div>
        <div>
          <div className="text-[8px] font-mono text-primary/50">FILES PROCESSED</div>
          <div className="text-xs font-mono text-primary">15,892</div>
        </div>
        <div>
          <div className="text-[8px] font-mono text-primary/50">QUERIES TODAY</div>
          <div className="text-xs font-mono text-primary">3,452</div>
        </div>
      </div>
    </div>
  );
}
