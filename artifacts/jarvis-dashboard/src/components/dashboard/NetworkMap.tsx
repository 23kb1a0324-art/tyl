import React from 'react';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';
import { useJarvis } from '@/store/jarvis';

export function NetworkMap() {
  const m = useSystemMetrics();
  const { devices } = useJarvis();
  const onlineCount = devices.filter(d => d.online).length;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-2">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">NETWORK MAP</div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${m.online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          <span className={`text-[9px] font-mono ${m.online ? 'text-green-400' : 'text-red-400'}`}>
            {m.online ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <div className="flex-1 relative border border-primary/20 bg-black/20 rounded-sm mb-2 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 400 200" className="absolute w-[120%] h-[120%] opacity-30 text-primary fill-none stroke-current" strokeWidth="1" strokeDasharray="1 3">
          <path d="M80,40 Q100,20 140,30 T160,80 T130,140 T90,160 T60,110 Z" />
          <path d="M220,30 Q260,10 320,40 T360,100 T290,140 T240,110 T200,70 Z" />
          <path d="M160,150 Q180,130 220,150 T240,180 T180,190 Z" />
        </svg>

        <NetworkNode x="25%" y="35%" color="green" pulse label="THIS DEVICE" />
        <NetworkNode x="45%" y="60%" color={m.online ? 'primary' : 'red'} label="GATEWAY" />
        <NetworkNode x="65%" y="30%" color={m.online ? 'primary' : 'red'} pulse={m.online} label="CLOUD" />
        <NetworkNode x="80%" y="45%" color={onlineCount > 3 ? 'primary' : 'amber'} pulse label="EDGE" />
        <NetworkNode x="35%" y="75%" color="primary" label="MOBILE" />
        <NetworkNode x="75%" y="75%" color={m.online ? 'primary' : 'red'} pulse={m.online} label="API" />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path d="M 25 35 Q 35 45 45 60" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" />
          <path d="M 45 60 Q 55 40 65 30" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
          <path d="M 65 30 Q 75 35 80 45" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" />
          <path d="M 25 35 Q 30 55 35 75" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
          <path d="M 45 60 Q 60 70 75 75" stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" />
        </svg>

        {/* Live ping overlay */}
        <div className="absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 rounded-sm border border-primary/30">
          <div className="text-[8px] font-mono text-primary tabular-nums">
            ping: <span className={m.pingMs && m.pingMs < 100 ? 'text-green-400' : 'text-yellow-400'}>
              {m.pingMs ?? '—'}ms
            </span>
          </div>
        </div>
        <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded-sm border border-primary/30">
          <div className="text-[8px] font-mono text-primary uppercase">
            {m.netType} · {m.netDownlinkMbps}Mbps
          </div>
        </div>
      </div>

      <div className="flex flex-col text-[8px] font-mono">
        <div className="flex gap-2 justify-center flex-wrap">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"/>Local</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"/>Cloud</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"/>Edge</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400"/>Down</span>
        </div>
      </div>
    </div>
  );
}

function NetworkNode({ x, y, color, pulse, label }: { x: string; y: string; color: string; pulse?: boolean; label?: string }) {
  const colorClass = color === 'green' ? 'bg-green-400' : color === 'amber' ? 'bg-yellow-400' : color === 'red' ? 'bg-red-400' : 'bg-primary';
  const shadowClass = color === 'green' ? 'shadow-[0_0_10px_rgba(0,255,148,0.8)]' : color === 'amber' ? 'shadow-[0_0_10px_rgba(250,204,21,0.8)]' : color === 'red' ? 'shadow-[0_0_10px_rgba(248,113,113,0.8)]' : 'shadow-[0_0_10px_rgba(0,229,255,0.8)]';
  return (
    <div className="absolute w-2.5 h-2.5 transform -translate-x-1/2 -translate-y-1/2 group" style={{ left: x, top: y }} title={label}>
      {pulse && <div className={`absolute inset-0 rounded-full ${colorClass} animate-ping opacity-75`} />}
      <div className={`relative w-full h-full rounded-full ${colorClass} ${shadowClass} border border-background`} />
    </div>
  );
}
