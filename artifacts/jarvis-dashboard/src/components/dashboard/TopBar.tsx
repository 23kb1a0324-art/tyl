import React, { useState, useEffect } from 'react';
import { Bot, Zap, Cpu, HardDrive, Network, User, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 border-b border-primary/30 bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-12 h-12 border border-primary/50 rotate-45 group">
          <div className="absolute inset-1 border border-primary/30" />
          <Bot className="w-6 h-6 text-primary -rotate-45 group-hover:animate-pulse-cyan" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-primary glow-text tracking-widest flex items-center gap-2">
            J<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            A<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            R<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            V<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            I<span className="w-1 h-1 rounded-full bg-primary inline-block"/>
            S
          </h1>
          <p className="text-[10px] tracking-[0.2em] text-primary/70">JUST A RATHER VERY INTELLIGENT SYSTEM</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary/70 tracking-wider">SYSTEM STATUS</span>
          <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 rounded-none text-xs gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            ONLINE
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <StatTile icon={Cpu} label="CPU" value="23%" />
          <StatTile icon={HardDrive} label="RAM" value="45%" />
          <StatTile icon={Zap} label="GPU" value="32%" />
          <StatTile icon={Network} label="NET" value="68%" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-xl font-mono text-primary glow-text">
            {time.toLocaleTimeString('en-US')}
          </div>
          <div className="text-xs font-mono text-primary/70 tracking-widest">
            {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
          </div>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-primary/30">
          <div className="text-right hidden md:block">
            <div className="text-xs font-mono text-primary/70">USER</div>
            <div className="text-sm font-heading tracking-wider text-primary">DAVOOD</div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 border border-primary/30 rounded-full animate-rotate-slow" />
            <Avatar className="w-10 h-10 border border-primary">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary font-heading">DV</AvatarFallback>
            </Avatar>
          </div>
          <ChevronDown className="w-4 h-4 text-primary/70" />
        </div>
      </div>
    </header>
  );
}

function StatTile({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  const isNet = label === 'NET';
  return (
    <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-sm">
      <Icon className="w-3.5 h-3.5 text-primary/70" />
      <span className="text-[10px] font-mono text-primary/70">{label}</span>
      <span className="text-xs font-mono text-primary">{value}</span>
      <div className="w-10 h-4 ml-1 flex items-end justify-center gap-[2px]">
        {isNet ? (
          <svg viewBox="0 0 40 16" className="w-full h-full text-primary fill-none stroke-current" strokeWidth="1.5">
            <path d="M0,8 Q5,2 10,8 T20,8 T30,8 T40,8" strokeDasharray="40" strokeDashoffset="0">
              <animate attributeName="d" values="M0,8 Q5,2 10,8 T20,8 T30,8 T40,8; M0,8 Q5,14 10,8 T20,8 T30,8 T40,8; M0,8 Q5,2 10,8 T20,8 T30,8 T40,8" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
        ) : (
          [40, 70, 45, 90, 60, 30].map((h, i) => (
            <div key={i} className="w-[3px] bg-primary/80" style={{ height: `${h}%` }} />
          ))
        )}
      </div>
    </div>
  );
}
