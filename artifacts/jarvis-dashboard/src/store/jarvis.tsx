import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type DeviceState = { id: string; name: string; type: string; online: boolean };
export type AutomationState = { id: string; name: string; desc: string; active: boolean };
export type ModuleStatus = 'ACTIVE' | 'INACTIVE' | 'BETA' | 'INSTALLING' | 'TESTING';
export type ModuleState = { id: string; name: string; version: string; status: ModuleStatus };
export type ChatMsg = { id: string; role: 'user' | 'jarvis'; text: string; time: number };
export type LogEntry = { id: string; time: number; message: string; level: 'info' | 'warn' | 'success' | 'error' };
export type ThinkingStage = 'idle' | 'input' | 'analyzing' | 'reasoning' | 'decision' | 'executing' | 'completed';
export type Mode = 'assistant' | 'focus' | 'sleep' | 'security';

type Ctx = {
  devices: DeviceState[];
  automations: AutomationState[];
  modules: ModuleState[];
  conversations: ChatMsg[];
  logs: LogEntry[];
  thinking: ThinkingStage;
  mode: Mode;
  lastCommand: { text: string; success: boolean; durationMs: number } | null;
  toggleDevice: (id: string) => void;
  toggleAutomation: (id: string) => void;
  toggleModule: (id: string) => void;
  setMode: (m: Mode) => void;
  addLog: (message: string, level?: LogEntry['level']) => void;
  addChat: (msg: Omit<ChatMsg, 'id' | 'time'>) => void;
  clearChat: () => void;
  setThinking: (t: ThinkingStage) => void;
  setLastCommand: (c: { text: string; success: boolean; durationMs: number }) => void;
};

const JarvisContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'jarvis-state-v1';

const DEFAULT_DEVICES: DeviceState[] = [
  { id: 'laptop', name: 'Laptop (This Device)', type: 'computer', online: true },
  { id: 'phone', name: 'iPhone 15 Pro', type: 'phone', online: true },
  { id: 'watch', name: 'Apple Watch', type: 'watch', online: true },
  { id: 'tv', name: 'Living Room TV', type: 'tv', online: false },
  { id: 'lights', name: 'Smart Lights (8)', type: 'lights', online: true },
  { id: 'thermo', name: 'Thermostat', type: 'climate', online: true },
];

const DEFAULT_AUTOMATIONS: AutomationState[] = [
  { id: 'folder', name: 'Folder Organizer', desc: 'Auto-sorts downloads by type', active: true },
  { id: 'morning', name: 'Morning Briefing', desc: 'Daily news + calendar at 7AM', active: true },
  { id: 'backup', name: 'Auto Backup', desc: 'Cloud sync every 4 hours', active: true },
  { id: 'focus', name: 'Focus Mode', desc: 'Mute notifications during work', active: false },
  { id: 'sleep', name: 'Sleep Routine', desc: 'Lights off + devices to sleep', active: true },
];

const DEFAULT_MODULES: ModuleState[] = [
  { id: 'voice', name: 'Voice Assistant', version: 'v2.1', status: 'ACTIVE' },
  { id: 'vision', name: 'Vision Detection', version: 'v3.4', status: 'ACTIVE' },
  { id: 'laptop', name: 'Laptop Control', version: 'v1.8', status: 'ACTIVE' },
  { id: 'code', name: 'Code Generator', version: 'v2.5', status: 'ACTIVE' },
  { id: 'emotion', name: 'Emotion AI', version: 'v1.2', status: 'BETA' },
  { id: 'drone', name: 'Drone Control', version: 'v1.0', status: 'INSTALLING' },
  { id: 'echo', name: 'Echo AI Engine', version: 'v0.9', status: 'TESTING' },
];

function loadState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveState(state: any) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

const uid = () => Math.random().toString(36).slice(2, 10);

export function JarvisProvider({ children }: { children: React.ReactNode }) {
  const persisted = loadState();
  const [devices, setDevices] = useState<DeviceState[]>(persisted?.devices ?? DEFAULT_DEVICES);
  const [automations, setAutomations] = useState<AutomationState[]>(persisted?.automations ?? DEFAULT_AUTOMATIONS);
  const [modules, setModules] = useState<ModuleState[]>(persisted?.modules ?? DEFAULT_MODULES);
  const [conversations, setConversations] = useState<ChatMsg[]>(persisted?.conversations ?? []);
  const [mode, setModeState] = useState<Mode>(persisted?.mode ?? 'assistant');
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: uid(), time: Date.now(), message: 'JARVIS initialized', level: 'success' },
    { id: uid(), time: Date.now(), message: 'All modules online', level: 'info' },
  ]);
  const [thinking, setThinking] = useState<ThinkingStage>('idle');
  const [lastCommand, setLastCommand] = useState<Ctx['lastCommand']>(
    persisted?.lastCommand ?? { text: 'system boot', success: true, durationMs: 420 }
  );

  // Persist subset
  useEffect(() => {
    saveState({ devices, automations, modules, conversations: conversations.slice(-50), mode, lastCommand });
  }, [devices, automations, modules, conversations, mode, lastCommand]);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'info') => {
    setLogs(prev => [{ id: uid(), time: Date.now(), message, level }, ...prev].slice(0, 100));
  }, []);

  const toggleDevice = useCallback((id: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== id) return d;
      const next = !d.online;
      return { ...d, online: next };
    }));
    const d = devices.find(x => x.id === id);
    if (d) addLog(`Device "${d.name}" ${!d.online ? 'connected' : 'disconnected'}`, !d.online ? 'success' : 'warn');
  }, [devices, addLog]);

  const toggleAutomation = useCallback((id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    const a = automations.find(x => x.id === id);
    if (a) addLog(`Automation "${a.name}" ${!a.active ? 'enabled' : 'disabled'}`, 'info');
  }, [automations, addLog]);

  const toggleModule = useCallback((id: string) => {
    setModules(prev => prev.map(m => {
      if (m.id !== id) return m;
      const next: ModuleStatus = m.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      return { ...m, status: next };
    }));
    const m = modules.find(x => x.id === id);
    if (m) addLog(`Module "${m.name}" ${m.status === 'ACTIVE' ? 'deactivated' : 'activated'}`, 'info');
  }, [modules, addLog]);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    addLog(`Mode switched to ${m.toUpperCase()}`, 'success');
  }, [addLog]);

  const addChat = useCallback((msg: Omit<ChatMsg, 'id' | 'time'>) => {
    setConversations(prev => [...prev, { ...msg, id: uid(), time: Date.now() }].slice(-100));
  }, []);

  const clearChat = useCallback(() => setConversations([]), []);

  const value: Ctx = {
    devices, automations, modules, conversations, logs, thinking, mode, lastCommand,
    toggleDevice, toggleAutomation, toggleModule, setMode,
    addLog, addChat, clearChat, setThinking, setLastCommand,
  };

  return <JarvisContext.Provider value={value}>{children}</JarvisContext.Provider>;
}

export function useJarvis() {
  const ctx = useContext(JarvisContext);
  if (!ctx) throw new Error('useJarvis must be used inside JarvisProvider');
  return ctx;
}
