import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const INITIAL_LOGS = [
  "[10:42:31] [INFO] System boot: All systems operational",
  "[10:42:32] [INFO] Voice engine initialized",
  "[10:42:33] [INFO] Connecting to external nodes...",
  "[10:42:34] [INFO] AI core ready and optimized",
  "[10:42:35] [SUCCESS] All automations running",
  "[10:42:36] [INFO] Waiting for command..."
];

export function LiveLogs() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const randomLogs = [
        "[INFO] Scanning background processes...",
        "[INFO] Memory garbage collection complete",
        "[INFO] Syncing with Cloud Node...",
        "[SUCCESS] Network latency stabilized at 12ms"
      ];
      const newLog = `[${timeStr}] ${randomLogs[Math.floor(Math.random() * randomLogs.length)]}`;
      
      setLogs(prev => {
        const next = [...prev, newLog];
        if (next.length > 50) return next.slice(next.length - 50);
        return next;
      });
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-3">LIVE SYSTEM LOGS</div>
      
      <div className="flex-1 bg-black/40 border border-primary/20 rounded-sm p-2 overflow-hidden mb-3 relative font-mono text-[9px] leading-tight">
        <ScrollArea className="h-[150px]" ref={scrollRef}>
          <div className="space-y-1.5 p-1">
            {logs.map((log, i) => {
              const timeMatch = log.match(/^(\[\d{2}:\d{2}:\d{2}\])\s(.*)$/);
              if (!timeMatch) return <div key={i} className="text-primary/70">{log}</div>;
              
              const [, timeStr, restStr] = timeMatch;
              
              return (
                <div key={i} className="text-primary/60 break-all flex gap-1">
                  <span className="text-primary/40 shrink-0">{timeStr}</span>
                  <span>
                    {restStr.includes('[INFO]') ? (
                      <span className="text-primary mr-1">[INFO]</span>
                    ) : restStr.includes('[SUCCESS]') ? (
                      <span className="text-green-400 mr-1">[SUCCESS]</span>
                    ) : restStr.includes('[WARN]') ? (
                      <span className="text-yellow-400 mr-1">[WARN]</span>
                    ) : null}
                    <span className="text-primary/80">{restStr.replace(/\[INFO\]|\[SUCCESS\]|\[WARN\]/, '')}</span>
                  </span>
                </div>
              );
            })}
            <div className="animate-blink w-1.5 h-2.5 bg-primary inline-block ml-1" />
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm">CLEAR LOGS</Button>
        <Button variant="outline" className="flex-1 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm">EXPORT LOGS</Button>
      </div>
    </div>
  );
}
