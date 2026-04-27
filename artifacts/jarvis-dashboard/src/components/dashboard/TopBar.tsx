import React, { useState, useEffect } from 'react';
import { Bot, Zap, Cpu, HardDrive, Network, ChevronDown, WifiOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  const m = useSystemMetrics();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const gpu = Math.max(10, Math.min(95, m.cpuLoad - 5));
  const netPct = m.online ? Math.min(99, Math.round((m.netDownlinkMbps / 25) * 100)) : 0;

  return (
    <header className="flex items-center justify-between gap-3 px-3 py-2 border-b border-primary/30 bg-background/90 backdrop-blur-md sticky top-0 z-50 min-w-0">
      <div className="flex items-center gap-3 shrink-0 min-w-0">
        <div className="relative flex items-center justify-center w-10 h-10 border border-primary/50 rotate-45 group shrink-0">
          <div className="absolute inset-1 border border-primary/30" />
          <Bot className="w-5 h-5 text-primary -rotate-45 group-hover:animate-pulse-cyan" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl xl:text-2xl font-bold font-heading text-primary glow-text tracking-widest flex items-center gap-1.5 whitespace-nowrap">
            J<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            A<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            R<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            V<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            I<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            S
          </h1>
          <p className="text-[9px] tracking-[0.2em] text-primary/70 hidden lg:block whitespace-nowrap">JUST A RATHER VERY INTELLIGENT SYSTEM</p>
        </div>
      </div>

      <div className="flex items-center gap-3 xl:gap-6 min-w-0 flex-1 justify-center overflow-hidden">
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-primary/70 tracking-wider hidden xl:inline">SYSTEM STATUS</span>
          {m.online ? (
            <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 rounded-none text-[10px] gap-1.5 px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              ONLINE
            </Badge>
          ) : (
            <Badge variant="outline" className="border-red-500/50 text-red-400 bg-red-500/10 rounded-none text-[10px] gap-1.5 px-2 py-0.5">
              <WifiOff className="w-3 h-3" />
              OFFLINE
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 xl:gap-3 min-w-0 overflow-hidden">
          <StatTile icon={Cpu} label="CPU" value={`${m.cpuLoad}%`} />
          <StatTile icon={HardDrive} label="RAM" value={`${m.memPercent || 0}%`} />
          <StatTile icon={Zap} label="GPU" value={`${gpu}%`} />
          <StatTile icon={Network} label="NET" value={m.online ? `${netPct}%` : 'OFF'} animated={m.online} />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right hidden sm:block">
          <div className="text-base xl:text-lg font-mono text-primary glow-text leading-tight whitespace-nowrap">
            {time.toLocaleTimeString('en-US')}
          </div>
          <div className="text-[9px] font-mono text-primary/70 tracking-widest leading-tight whitespace-nowrap hidden lg:block">
            {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
          </div>
        </div>

        <div className="flex items-center gap-2 pl-3 border-l border-primary/30">
          <div className="text-right hidden xl:block">
            <div className="text-[10px] font-mono text-primary/70 leading-tight">USER</div>
            <div className="text-xs font-heading tracking-wider text-primary leading-tight">DAVOOD</div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 border border-primary/30 rounded-full animate-rotate-slow" />
            <Avatar className="w-8 h-8 border border-primary">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary font-heading text-xs">DV</AvatarFallback>
            </Avatar>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-primary/70" />
        </div>
      </div>
    </header>
  );
}

function StatTile({ icon: Icon, label, value, animated }: { icon: any; label: string; value: string; animated?: boolean }) {
  const isNet = label === 'NET';
  // Generate sparkline bars based on value digit
  const numeric = parseInt(value, 10);
  const heights = isFinite(numeric)
    ? [40, 70, 45, 90, 60, 30].map(h => Math.max(20, Math.min(100, h * (numeric / 50))))
    : [40, 70, 45, 90, 60, 30];
  return (
    <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/20 px-2 py-1 rounded-sm shrink-0">
      <Icon className="w-3.5 h-3.5 text-primary/70 shrink-0" />
      <span className="text-[10px] font-mono text-primary/70 hidden xl:inline">{label}</span>
      <span className="text-[11px] font-mono text-primary tabular-nums">{value}</span>
      <div className="w-7 xl:w-10 h-3.5 items-end justify-center gap-[2px] hidden md:flex">
        {isNet && animated ? (
          <svg viewBox="0 0 40 16" className="w-full h-full text-primary fill-none stroke-current" strokeWidth="1.5">
            <path d="M0,8 Q5,2 10,8 T20,8 T30,8 T40,8">
              <animate attributeName="d" values="M0,8 Q5,2 10,8 T20,8 T30,8 T40,8; M0,8 Q5,14 10,8 T20,8 T30,8 T40,8; M0,8 Q5,2 10,8 T20,8 T30,8 T40,8" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
        ) : (
          heights.map((h, i) => (
            <div key={i} className="w-[2px] bg-primary/80" style={{ height: `${h}%` }} />
          ))
        )}
      </div>
    </div>
  );
}
