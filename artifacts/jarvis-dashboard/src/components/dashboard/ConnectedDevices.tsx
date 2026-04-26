import React from 'react';
import { MonitorSmartphone, Camera, Cpu, Smartphone, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEVICES = [
  { name: 'LAPTOP (This Device)', status: 'Online', color: 'green', icon: MonitorSmartphone },
  { name: 'CAMERA 1', status: 'Active', color: 'green', icon: Camera },
  { name: 'CAMERA 2', status: 'Active', color: 'green', icon: Camera },
  { name: 'RASPBERRY PI', status: 'Standby', color: 'amber', icon: Cpu },
  { name: 'DRONE NODE', status: 'Offline', color: 'red', icon: Settings },
  { name: 'MOBILE LINK', status: 'Synced', color: 'primary', icon: Smartphone },
];

export function ConnectedDevices() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-3">CONNECTED DEVICES (6 DEVICES)</div>
        <div className="space-y-1.5">
          {DEVICES.map((dev, i) => (
            <div key={i} className="flex justify-between items-center text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <dev.icon className="w-3 h-3 text-primary/60" />
                <span className="text-primary/90">{dev.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-${dev.color === 'amber' ? 'yellow' : dev.color === 'red' ? 'red' : dev.color === 'green' ? 'green' : 'primary'}-400`}>{dev.status}</span>
                <span className={`w-1.5 h-1.5 rounded-full bg-${dev.color === 'amber' ? 'yellow' : dev.color === 'red' ? 'red' : dev.color === 'green' ? 'green' : 'primary'}-400 ${dev.status === 'Active' || dev.status === 'Online' ? 'animate-pulse' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full mt-3 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm">
        MANAGE DEVICES
      </Button>
    </div>
  );
}
