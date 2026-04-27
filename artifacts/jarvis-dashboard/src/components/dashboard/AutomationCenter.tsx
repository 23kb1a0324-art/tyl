import React from 'react';
import { Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useJarvis } from '@/store/jarvis';

export function AutomationCenter() {
  const { automations, toggleAutomation } = useJarvis();
  const activeCount = automations.filter(a => a.active).length;

  return (
    <div className="flex flex-col h-full justify-between min-h-0">
      <div className="min-h-0 flex flex-col">
        <div className="flex justify-between items-start mb-2 shrink-0">
          <div className="text-[10px] font-mono text-primary/70 tracking-widest">
            AUTOMATION CENTER ({activeCount} ACTIVE)
          </div>
          <Zap className="w-3 h-3 text-primary/70" />
        </div>
        <div className="space-y-1.5 overflow-y-auto custom-scrollbar pr-1 flex-1 min-h-0">
          {automations.map((auto) => (
            <div key={auto.id} className="flex justify-between items-center group gap-2">
              <div className="min-w-0">
                <div className={`text-[10px] font-mono truncate transition-colors ${auto.active ? 'text-primary' : 'text-primary/50'}`}>
                  {auto.name}
                </div>
                <div className="text-[8px] font-mono text-primary/40 truncate">{auto.desc}</div>
              </div>
              <Switch
                checked={auto.active}
                onCheckedChange={() => toggleAutomation(auto.id)}
                className="data-[state=checked]:bg-primary scale-[0.6] origin-right shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full mt-2 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm shrink-0"
        onClick={() => automations.forEach(a => !a.active && toggleAutomation(a.id))}
      >
        ENABLE ALL
      </Button>
    </div>
  );
}
