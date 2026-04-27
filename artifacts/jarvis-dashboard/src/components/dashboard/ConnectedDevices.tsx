import React from 'react';
import { MonitorSmartphone, Smartphone, Watch, Tv, Lightbulb, Thermometer, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJarvis } from '@/store/jarvis';

const ICONS: Record<string, any> = {
  computer: MonitorSmartphone,
  phone: Smartphone,
  watch: Watch,
  tv: Tv,
  lights: Lightbulb,
  climate: Thermometer,
};

export function ConnectedDevices() {
  const { devices, toggleDevice } = useJarvis();
  const onlineCount = devices.filter(d => d.online).length;

  return (
    <div className="flex flex-col h-full justify-between min-h-0">
      <div className="min-h-0 flex flex-col">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest mb-2 shrink-0">
          CONNECTED DEVICES ({onlineCount}/{devices.length} ONLINE)
        </div>
        <div className="space-y-1.5 overflow-y-auto custom-scrollbar pr-1 flex-1 min-h-0">
          {devices.map((d) => {
            const Icon = ICONS[d.type] || HelpCircle;
            return (
              <button
                key={d.id}
                onClick={() => toggleDevice(d.id)}
                className="w-full flex justify-between items-center text-[10px] font-mono px-1.5 py-1 rounded-sm hover:bg-primary/10 transition-colors group"
                title="Click to toggle"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className={`w-3 h-3 shrink-0 ${d.online ? 'text-primary' : 'text-primary/30'}`} />
                  <span className={`truncate ${d.online ? 'text-primary/90' : 'text-primary/40 line-through decoration-primary/30'}`}>
                    {d.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={d.online ? 'text-green-400' : 'text-red-400/70'}>
                    {d.online ? 'Online' : 'Offline'}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${d.online ? 'bg-green-400 animate-pulse' : 'bg-red-400/50'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full mt-2 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm shrink-0"
        onClick={() => devices.forEach(d => !d.online && toggleDevice(d.id))}
      >
        CONNECT ALL DEVICES
      </Button>
    </div>
  );
}
