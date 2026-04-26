import React from 'react';
import { Database } from 'lucide-react';

export function DataOverview() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-start">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">DATA OVERVIEW</div>
        <Database className="w-4 h-4 text-primary/70" />
      </div>

      <div className="flex justify-between items-end mb-4">
        <div>
          <div className="text-3xl font-heading text-primary glow-text">24.7 TB</div>
          <div className="text-[10px] font-mono text-green-400">+2.4 TB SINCE LAST WEEK</div>
        </div>
        
        <div className="w-12 h-12 relative group">
          <div className="absolute inset-0 border border-primary/50 transform rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
          <div className="absolute inset-2 border border-primary/30 transform -rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
          <div className="absolute inset-4 bg-primary/20 backdrop-blur-sm transform rotate-12" />
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
