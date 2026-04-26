import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '10:00', value: 40 },
  { time: '12:00', value: 30 },
  { time: '14:00', value: 65 },
  { time: '16:00', value: 85 },
  { time: '18:00', value: 50 },
  { time: '20:00', value: 75 },
  { time: '22:00', value: 90 },
  { time: '24:00', value: 95 },
];

export function PredictiveInsights() {
  return (
    <div className="jarvis-panel p-4 flex flex-col h-[280px]">
      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest">PREDICTIVE INSIGHTS</div>
        <div className="text-[9px] font-mono text-primary hover:underline cursor-pointer">VIEW INSIGHTS</div>
      </div>

      <div className="flex-1 relative mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="hsl(var(--primary) / 0.3)" fontSize={8} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--primary) / 0.3)" fontSize={8} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--primary))', fontSize: '10px', color: 'hsl(var(--primary))' }}
              itemStyle={{ color: 'hsl(var(--primary))' }}
            />
            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="absolute top-2 right-4 text-right">
           <div className="text-2xl font-heading text-primary glow-text">94%</div>
           <div className="text-[8px] font-mono text-primary/50">ACCURACY</div>
        </div>
      </div>
      
      <div className="text-[9px] font-mono text-primary/70 border-t border-primary/20 pt-2 text-center">
        System predicts <span className="text-primary font-bold">32% increase</span> in productivity this week
      </div>
    </div>
  );
}
