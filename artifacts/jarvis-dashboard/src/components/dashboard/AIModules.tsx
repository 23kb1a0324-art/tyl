import React from 'react';
import { Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MODULES = [
  { name: 'Voice Assistant', version: 'v2.1', status: 'ACTIVE', color: 'green' },
  { name: 'Vision Detection', version: 'v3.4', status: 'ACTIVE', color: 'green' },
  { name: 'Laptop Control', version: 'v1.8', status: 'ACTIVE', color: 'green' },
  { name: 'Code Generator', version: 'v2.5', status: 'ACTIVE', color: 'green' },
  { name: 'Emotion AI', version: 'v1.2', status: 'BETA', color: 'amber' },
  { name: 'Drone Control', version: 'v1.0', status: 'INSTALLING', color: 'amber' },
  { name: 'Echo AI Engine', version: '-', status: 'TESTING', color: 'primary' },
];

export function AIModules() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">AI MODULES / SKILLS</div>
        <div className="text-[9px] font-mono text-primary hover:text-primary hover:underline cursor-pointer">VIEW ALL</div>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto pr-1 custom-scrollbar">
        {MODULES.map((mod, i) => (
          <div key={i} className="flex items-center justify-between p-1.5 border border-primary/10 bg-primary/5 hover:bg-primary/10 rounded-sm group transition-colors">
            <div className="flex items-center gap-2">
              <Layers className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors" />
              <div className="text-[10px] font-mono text-primary/90">{mod.name} <span className="text-primary/40 ml-1">{mod.version}</span></div>
            </div>
            
            <Badge variant="outline" className={`h-4 px-1.5 text-[8px] rounded-none border-${mod.color === 'amber' ? 'yellow' : mod.color === 'green' ? 'green' : 'primary'}-500/50 text-${mod.color === 'amber' ? 'yellow' : mod.color === 'green' ? 'green' : 'primary'}-400 bg-${mod.color === 'amber' ? 'yellow' : mod.color === 'green' ? 'green' : 'primary'}-500/10`}>
              {mod.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
