import React, { useState, useRef, useEffect } from 'react';
import { TerminalIcon, Maximize2, Minus, X } from 'lucide-react';
import { useJarvis } from '@/store/jarvis';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';
import { parseCommand } from '@/lib/commandProcessor';

type Line = { kind: 'in' | 'out' | 'err' | 'sys'; text: string };

const HELP = `Available commands:
  help                Show this message
  clear               Clear the terminal
  status              Print full system status
  metrics             Print live system metrics
  devices             List connected devices
  automations         List automations
  modules             List AI modules
  mode <name>         Switch mode (assistant|focus|security|sleep)
  toggle <device>     Toggle a device by name
  log "<msg>"         Add a custom log entry
  echo <text>         Echo text back
  date                Print current date/time
  whoami              Print user
  jarvis <prompt>     Send to JARVIS command processor`;

export function Terminal() {
  const store = useJarvis();
  const m = useSystemMetrics();
  const [lines, setLines] = useState<Line[]>([
    { kind: 'sys', text: 'J.A.R.V.I.S Terminal v3.0.1 — type "help" for commands' },
    { kind: 'sys', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const print = (text: string, kind: Line['kind'] = 'out') =>
    setLines(prev => [...prev, { kind, text }]);

  const exec = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    print(`davood@jarvis:~$ ${cmd}`, 'in');
    setHistory(h => [...h, cmd]);
    setHistIdx(-1);

    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ');
    const lower = name.toLowerCase();

    try {
      switch (lower) {
        case 'help': print(HELP, 'sys'); break;
        case 'clear': setLines([{ kind: 'sys', text: 'J.A.R.V.I.S Terminal v3.0.1 — cleared' }]); break;
        case 'status':
          print(`System Status: ONLINE | Mode: ${store.mode.toUpperCase()}`);
          print(`CPU ${m.cpuLoad}% | RAM ${m.memPercent}% | Battery ${m.batteryPercent ?? 'N/A'}% | Net ${m.netDownlinkMbps}Mbps`);
          print(`Devices: ${store.devices.filter(d => d.online).length}/${store.devices.length} online`);
          print(`Automations: ${store.automations.filter(a => a.active).length}/${store.automations.length} active`);
          break;
        case 'metrics':
          print(`CPU load: ${m.cpuLoad}% (${m.cores} cores)`);
          print(`Memory: ${m.memUsedMB}/${m.memTotalMB}MB (${m.memPercent}%)`);
          print(`Battery: ${m.batteryPercent ?? 'N/A'}% ${m.batteryCharging ? '(charging)' : ''}`);
          print(`Network: ${m.netType} ${m.netDownlinkMbps}Mbps · ping ${m.pingMs ?? '?'}ms`);
          print(`Uptime: ${Math.floor(m.uptimeSec / 60)}m ${m.uptimeSec % 60}s`);
          break;
        case 'devices':
          if (store.devices.length === 0) print('No devices.');
          store.devices.forEach(d => print(`  ${d.online ? '●' : '○'} ${d.name.padEnd(22)} ${d.type.padEnd(10)} ${d.online ? 'ONLINE' : 'OFFLINE'}`));
          break;
        case 'automations':
          store.automations.forEach(a => print(`  ${a.active ? '✓' : '·'} ${a.name.padEnd(28)} ${a.desc}`));
          break;
        case 'modules':
          store.modules.forEach(mod => print(`  [${mod.status.padEnd(10)}] ${mod.name} ${mod.version}`));
          break;
        case 'mode':
          if (!arg) { print(`Current: ${store.mode}`); break; }
          if (['assistant','focus','security','sleep'].includes(arg)) {
            store.setMode(arg as any);
            print(`Mode → ${arg.toUpperCase()}`, 'sys');
          } else {
            print(`Unknown mode: ${arg}`, 'err');
          }
          break;
        case 'toggle': {
          if (!arg) { print('Usage: toggle <device name>', 'err'); break; }
          const dev = store.devices.find(d => d.name.toLowerCase().includes(arg.toLowerCase()));
          if (!dev) { print(`Device not found: ${arg}`, 'err'); break; }
          store.toggleDevice(dev.id);
          print(`${dev.name} → ${dev.online ? 'OFF' : 'ON'}`, 'sys');
          break;
        }
        case 'log':
          if (!arg) { print('Usage: log "<message>"', 'err'); break; }
          store.addLog(arg.replace(/^"|"$/g, ''), 'info');
          print('Log entry added', 'sys');
          break;
        case 'echo': print(arg); break;
        case 'date': print(new Date().toString()); break;
        case 'whoami': print('davood'); break;
        case 'jarvis': {
          if (!arg) { print('Usage: jarvis <prompt>', 'err'); break; }
          const r = parseCommand(arg);
          print(`JARVIS: ${r.reply}`, 'sys');
          break;
        }
        default: print(`Command not found: ${name}. Type "help".`, 'err');
      }
    } catch (e: any) {
      print(`Error: ${e?.message || String(e)}`, 'err');
    }

    store.addLog(`Terminal: ${cmd}`, 'info');
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      exec(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const next = histIdx + 1;
      if (next >= history.length) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(next); setInput(history[next]); }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([{ kind: 'sys', text: 'cleared' }]);
    }
  };

  return (
    <div className="flex flex-col h-full" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary/70" />
          <div className="text-[10px] font-mono text-primary/70 tracking-widest">JARVIS TERMINAL</div>
        </div>
        <div className="flex items-center gap-1 text-primary/40">
          <Minus className="w-3 h-3" />
          <Maximize2 className="w-3 h-3" />
          <X className="w-3 h-3" />
        </div>
      </div>

      <div className="bg-black/60 border border-primary/30 flex-1 p-2 rounded-sm overflow-hidden flex flex-col text-[10px] font-mono leading-snug min-h-0">
        <div ref={scrollRef} className="overflow-y-auto custom-scrollbar flex-1 pr-1">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap break-words ${
                l.kind === 'in'  ? 'text-primary' :
                l.kind === 'err' ? 'text-red-400' :
                l.kind === 'sys' ? 'text-yellow-400' :
                                   'text-primary/80'
              }`}
            >{l.text}</div>
          ))}
        </div>
        <div className="flex items-center gap-1 pt-1 border-t border-primary/10 mt-1 shrink-0">
          <span className="text-primary shrink-0">davood@jarvis:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none text-primary text-[10px] font-mono"
            spellCheck={false}
            autoComplete="off"
            placeholder='type "help"'
          />
          <span className="w-1.5 h-3 bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}
