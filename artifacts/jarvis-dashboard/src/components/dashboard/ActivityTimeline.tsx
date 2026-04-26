import React from 'react';
import { FileText, Camera, Terminal, Shield, Zap } from 'lucide-react';

const EVENTS = [
  { time: '10:35 AM', type: 'Voice Command Executed', detail: 'Open VS Code', icon: Zap },
  { time: '10:22 AM', type: 'Camera 1 Motion Detected', detail: 'Recording Started', icon: Camera },
  { time: '10:15 AM', type: 'Python Script Executed', detail: 'data_analysis.py', icon: Terminal },
  { time: '10:02 AM', type: 'Threat Scan Completed', detail: 'No threats found', icon: Shield },
  { time: '09:30 AM', type: 'System Optimization', detail: 'Performance improved', icon: FileText },
];

export function ActivityTimeline() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">ACTIVITY TIMELINE</div>
        <div className="text-[9px] font-mono text-primary hover:underline cursor-pointer">VIEW ALL</div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-primary/20" />
        
        <div className="space-y-3 relative z-10 pl-1">
          {EVENTS.map((event, i) => (
            <div key={i} className="flex gap-3 items-start group">
              <div className="mt-0.5 bg-background p-0.5 rounded-full border border-primary/30 z-10 group-hover:border-primary group-hover:bg-primary/20 transition-colors">
                <event.icon className="w-3 h-3 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="text-[10px] font-mono text-primary/90">{event.type}</div>
                  <div className="text-[8px] font-mono text-primary/50">{event.time}</div>
                </div>
                <div className="text-[9px] font-mono text-primary/50 flex items-center gap-1 mt-0.5">
                  <span className="text-primary/30">→</span> {event.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
