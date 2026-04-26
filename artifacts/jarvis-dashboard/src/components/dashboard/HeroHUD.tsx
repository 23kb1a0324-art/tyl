import React from 'react';
import { Brain, MessageSquare, Code, LineChart, PenTool, Search, Zap, Send, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroHUD() {
  return (
    <div className="flex flex-col items-center justify-center h-full pt-8 relative">
      {/* Greeting */}
      <div className="text-center mb-8 z-10 relative w-full flex justify-center">
        <div className="absolute right-8 top-0 text-[10px] font-mono text-primary/70 hover:text-primary cursor-pointer hover:underline flex items-center gap-1">
          <Settings className="w-3 h-3" /> tools
        </div>
        <div>
          <h2 className="text-3xl font-heading text-foreground tracking-widest mb-2">
            GOOD MORNING, <span className="text-primary glow-text">DAVOOD</span>
          </h2>
          <p className="text-sm font-mono text-primary/70">How can I assist you today?</p>
        </div>
      </div>

      {/* Action Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 z-10">
        {[
          { label: 'CHAT', icon: MessageSquare },
          { label: 'CODE', icon: Code },
          { label: 'ANALYZE', icon: LineChart },
          { label: 'DESIGN', icon: PenTool },
          { label: 'RESEARCH', icon: Search },
          { label: 'AUTOMATE', icon: Zap },
        ].map((action) => (
          <Button key={action.label} variant="outline" size="sm" className="border-primary/40 bg-primary/5 text-primary hover:bg-primary/20 hover:text-primary text-[10px] font-mono h-7 rounded-full px-4 border">
            <action.icon className="w-3 h-3 mr-1.5" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Central HUD */}
      <div className="relative w-[340px] h-[340px] flex items-center justify-center mb-12">
        {/* Hex Grid Background */}
        <div className="absolute inset-[-40px] opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTEyIDBMIDI0IDEwTCAyNCAzMEwgMTIgNDBMIDAgMzBMIDAgMTBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEU1RkYiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-center mask-radial-fade" />
        
        {/* Complex SVG Rings */}
        <svg viewBox="0 0 400 400" className="absolute inset-[-30px] w-[118%] h-[118%] pointer-events-none">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Ring - Dashed & segmented */}
          <g className="animate-rotate-slow origin-center">
            <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" className="text-primary/30" />
            <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="60 30" className="text-primary/50" />
            {/* 4 outer directional triangles */}
            <polygon points="200,10 205,25 195,25" className="fill-primary" />
            <polygon points="200,390 205,375 195,375" className="fill-primary" />
            <polygon points="10,200 25,195 25,205" className="fill-primary" />
            <polygon points="390,200 375,195 375,205" className="fill-primary" />
          </g>

          {/* Mid Ring 1 */}
          <g className="animate-rotate-slow-reverse origin-center">
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={`tick1-${i}`} x1="200" y1="46" x2="200" y2="54" stroke="currentColor" strokeWidth="1" className="text-primary/60" transform={`rotate(${i * 15} 200 200)`} />
            ))}
          </g>

          {/* Mid Ring 2 */}
          <g className="animate-rotate-slow origin-center" style={{ animationDuration: '30s' }}>
            <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 6" className="text-primary/60" />
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={`tick2-${i}`} x="198" y="65" width="4" height="10" fill="currentColor" className="text-primary/40" transform={`rotate(${i * 30} 200 200)`} />
            ))}
          </g>

          {/* Inner Ring (Cyan Glow) */}
          <g className="origin-center animate-rotate-slow-reverse" style={{ animationDuration: '20s' }}>
            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="100 20" filter="url(#glow)" className="text-primary" />
            <circle cx="200" cy="200" r="92" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/80" />
          </g>

          {/* Very Inner Ring */}
          <circle cx="200" cy="200" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary/50 animate-pulse-glow" />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-pulse-glow">
            <span className="font-heading font-black text-primary text-2xl tracking-[0.3em] glow-text drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
              J.A.R.V.I.S
            </span>
          </div>
        </div>

        {/* Floating Mini Panels */}
        <div className="absolute -left-20 top-1/4 jarvis-panel p-2 flex flex-col items-center gap-1 w-24">
          <div className="text-[8px] font-mono text-primary/70">AI MODE</div>
          {/* Glowing AI Head SVG */}
          <div className="w-12 h-12 relative flex justify-center items-center my-1 animate-pulse-glow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-none stroke-current" strokeWidth="2">
              <path d="M50,10 C30,10 20,25 20,45 C20,65 35,85 45,90 L50,95 L55,90 C65,85 80,65 80,45 C80,25 70,10 50,10 Z" className="fill-primary/10" />
              <line x1="35" y1="45" x2="45" y2="45" strokeWidth="3" />
              <line x1="55" y1="45" x2="65" y2="45" strokeWidth="3" />
              <path d="M40,70 Q50,75 60,70" />
            </svg>
          </div>
          <div className="text-[10px] font-mono text-primary font-bold text-center">ASSISTANT</div>
        </div>
        
        <div className="absolute -right-20 top-1/4 jarvis-panel p-2 flex flex-col items-center w-24">
          <div className="text-[8px] font-mono text-primary/70 mb-2 text-center">AI CONFIDENCE</div>
          <div className="relative w-14 h-14 flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary/20" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary glow-box" strokeDasharray="251.2" strokeDashoffset="10.048" strokeLinecap="round" />
             </svg>
             <div className="absolute font-heading text-sm text-primary glow-text font-bold">96%</div>
          </div>
        </div>

        <div className="absolute -left-16 bottom-1/4 jarvis-panel p-2 flex flex-col items-center w-24">
          <div className="text-[8px] font-mono text-primary/70 text-center mb-1 leading-tight">LEARNING RATE<br/>REAL-TIME</div>
          <div className="relative w-12 h-12 flex items-center justify-center mt-1">
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary/20" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary" strokeDasharray="251.2" strokeDashoffset="10.048" />
             </svg>
             <div className="absolute font-mono text-[10px] text-primary">96%</div>
          </div>
        </div>

        <div className="absolute -right-16 bottom-1/4 jarvis-panel p-2 flex flex-col items-center w-24">
          <div className="text-[8px] font-mono text-primary/70 text-center mb-2">FOCUS LEVEL</div>
          <div className="text-xs font-heading text-primary glow-text font-bold mb-1.5">HIGH</div>
          <div className="flex gap-1 h-5 items-end justify-center w-full px-1">
            {[0.4, 0.6, 0.8, 1, 0.9, 0.7, 0.9, 1, 0.8, 0.5].map((h, i) => (
              <div key={i} className="w-1.5 bg-primary" style={{ height: `${h*100}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Command Input Bar */}
      <div className="w-full max-w-xl relative group z-10">
        <div className="absolute -inset-0.5 bg-primary/20 blur-[8px] rounded-sm group-hover:bg-primary/30 transition duration-500" />
        <div className="relative flex items-center bg-background/80 border border-primary/50 rounded-sm p-1">
          <div className="px-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <input 
            type="text" 
            placeholder="Ask me anything or give a command..." 
            className="flex-1 bg-transparent border-none text-sm font-mono text-primary placeholder:text-primary/40 focus:outline-none focus:ring-0 py-2"
          />
          <Button size="icon" variant="ghost" className="text-primary hover:bg-primary/20 hover:text-primary shrink-0 mr-1">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
