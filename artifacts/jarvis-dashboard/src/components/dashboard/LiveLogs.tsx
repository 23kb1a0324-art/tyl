import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useJarvis } from '@/store/jarvis';

const LEVEL_COLORS: Record<string, string> = {
  info: 'text-primary/80',
  success: 'text-green-400',
  warn: 'text-yellow-400',
  error: 'text-red-400',
};

function fmtTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-US', { hour12: false });
}

export function LiveLogs() {
  const { logs } = useJarvis();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sorted newest-first → display oldest-first by reversing for terminal feel
  const ordered = [...logs].reverse();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-2 shrink-0 flex items-center justify-between">
        <span>LIVE SYSTEM LOGS</span>
        <span className="text-[9px] text-primary tabular-nums">{logs.length} events</span>
      </div>

      <div className="flex-1 bg-black/40 border border-primary/20 rounded-sm p-2 overflow-hidden mb-2 relative font-mono text-[9px] leading-tight min-h-0">
        <ScrollArea className="h-[170px]" ref={scrollRef as any}>
          <div className="space-y-1 p-1">
            {ordered.length === 0 && (
              <div className="text-primary/40 italic">No events yet — interact with the dashboard</div>
            )}
            {ordered.map((log) => (
              <div key={log.id} className="flex gap-1.5">
                <span className="text-primary/40 shrink-0">[{fmtTime(log.time)}]</span>
                <span className={`shrink-0 uppercase ${LEVEL_COLORS[log.level]}`}>[{log.level}]</span>
                <span className={`${LEVEL_COLORS[log.level]} truncate`}>{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px]" />
      </div>
    </div>
  );
}
