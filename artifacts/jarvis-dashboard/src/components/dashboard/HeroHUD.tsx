import React from 'react';
import { MessageSquare, Code, LineChart, PenTool, Search, Zap, Send, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroHUD() {
  return (
    <div className="relative flex flex-col items-center h-full p-4 overflow-hidden">
      {/* Greeting */}
      <div className="relative w-full text-center mt-2 mb-3 z-20">
        <div className="absolute right-0 top-1 text-[10px] font-mono text-primary/70 hover:text-primary cursor-pointer hover:underline flex items-center gap-1">
          <Settings className="w-3 h-3" /> tools
        </div>
        <h2 className="text-2xl xl:text-3xl font-heading text-foreground tracking-widest">
          GOOD MORNING, <span className="text-primary glow-text">DAVOOD</span>
        </h2>
        <p className="text-xs xl:text-sm font-mono text-primary/70 mt-1">How can I assist you today?</p>
      </div>

      {/* Action Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 z-20 max-w-full">
        {[
          { label: 'CHAT', icon: MessageSquare },
          { label: 'CODE', icon: Code },
          { label: 'ANALYZE', icon: LineChart },
          { label: 'DESIGN', icon: PenTool },
          { label: 'RESEARCH', icon: Search },
          { label: 'AUTOMATE', icon: Zap },
        ].map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            className="border-primary/40 bg-primary/5 text-primary hover:bg-primary/20 hover:text-primary text-[10px] font-mono h-7 rounded-full px-3 border whitespace-nowrap"
          >
            <action.icon className="w-3 h-3 mr-1.5" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Central HUD area — flexes to fill remaining space */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-0">
        {/* 4 corner floating mini-panels — inside parent, never overflow */}
        <div className="absolute top-0 left-0 z-30">
          <CornerPanel title="AI MODE">
            <div className="w-10 h-10 my-1 animate-pulse-glow">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-none stroke-current" strokeWidth="2">
                <path d="M50,10 C30,10 20,25 20,45 C20,65 35,85 45,90 L50,95 L55,90 C65,85 80,65 80,45 C80,25 70,10 50,10 Z" className="fill-primary/10" />
                <line x1="35" y1="45" x2="45" y2="45" strokeWidth="3" />
                <line x1="55" y1="45" x2="65" y2="45" strokeWidth="3" />
                <path d="M40,70 Q50,75 60,70" />
              </svg>
            </div>
            <div className="text-[10px] font-mono text-primary font-bold text-center">ASSISTANT</div>
          </CornerPanel>
        </div>

        <div className="absolute top-0 right-0 z-30">
          <CornerPanel title="AI CONFIDENCE">
            <RadialGauge size={48} value={96} />
          </CornerPanel>
        </div>

        <div className="absolute bottom-0 left-0 z-30">
          <CornerPanel title="LEARNING RATE">
            <RadialGauge size={44} value={96} small />
            <div className="text-[8px] font-mono text-primary/60 mt-0.5">REAL-TIME</div>
          </CornerPanel>
        </div>

        <div className="absolute bottom-0 right-0 z-30">
          <CornerPanel title="FOCUS LEVEL">
            <div className="text-xs font-heading text-primary glow-text font-bold mb-1">HIGH</div>
            <div className="flex gap-[3px] h-5 items-end justify-center w-full px-1">
              {[0.4, 0.6, 0.8, 1, 0.9, 0.7, 0.9, 1, 0.8].map((h, i) => (
                <div key={i} className="w-1 bg-primary" style={{ height: `${h * 100}%` }} />
              ))}
            </div>
          </CornerPanel>
        </div>

        {/* Center ring + JARVIS — sized responsively, won't collide with corners */}
        <div className="relative w-[min(280px,55%)] aspect-square flex items-center justify-center">
          {/* Hex Grid Background */}
          <div className="absolute inset-[-20px] opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTEyIDBMIDI0IDEwTCAyNCAzMEwgMTIgNDBMIDAgMzBMIDAgMTBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEU1RkYiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-center" />

          {/* SVG rings */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g className="animate-rotate-slow origin-center">
              <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" className="text-primary/30" />
              <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="60 30" className="text-primary/50" />
              <polygon points="200,10 205,25 195,25" className="fill-primary" />
              <polygon points="200,390 205,375 195,375" className="fill-primary" />
              <polygon points="10,200 25,195 25,205" className="fill-primary" />
              <polygon points="390,200 375,195 375,205" className="fill-primary" />
            </g>

            <g className="animate-rotate-slow-reverse origin-center">
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={`tick1-${i}`} x1="200" y1="46" x2="200" y2="54" stroke="currentColor" strokeWidth="1" className="text-primary/60" transform={`rotate(${i * 15} 200 200)`} />
              ))}
            </g>

            <g className="animate-rotate-slow origin-center" style={{ animationDuration: '30s' }}>
              <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 6" className="text-primary/60" />
              {Array.from({ length: 12 }).map((_, i) => (
                <rect key={`tick2-${i}`} x="198" y="65" width="4" height="10" fill="currentColor" className="text-primary/40" transform={`rotate(${i * 30} 200 200)`} />
              ))}
            </g>

            <g className="origin-center animate-rotate-slow-reverse" style={{ animationDuration: '20s' }}>
              <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="100 20" filter="url(#hudGlow)" className="text-primary" />
              <circle cx="200" cy="200" r="92" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/80" />
            </g>

            <circle cx="200" cy="200" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary/50 animate-pulse-glow" />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="animate-pulse-glow">
              <span className="font-heading font-black text-primary text-xl xl:text-2xl tracking-[0.25em] glow-text drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
                J.A.R.V.I.S
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Command Input Bar */}
      <div className="w-full max-w-xl relative group z-20 mt-3">
        <div className="absolute -inset-0.5 bg-primary/20 blur-[8px] rounded-sm group-hover:bg-primary/30 transition duration-500" />
        <div className="relative flex items-center bg-background/80 border border-primary/50 rounded-sm p-1">
          <div className="px-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <input
            type="text"
            placeholder="Ask me anything or give a command..."
            className="flex-1 bg-transparent border-none text-sm font-mono text-primary placeholder:text-primary/40 focus:outline-none focus:ring-0 py-2 min-w-0"
          />
          <Button size="icon" variant="ghost" className="text-primary hover:bg-primary/20 hover:text-primary shrink-0 mr-1">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function CornerPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="jarvis-panel p-2 flex flex-col items-center w-[88px] backdrop-blur-sm bg-background/70">
      <div className="text-[8px] font-mono text-primary/70 tracking-wider text-center leading-tight mb-1">{title}</div>
      {children}
    </div>
  );
}

function RadialGauge({ size, value, small }: { size: number; value: number; small?: boolean }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-primary/20" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-primary glow-box"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className={`absolute font-heading ${small ? 'text-[10px]' : 'text-sm'} text-primary glow-text font-bold`}>
        {value}%
      </div>
    </div>
  );
}
