import React from 'react';
import { Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const AUTOMATIONS = [
  { name: 'Folder Organizer', desc: 'Automatically organize files', active: true },
  { name: 'Camera Monitor', desc: 'AI surveillance & recording', active: true },
  { name: 'Threat Scan', desc: 'System security scanning', active: true },
  { name: 'Voice Listener', desc: 'Continuous voice monitoring', active: true },
  { name: 'Update Checker', desc: 'Check system updates', active: false },
];

export function AutomationCenter() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="text-[10px] font-mono text-primary/70 tracking-widest">AUTOMATION CENTER (5 ACTIVE)</div>
          <Zap className="w-3 h-3 text-primary/70" />
        </div>
        <div className="space-y-2">
          {AUTOMATIONS.map((auto, i) => (
            <div key={i} className="flex justify-between items-center group">
              <div>
                <div className="text-[10px] font-mono text-primary group-hover:text-primary glow-text transition-colors">{auto.name}</div>
                <div className="text-[8px] font-mono text-primary/50">{auto.desc}</div>
              </div>
              <Switch checked={auto.active} className="data-[state=checked]:bg-primary scale-[0.6] origin-right" />
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full mt-3 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm">
        MANAGE AUTOMATIONS
      </Button>
    </div>
  );
}
