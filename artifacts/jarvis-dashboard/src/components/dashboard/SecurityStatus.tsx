import React, { useEffect, useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJarvis } from '@/store/jarvis';

export function SecurityStatus() {
  const { addLog } = useJarvis();
  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState<number | null>(null);

  const isSecure = typeof window !== 'undefined' && window.isSecureContext;
  const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const hasNotifAPI = typeof window !== 'undefined' && 'Notification' in window;
  const hasMediaAPI = typeof navigator !== 'undefined' && 'mediaDevices' in navigator;
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  const checks = [
    { label: 'HTTPS Connection', ok: isHttps },
    { label: 'Secure Context Active', ok: isSecure },
    { label: 'Camera/Mic Permission Gate', ok: hasMediaAPI },
    { label: 'Notification Sandbox', ok: hasNotifAPI },
    { label: 'Network Connectivity', ok: isOnline },
  ];

  const allOk = checks.every(c => c.ok);
  const failedCount = checks.filter(c => !c.ok).length;
  const threatLevel = allOk ? 0 : Math.min(100, failedCount * 20);

  const runScan = async () => {
    setScanning(true);
    addLog('Security scan initiated', 'info');
    await new Promise(r => setTimeout(r, 1500));
    setLastScan(Date.now());
    addLog(`Scan complete: ${allOk ? 'No threats detected' : `${failedCount} warning(s)`}`, allOk ? 'success' : 'warn');
    setScanning(false);
  };

  return (
    <div className="flex flex-col h-full justify-between min-h-0">
      <div className="min-h-0 flex flex-col">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-2 shrink-0">SECURITY STATUS</div>

        <div className={`border p-2 rounded-sm mb-2 flex items-center gap-3 shrink-0 ${
          allOk ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center animate-pulse ${
            allOk ? 'bg-green-500/20' : 'bg-yellow-500/20'
          }`}>
            <Shield className={`w-4 h-4 ${allOk ? 'text-green-400' : 'text-yellow-400'}`} />
          </div>
          <div className="min-w-0">
            <div className={`text-[10px] font-bold font-mono ${allOk ? 'text-green-400' : 'text-yellow-400'}`}>
              {allOk ? 'SYSTEM SECURE' : 'WARNINGS DETECTED'}
            </div>
            <div className={`text-[8px] font-mono truncate ${allOk ? 'text-green-400/70' : 'text-yellow-400/70'}`}>
              {allOk ? 'All checks passed' : `${failedCount} check(s) failed`}
            </div>
          </div>
        </div>

        <div className="space-y-1 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              {c.ok
                ? <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                : <XCircle className="w-3 h-3 text-red-400 shrink-0" />}
              <span className={`text-[9px] font-mono truncate ${c.ok ? 'text-primary/80' : 'text-red-400/80'}`}>
                {c.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-2 border border-primary/20 bg-background/50 rounded-sm mt-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="w-3 h-3 text-primary/50 shrink-0" />
            <span className="text-[9px] font-mono text-primary/70 truncate">Threat Level</span>
          </div>
          <span className={`text-xs font-mono font-bold tabular-nums shrink-0 ${
            threatLevel === 0 ? 'text-green-400' : threatLevel < 50 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {threatLevel}% {threatLevel === 0 ? 'SAFE' : threatLevel < 50 ? 'LOW' : 'HIGH'}
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={runScan}
        disabled={scanning}
        className="w-full mt-2 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm shrink-0"
      >
        {scanning ? 'SCANNING...' : (lastScan ? 'RE-SCAN' : 'RUN FULL SCAN')}
      </Button>
    </div>
  );
}
