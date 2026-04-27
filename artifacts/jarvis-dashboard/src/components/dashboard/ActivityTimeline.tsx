import React from 'react';
import { useJarvis } from '@/store/jarvis';

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

const LEVEL_COLOR: Record<string, string> = {
  info: 'bg-primary',
  success: 'bg-green-400',
  warn: 'bg-yellow-400',
  error: 'bg-red-400',
};

export function ActivityTimeline() {
  const { logs } = useJarvis();
  const recent = [...logs].slice(0, 6); // newest first

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-2 shrink-0">ACTIVITY TIMELINE</div>

      <div className="flex-1 relative overflow-y-auto custom-scrollbar pr-1 min-h-0">
        {/* Timeline line */}
        <div className="absolute left-2 top-0 bottom-0 w-px bg-primary/20" />

        {recent.length === 0 && (
          <div className="text-[9px] font-mono text-primary/40 italic pl-6 pt-2">
            No activity yet — interact to populate
          </div>
        )}

        {recent.map((event, index) => (
          <div
            key={event.id}
            className="flex items-start gap-3 mb-2 relative"
            style={{ animation: `pulse-glow 1.5s ease-out ${index * 0.1}s` }}
          >
            <div className="flex flex-col items-center pt-0.5 z-10 shrink-0">
              <div className={`w-3 h-3 rounded-full border border-primary/30 flex items-center justify-center ${LEVEL_COLOR[event.level]} ${index === 0 ? 'shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'opacity-70'}`}>
                <span className="w-1 h-1 rounded-full bg-background" />
              </div>
            </div>
            <div className="flex flex-col text-[10px] font-mono leading-snug min-w-0 flex-1">
              <span className="text-primary/50 text-[9px] tabular-nums">{fmtTime(event.time)}</span>
              <span className="text-primary truncate">{event.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
