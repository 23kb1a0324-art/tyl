import React from 'react';
import { Database, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useJarvis } from '@/store/jarvis';

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function MemoryCenter() {
  const { conversations, clearChat, mode } = useJarvis();
  const userMsgs = conversations.filter(c => c.role === 'user');
  const recent = [...userMsgs].reverse().slice(0, 3);
  const usagePct = Math.min(100, Math.round((conversations.length / 100) * 100));

  return (
    <div className="flex flex-col h-full justify-between min-h-0">
      <div className="min-h-0 flex flex-col">
        <div className="flex justify-between items-start mb-2 shrink-0">
          <div className="text-[10px] font-mono text-primary/70 tracking-widest">MEMORY CENTER</div>
          <Database className="w-3 h-3 text-primary/70" />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2 shrink-0">
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="text-[8px] font-mono text-primary/50">User Profile</div>
            <div className="text-[10px] font-mono text-primary truncate">Davood</div>
          </div>
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="text-[8px] font-mono text-primary/50">Mode</div>
            <div className="text-[10px] font-mono text-primary uppercase truncate">{mode}</div>
          </div>
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="text-[8px] font-mono text-primary/50">Conversations</div>
            <div className="text-[10px] font-mono text-primary tabular-nums">{conversations.length}</div>
          </div>
          <div className="bg-primary/5 border border-primary/10 p-1.5 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[8px] font-mono text-primary/50">Usage {usagePct}%</span>
              <span className="text-[8px] font-mono text-primary/40 tabular-nums">{conversations.length}/100</span>
            </div>
            <Progress value={usagePct} className="h-1 bg-primary/20" indicatorClassName="bg-primary" />
          </div>
        </div>

        <div className="min-h-0 flex flex-col">
          <div className="text-[9px] font-mono text-primary/60 mb-1 shrink-0">RECENT MEMORIES</div>
          <div className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
            {recent.length === 0 && (
              <div className="text-[9px] font-mono text-primary/40 italic">No conversations yet — speak to JARVIS</div>
            )}
            {recent.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-primary/40 shrink-0" />
                <div className="text-[9px] font-mono text-primary/80 truncate flex-1">{m.text}</div>
                <div className="text-[8px] font-mono text-primary/40 ml-auto shrink-0 tabular-nums">{timeAgo(m.time)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={clearChat}
        className="w-full mt-2 h-6 text-[9px] font-mono border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-sm shrink-0"
      >
        <Trash2 className="w-3 h-3 mr-1" /> CLEAR MEMORY
      </Button>
    </div>
  );
}
