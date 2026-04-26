import React from 'react';
import { Database, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function MemoryCenter() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="text-[10px] font-mono text-primary/70 tracking-widest">MEMORY CENTER</div>
          <Database className="w-3 h-3 text-primary/70" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="text-[8px] font-mono text-primary/50">User Profile</div>
            <div className="text-[10px] font-mono text-primary">Davood</div>
          </div>
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="text-[8px] font-mono text-primary/50">Role</div>
            <div className="text-[10px] font-mono text-primary">Developer</div>
          </div>
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="text-[8px] font-mono text-primary/50">Working Style</div>
            <div className="text-[10px] font-mono text-primary">Focused</div>
          </div>
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[8px] font-mono text-primary/50">Usage 68%</span>
              <span className="text-[8px] font-mono text-primary/40">8.2/12GB</span>
            </div>
            <Progress value={68} className="h-1 bg-primary/20" indicatorClassName="bg-primary" />
          </div>
        </div>

        <div>
          <div className="text-[9px] font-mono text-primary/60 mb-2">RECENT MEMORIES</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-primary/40" />
              <div className="text-[9px] font-mono text-primary/80 truncate">Discussed CCTV project architecture</div>
              <div className="text-[8px] font-mono text-primary/40 ml-auto">2h ago</div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-primary/40" />
              <div className="text-[9px] font-mono text-primary/80 truncate">Requested Jarvis OS UI design</div>
              <div className="text-[8px] font-mono text-primary/40 ml-auto">5h ago</div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-primary/40" />
              <div className="text-[9px] font-mono text-primary/80 truncate">Optimized Python code</div>
              <div className="text-[8px] font-mono text-primary/40 ml-auto">1d ago</div>
            </div>
          </div>
        </div>
      </div>
      <Button variant="outline" className="w-full mt-3 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm">
        VIEW ALL MEMORIES
      </Button>
    </div>
  );
}
