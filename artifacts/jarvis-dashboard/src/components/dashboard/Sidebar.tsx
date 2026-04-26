import React from 'react';
import { LayoutDashboard, Mic, MessageSquare, MonitorSmartphone, Cpu, Database, Brain, Activity, ShieldAlert, Network, TerminalSquare, Settings, Power } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'DASHBOARD', active: true },
  { icon: Mic, label: 'VOICE CONTROL' },
  { icon: MessageSquare, label: 'CONVERSATIONS' },
  { icon: MonitorSmartphone, label: 'DEVICES' },
  { icon: Cpu, label: 'AUTOMATION' },
  { icon: Database, label: 'MEMORY' },
  { icon: Brain, label: 'AI MODULES' },
  { icon: Activity, label: 'ANALYTICS' },
  { icon: ShieldAlert, label: 'SECURITY' },
  { icon: Network, label: 'NETWORK' },
  { icon: TerminalSquare, label: 'TERMINAL' },
  { icon: Settings, label: 'SETTINGS' },
];

export function Sidebar() {
  return (
    <div className="w-56 h-[calc(100vh-81px)] border-r border-primary/30 bg-background/80 flex flex-col sticky top-[81px]">
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 ${
                item.active 
                  ? 'bg-primary/20 border border-primary/50 text-primary glow-box' 
                  : 'text-primary/60 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <item.icon className={`w-4 h-4 ${item.active ? 'drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]' : ''}`} />
              <span className="text-xs font-mono tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-primary/30 bg-primary/5">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/20" />
              <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="251.2" strokeDashoffset="0" className="text-green-400 drop-shadow-[0_0_5px_rgba(0,255,148,0.5)]" />
            </svg>
            <div className="flex flex-col items-center text-center">
              <Power className="w-5 h-5 text-green-400 mb-1" />
              <span className="text-[10px] font-mono text-primary/70 leading-tight">SYSTEM<br/>POWER</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading text-green-400 glow-text">100%</div>
            <div className="text-[10px] font-mono text-green-400/70 tracking-widest">OPTIMAL</div>
          </div>
        </div>
      </div>
    </div>
  );
}
