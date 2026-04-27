import React from 'react';
import { Settings, Bot, Focus, Moon, Shield } from 'lucide-react';
import { useJarvis, Mode } from '@/store/jarvis';

const MODES: { key: Mode; name: string; icon: any }[] = [
  { key: 'assistant', name: 'Assistant Mode', icon: Bot },
  { key: 'focus',     name: 'Focus Mode',     icon: Focus },
  { key: 'security',  name: 'Security Mode',  icon: Shield },
  { key: 'sleep',     name: 'Sleep Mode',     icon: Moon },
];

export function ModeSwitcher() {
  const { mode, setMode } = useJarvis();

  return (
    <div className="jarvis-panel p-3 flex flex-col h-full justify-between relative">
      <div className="w-full flex justify-between items-start mb-2">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">AI MODE</div>
        <Settings className="w-3 h-3 text-primary/70" />
      </div>

      <div className="flex-1 flex items-center justify-start gap-3">
        {/* Dial */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-primary fill-none animate-rotate-slow">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" opacity="0.5" />
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="40 100" />
          </svg>
          <div className="absolute inset-2 rounded-full border border-primary/30 animate-rotate-slow-reverse" />
          <div className="text-[9px] font-heading text-primary font-bold tracking-widest glow-text uppercase text-center px-2">
            {mode}
          </div>
        </div>

        {/* Mode List */}
        <div className="flex-1 space-y-1 pt-1 min-w-0">
          {MODES.map((m) => {
            const active = mode === m.key;
            const Icon = m.icon;
            return (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className="flex items-center gap-2 w-full hover:bg-primary/10 rounded-sm px-1 py-0.5 transition-colors"
              >
                <Icon className={`w-3 h-3 shrink-0 ${active ? 'text-primary' : 'text-primary/40'}`} />
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-primary shadow-[0_0_8px_rgba(0,229,255,1)]' : 'bg-primary/20'}`} />
                <div className={`text-[9px] font-mono truncate ${active ? 'text-primary font-bold' : 'text-primary/50'}`}>
                  {m.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
