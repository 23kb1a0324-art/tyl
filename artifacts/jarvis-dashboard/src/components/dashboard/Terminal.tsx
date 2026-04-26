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

      <div className="flex-1 bg-black/60 border border-primary/30 rounded-sm p-3 font-mono text-[10px] flex flex-col mb-3 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
         
         <div className="space-y-2 relative z-10 flex-1">
           <div>
             <span className="text-primary font-bold">jarvis@system:~$</span> <span className="text-primary/90">scan --all</span>
             <div className="text-primary/50 mt-0.5 ml-2">Scanning all modules... [OK]</div>
           </div>
           <div>
             <span className="text-primary font-bold">jarvis@system:~$</span> <span className="text-primary/90">connect camera</span>
             <div className="text-primary/50 mt-0.5 ml-2">Connecting to camera 1... [OK]</div>
           </div>
           <div>
             <span className="text-primary font-bold">jarvis@system:~$</span> <span className="text-primary/90">status</span>
             <div className="text-green-400/80 mt-0.5 ml-2">All systems operational</div>
           </div>
           <div className="flex items-center">
             <span className="text-primary font-bold mr-2">jarvis@system:~$</span>
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
