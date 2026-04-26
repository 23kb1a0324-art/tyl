import React from 'react';
import { Activity, Cpu, HardDrive, Zap, Thermometer, Battery, ArrowDown, ArrowUp } from 'lucide-react';

export function SystemPerformance() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">SYSTEM PERFORMANCE</div>
        <Activity className="w-4 h-4 text-primary/70" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <PerfStat icon={Cpu} label="CPU USAGE" value="23%" sub="2.4 GHz" />
          <PerfStat icon={HardDrive} label="RAM USAGE" value="45%" sub="7.1 / 15.8 GB" />
          <PerfStat icon={Zap} label="GPU USAGE" value="32%" sub="NVIDIA RTX 3060" />
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-primary/20 pt-4">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Thermometer className="w-3 h-3 text-primary" />
            </div>
            <div>
              <div className="text-[8px] font-mono text-primary/50">TEMP STATUS</div>
              <div className="text-[10px] font-mono text-primary">42°C <span className="text-green-400">NORMAL</span></div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Battery className="w-3 h-3 text-green-400" />
            </div>
            <div>
              <div className="text-[8px] font-mono text-primary/50">BATTERY</div>
              <div className="text-[10px] font-mono text-primary">100% <span className="text-green-400">FULL CHARGED</span></div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <NetworkIcon />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[8px] font-mono text-primary/50">
                <ArrowDown className="w-2 h-2 text-primary" /> 12.4 Mbps
              </div>
              <div className="flex items-center gap-1 text-[8px] font-mono text-primary/50">
                <ArrowUp className="w-2 h-2 text-primary" /> 8.7 Mbps
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerfStat({ icon: Icon, label, value, sub }: any) {
  const isCpu = label === 'CPU USAGE';
  const isRam = label === 'RAM USAGE';
  
  return (
    <div className="bg-primary/5 border border-primary/10 p-2 rounded-sm flex flex-col h-full justify-between">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3 h-3 text-primary/70" />
          <span className="text-[8px] font-mono text-primary/70">{label}</span>
        </div>
        <span className="text-xs font-mono text-primary">{value}</span>
      </div>
      <div className="h-6 w-full flex-1 my-1">
        <svg viewBox="0 0 100 24" className="w-full h-full text-primary fill-none stroke-current" preserveAspectRatio="none">
          <path 
            d={isCpu ? "M0,20 Q10,5 20,15 T40,10 T60,18 T80,8 T100,15" : 
               isRam ? "M0,15 Q15,15 25,5 T50,15 T75,10 T100,20" : 
               "M0,10 Q20,20 40,5 T80,15 T100,5"} 
            strokeWidth="1.5" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="text-[8px] font-mono text-primary/40 text-right">{sub}</div>
    </div>
  );
}

function NetworkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}
