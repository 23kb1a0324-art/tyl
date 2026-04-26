import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Terminal() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-3">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">TERMINAL</div>
        <TerminalIcon className="w-3 h-3 text-primary/70" />
      </div>

      <div className="flex-1 bg-black border border-primary/30 rounded-sm p-3 font-mono text-[10px] flex flex-col mb-3 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
         
         <div className="space-y-2 relative z-10 flex-1">
           <div>
             <span className="text-primary glow-text">jarvis@system:~$</span> scan --all
             <div className="text-primary/60 mt-0.5">Scanning all modules...</div>
           </div>
           <div>
             <span className="text-primary glow-text">jarvis@system:~$</span> connect camera
             <div className="text-primary/60 mt-0.5">Connecting to camera 1...</div>
           </div>
           <div>
             <span className="text-primary glow-text">jarvis@system:~$</span> status
             <div className="text-green-400 mt-0.5">All systems operational</div>
           </div>
           <div className="flex items-center">
             <span className="text-primary glow-text mr-2">jarvis@system:~$</span>
             <span className="w-2 h-3 bg-primary animate-blink" />
           </div>
         </div>
      </div>

      <Button variant="outline" className="w-full h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm">
        OPEN FULL TERMINAL
      </Button>
    </div>
  );
}
