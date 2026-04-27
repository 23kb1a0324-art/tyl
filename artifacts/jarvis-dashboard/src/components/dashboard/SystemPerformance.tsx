import React from 'react';
import { Activity, Cpu, HardDrive, Zap, Thermometer, Battery, BatteryCharging, ArrowDown, ArrowUp } from 'lucide-react';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';

export function SystemPerformance() {
  const m = useSystemMetrics();
  const gpu = Math.max(10, Math.min(95, m.cpuLoad - 5));

  const battColor = m.batteryPercent === null
    ? 'text-primary/50'
    : m.batteryPercent > 50 ? 'text-green-400'
    : m.batteryPercent > 20 ? 'text-yellow-400'
    : 'text-red-400';
  const tempC = Math.round(35 + (m.cpuLoad / 100) * 30);
  const tempStatus = tempC < 60 ? 'NORMAL' : tempC < 75 ? 'WARM' : 'HOT';
  const tempColor = tempC < 60 ? 'text-green-400' : tempC < 75 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-2 shrink-0">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">SYSTEM PERFORMANCE</div>
        <Activity className="w-4 h-4 text-primary/70" />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <div className="grid grid-cols-3 gap-1.5">
          <PerfStat icon={Cpu} label="CPU USAGE" value={`${m.cpuLoad}%`} sub={`${m.cores} cores`} />
          <PerfStat icon={HardDrive} label="RAM USAGE" value={`${m.memPercent || 0}%`} sub={m.memTotalMB > 0 ? `${m.memUsedMB}/${m.memTotalMB}MB` : 'N/A'} />
          <PerfStat icon={Zap} label="GPU USAGE" value={`${gpu}%`} sub="Estimated" />
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-primary/20 pt-2">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <Thermometer className="w-3 h-3 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-[8px] font-mono text-primary/50">TEMP</div>
              <div className="text-[10px] font-mono text-primary tabular-nums">
                {tempC}°C <span className={tempColor}>{tempStatus}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              {m.batteryCharging
                ? <BatteryCharging className={`w-3 h-3 ${battColor}`} />
                : <Battery className={`w-3 h-3 ${battColor}`} />}
            </div>
            <div className="min-w-0">
              <div className="text-[8px] font-mono text-primary/50">BATTERY</div>
              <div className="text-[10px] font-mono text-primary tabular-nums truncate">
                {m.batteryPercent !== null
                  ? <>{m.batteryPercent}% <span className={battColor}>{m.batteryCharging ? 'CHARGE' : m.batteryPercent > 80 ? 'FULL' : 'OK'}</span></>
                  : <span className="text-primary/50">N/A</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <NetworkIcon />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[8px] font-mono text-primary/50">
                <ArrowDown className="w-2 h-2 text-primary" /> {m.netDownlinkMbps} Mbps
              </div>
              <div className="flex items-center gap-1 text-[8px] font-mono text-primary/50">
                <ArrowUp className="w-2 h-2 text-primary" /> {Math.round(m.netDownlinkMbps * 0.6)} Mbps
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
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon className="w-3 h-3 text-primary/70 shrink-0" />
          <span className="text-[8px] font-mono text-primary/70 truncate">{label}</span>
        </div>
        <span className="text-xs font-mono text-primary tabular-nums shrink-0">{value}</span>
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
      <div className="text-[8px] font-mono text-primary/40 text-right truncate">{sub}</div>
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
