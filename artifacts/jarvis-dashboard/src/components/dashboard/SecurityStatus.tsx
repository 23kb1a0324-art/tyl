import React from 'react';
import { Shield, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SecurityStatus() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-3">SECURITY STATUS</div>
        
        <div className="bg-green-500/10 border border-green-500/30 p-2 rounded-sm mb-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
            <Shield className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold font-mono text-green-400">SYSTEM SECURE</div>
            <div className="text-[8px] font-mono text-green-400/70">All systems are protected</div>
          </div>
        </div>

        <div className="space-y-1.5 mb-4">
          {['Firewall Active', 'USB Protection Enabled', 'Camera Protection Enabled', 'Intrusion Detection Active', 'Login Monitoring Active'].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span className="text-[9px] font-mono text-primary/80">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between p-2 border border-primary/20 bg-background/50 rounded-sm">
           <div className="flex items-center gap-2">
              <ShieldAlert className="w-3 h-3 text-primary/50" />
              <span className="text-[9px] font-mono text-primary/70">Threat Level</span>
           </div>
           <span className="text-xs font-mono font-bold text-green-400">0% SAFE</span>
        </div>
      </div>
      <Button variant="outline" className="w-full mt-3 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm">
        RUN FULL SCAN
      </Button>
    </div>
  );
}
