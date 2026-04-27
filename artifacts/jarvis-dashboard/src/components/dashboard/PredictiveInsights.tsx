import React, { useMemo } from 'react';
import { Sparkles, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useJarvis } from '@/store/jarvis';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';

export function PredictiveInsights() {
  const { conversations, devices, automations, mode } = useJarvis();
  const m = useSystemMetrics();

  const insights = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const dow = now.toLocaleDateString('en-US', { weekday: 'long' });

    const out: { icon: any; color: string; title: string; sub: string }[] = [];

    // Time-based suggestion
    if (hour >= 5 && hour < 12) {
      out.push({ icon: Calendar, color: 'text-primary', title: 'Good morning routine ready', sub: `It's ${dow}, ${hour}:00 — coffee + news brief?` });
    } else if (hour >= 12 && hour < 17) {
      out.push({ icon: Calendar, color: 'text-primary', title: 'Focus block recommended', sub: `Afternoon — try Focus Mode for ${Math.max(1, 5 - hour % 4)}h` });
    } else if (hour >= 17 && hour < 22) {
      out.push({ icon: Calendar, color: 'text-yellow-400', title: 'Evening wind-down', sub: 'Suggest dimming lights & enabling Sleep Mode soon' });
    } else {
      out.push({ icon: Calendar, color: 'text-primary', title: 'Late night detected', sub: 'Sleep mode will auto-enable in 30m if idle' });
    }

    // Battery-based
    if (m.batteryPercent !== null && m.batteryPercent < 25 && !m.batteryCharging) {
      out.push({ icon: Bell, color: 'text-red-400', title: 'Low battery alert', sub: `${m.batteryPercent}% — plug in within 15 min` });
    } else if (m.cpuLoad > 70) {
      out.push({ icon: TrendingUp, color: 'text-yellow-400', title: 'High CPU detected', sub: `${m.cpuLoad}% load — close background tabs?` });
    } else {
      out.push({ icon: TrendingUp, color: 'text-green-400', title: 'System trending optimal', sub: `CPU ${m.cpuLoad}% · RAM ${m.memPercent}% · stable` });
    }

    // Device usage
    const offline = devices.filter(d => !d.online);
    if (offline.length > 0) {
      out.push({ icon: Sparkles, color: 'text-primary', title: 'Offline devices detected', sub: `${offline.map(d => d.name).slice(0, 2).join(', ')} are off — bring online?` });
    } else {
      out.push({ icon: Sparkles, color: 'text-green-400', title: 'All devices online', sub: `${devices.length} devices · ${automations.filter(a => a.active).length} automations active` });
    }

    // Conversation insight
    if (conversations.length === 0) {
      out.push({ icon: Bell, color: 'text-primary', title: 'No interactions yet', sub: 'Try saying "hello" or "what time is it"' });
    } else {
      out.push({ icon: Bell, color: 'text-primary', title: `${conversations.length} interactions logged`, sub: `Mode: ${mode.toUpperCase()} · learning patterns` });
    }

    return out;
  }, [conversations.length, devices, automations, mode, m.batteryPercent, m.batteryCharging, m.cpuLoad, m.memPercent]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-2 shrink-0">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">PREDICTIVE INSIGHTS</div>
        <Sparkles className="w-4 h-4 text-primary/70" />
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {insights.slice(0, 4).map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div key={idx} className="bg-primary/5 border border-primary/10 p-2 rounded-sm hover:bg-primary/10 transition-colors min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-3 h-3 ${insight.color} shrink-0`} />
                <div className="text-[9px] font-mono text-primary/80 truncate">{insight.title}</div>
              </div>
              <div className="text-[8px] font-mono text-primary/50 line-clamp-2">{insight.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
