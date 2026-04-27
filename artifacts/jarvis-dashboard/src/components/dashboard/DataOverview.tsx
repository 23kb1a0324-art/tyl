import React, { useEffect, useState } from 'react';
import { Database } from 'lucide-react';
import { useJarvis } from '@/store/jarvis';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)}KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)}MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)}GB`;
}

function getLocalStorageSize(): number {
  if (typeof window === 'undefined') return 0;
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    const v = localStorage.getItem(k) || '';
    total += k.length + v.length;
  }
  return total * 2; // UTF-16
}

export function DataOverview() {
  const { conversations, logs, devices, automations, modules } = useJarvis();
  const [storage, setStorage] = useState(0);
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    setStorage(getLocalStorageSize());
    const t = setInterval(() => {
      const s = getLocalStorageSize();
      setStorage(prev => {
        setGrowth(s - prev);
        return s;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const totalRecords = conversations.length + logs.length + devices.length + automations.length + modules.length;

  return (
    <div className="flex flex-col h-full min-h-0 gap-2">
      <div className="flex justify-between items-start shrink-0">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">DATA OVERVIEW</div>
        <Database className="w-4 h-4 text-primary/70" />
      </div>

      <div className="flex justify-between items-center gap-2 flex-1 min-h-0 relative">
        <div className="min-w-0">
          <div className="text-2xl xl:text-3xl font-heading text-primary glow-text leading-none tabular-nums">
            {formatBytes(storage)}
          </div>
          <div className={`text-[9px] font-mono mt-1.5 ${growth >= 0 ? 'text-green-400' : 'text-yellow-400'}`}>
            {growth >= 0 ? '+' : ''}{formatBytes(Math.abs(growth))} LIVE
          </div>
        </div>

        <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 120" className="w-full h-full text-primary fill-none stroke-current" strokeWidth="1.5">
            <ellipse cx="50" cy="25" rx="35" ry="12" className="fill-primary/10" />
            <ellipse cx="50" cy="55" rx="35" ry="12" className="fill-primary/5" />
            <ellipse cx="50" cy="85" rx="35" ry="12" className="fill-primary/10" />
            <path d="M15,25 L15,85" />
            <path d="M85,25 L85,85" />
            <path d="M15,55 C15,65 85,65 85,55" strokeDasharray="4 4" className="opacity-50" />
            <ellipse cx="50" cy="55" rx="45" ry="20" stroke="rgba(0,229,255,0.4)" strokeWidth="1" transform="rotate(-15 50 55)" />
            <ellipse cx="50" cy="55" rx="45" ry="20" stroke="rgba(0,229,255,0.4)" strokeWidth="1" transform="rotate(15 50 55)" />
            <circle cx="50" cy="55" r="3" fill="currentColor" className="animate-pulse" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 shrink-0">
        <Stat label="RECORDS" value={totalRecords} />
        <Stat label="CHATS" value={conversations.length} />
        <Stat label="EVENTS" value={logs.length} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-[8px] font-mono text-primary/50 tracking-wider">{label}</div>
      <div className="text-xs font-heading text-primary tabular-nums">{value.toLocaleString()}</div>
    </div>
  );
}
