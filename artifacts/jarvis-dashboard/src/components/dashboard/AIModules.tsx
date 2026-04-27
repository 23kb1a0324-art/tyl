import React from 'react';
import { Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ModuleStatus = 'ACTIVE' | 'BETA' | 'INSTALLING' | 'TESTING';

const MODULES: { name: string; version: string; status: ModuleStatus }[] = [
  { name: 'Voice Assistant', version: 'v2.1', status: 'ACTIVE' },
  { name: 'Vision Detection', version: 'v3.4', status: 'ACTIVE' },
  { name: 'Laptop Control', version: 'v1.8', status: 'ACTIVE' },
  { name: 'Code Generator', version: 'v2.5', status: 'ACTIVE' },
  { name: 'Emotion AI', version: 'v1.2', status: 'BETA' },
  { name: 'Drone Control', version: 'v1.0', status: 'INSTALLING' },
  { name: 'Echo AI Engine', version: 'v0.9', status: 'TESTING' },
];

const STATUS_STYLES: Record<ModuleStatus, string> = {
  ACTIVE: 'border-green-500/50 text-green-400 bg-green-500/10',
  BETA: 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10',
  INSTALLING: 'border-orange-500/50 text-orange-400 bg-orange-500/10',
  TESTING: 'border-primary/50 text-primary bg-primary/10',
};

export function AIModules() {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex justify-between items-start mb-2 shrink-0">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">AI MODULES / SKILLS</div>
        <div className="text-[9px] font-mono text-primary hover:text-primary hover:underline cursor-pointer">VIEW ALL</div>
      </div>

      <div className="flex-1 min-h-0 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
        {MODULES.map((mod, i) => (
          <div key={i} className="flex items-center justify-between p-1.5 border border-primary/10 bg-primary/5 hover:bg-primary/10 rounded-sm group transition-colors">
            <div className="flex items-center gap-2 min-w-0">
              <Layers className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors shrink-0" />
              <div className="text-[10px] font-mono text-primary/90 truncate">
                {mod.name} <span className="text-primary/40 ml-1">{mod.version}</span>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`h-4 px-1.5 text-[8px] rounded-none shrink-0 ${STATUS_STYLES[mod.status]}`}
            >
              {mod.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
