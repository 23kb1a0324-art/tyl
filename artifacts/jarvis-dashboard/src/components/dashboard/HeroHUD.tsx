import React from 'react';
import { Brain, MessageSquare, Code, LineChart, PenTool, Search, Zap, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroHUD() {
  return (
    <div className="flex flex-col items-center justify-center h-full pt-8 relative">
      {/* Greeting */}
      <div className="text-center mb-8 z-10">
        <h2 className="text-3xl font-heading text-foreground tracking-widest mb-2">
          GOOD MORNING, <span className="text-primary glow-text">DAVOOD</span>
        </h2>
        <p className="text-sm font-mono text-primary/70">How can I assist you today?</p>
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
      <div className="relative w-[300px] h-[300px] flex items-center justify-center mb-12">
        {/* Hex Grid Background */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTEyIDBMIDI0IDEwTCAyNCAzMEwgMTIgNDBMIDAgMzBMIDAgMTBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEU1RkYiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-center mask-radial-fade" />
        
        {/* Rotating Rings */}
        <div className="absolute inset-0 border-[1px] border-dashed border-primary/30 rounded-full animate-rotate-slow" />
        <div className="absolute inset-2 border-[2px] border-primary/20 rounded-full animate-rotate-slow-reverse" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }} />
        <div className="absolute inset-6 border border-primary/40 rounded-full border-dotted animate-rotate-slow" />
        <div className="absolute inset-10 border-[3px] border-primary/10 rounded-full" />
        <div className="absolute inset-14 border border-primary/50 rounded-full animate-rotate-slow-reverse" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
        
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-current opacity-20">
              <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute w-full h-full text-primary fill-current z-10" style={{ transform: 'scale(0.6)' }}>
              <polygon points="50,15 85,75 15,75" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span className="font-heading font-bold text-background text-sm mt-2">AI</span>
            </div>
          </div>
        </div>

        {/* Floating Mini Panels */}
        <div className="absolute -left-16 top-1/4 jarvis-panel px-2 py-1 flex items-center gap-2">
          <Brain className="w-3 h-3 text-primary" />
          <div className="text-[8px] font-mono text-primary">AI MODE<br/>ASSISTANT</div>
        </div>
        
        <div className="absolute -right-16 top-1/4 jarvis-panel px-2 py-1 text-center">
          <div className="text-[8px] font-mono text-primary/70">CONFIDENCE</div>
          <div className="text-sm font-heading text-primary glow-text">96%</div>
        </div>

        <div className="absolute -left-12 bottom-1/4 jarvis-panel px-2 py-1">
          <div className="text-[8px] font-mono text-primary/70">LEARNING RATE</div>
          <div className="text-xs font-mono text-primary">REAL-TIME</div>
        </div>

        <div className="absolute -right-12 bottom-1/4 jarvis-panel px-2 py-1">
          <div className="text-[8px] font-mono text-primary/70">FOCUS LEVEL</div>
          <div className="text-xs font-mono text-primary">HIGH</div>
          <div className="flex gap-0.5 mt-1 h-2">
            {[1,0.8,0.6,0.9,1].map((h, i) => (
              <div key={i} className="w-1 bg-primary" style={{ height: `${h*100}%` }} />
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
