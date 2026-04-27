// Rule-based intent parser for J.A.R.V.I.S commands.
// Returns response text + optional side-effects to invoke on the store.

export type Intent =
  | { kind: 'greet'; reply: string }
  | { kind: 'time'; reply: string }
  | { kind: 'date'; reply: string }
  | { kind: 'weather'; reply: string }
  | { kind: 'joke'; reply: string }
  | { kind: 'identity'; reply: string }
  | { kind: 'status'; reply: string }
  | { kind: 'thanks'; reply: string }
  | { kind: 'clear-chat'; reply: string }
  | { kind: 'set-mode'; mode: 'assistant' | 'focus' | 'sleep' | 'security'; reply: string }
  | { kind: 'toggle-device'; query: string; reply: string }
  | { kind: 'toggle-automation'; query: string; reply: string }
  | { kind: 'toggle-module'; query: string; reply: string }
  | { kind: 'list-devices'; reply: string }
  | { kind: 'list-modules'; reply: string }
  | { kind: 'open'; target: string; reply: string }
  | { kind: 'search'; query: string; reply: string }
  | { kind: 'calc'; expr: string; reply: string }
  | { kind: 'unknown'; reply: string };

export function parseCommand(raw: string): Intent {
  const text = raw.trim();
  const t = text.toLowerCase();

  if (!t) return { kind: 'unknown', reply: 'I did not catch that, sir.' };

  // Greetings
  if (/^(hi|hey|hello|yo|hola|good (morning|afternoon|evening))\b/.test(t)) {
    return { kind: 'greet', reply: greetReply() };
  }

  // Identity
  if (/(who are you|your name|what are you|introduce yourself)/.test(t)) {
    return { kind: 'identity', reply: 'I am J.A.R.V.I.S — Just A Rather Very Intelligent System. At your service.' };
  }

  // Time / date
  if (/(what.*time|current time|tell.*time)/.test(t)) {
    return { kind: 'time', reply: `It is currently ${new Date().toLocaleTimeString()}.` };
  }
  if (/(what.*date|today.*date|day is it|what day)/.test(t)) {
    return { kind: 'date', reply: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}.` };
  }

  // Weather (no API — fallback)
  if (/(weather|temperature outside|raining|forecast)/.test(t)) {
    return { kind: 'weather', reply: 'External weather feed offline. Local sensors report 22°C, clear skies.' };
  }

  // Joke
  if (/(tell.*joke|make me laugh|joke)/.test(t)) {
    return { kind: 'joke', reply: pickJoke() };
  }

  // Thanks
  if (/(thank|thanks|thank you|appreciate)/.test(t)) {
    return { kind: 'thanks', reply: 'Always a pleasure, sir.' };
  }

  // Status
  if (/(status|how are you|system check|all systems|diagnostics)/.test(t)) {
    return { kind: 'status', reply: 'All primary systems nominal. CPU load steady, network online, all critical modules active.' };
  }

  // Clear chat
  if (/(clear (chat|conversation|history))/.test(t)) {
    return { kind: 'clear-chat', reply: 'Conversation history cleared.' };
  }

  // Mode switching
  const modeMatch = t.match(/(?:switch|set|enable|engage|activate)\s+(?:to\s+)?(assistant|focus|sleep|security)\s*mode?/);
  if (modeMatch) {
    const mode = modeMatch[1] as any;
    return { kind: 'set-mode', mode, reply: `Switching to ${mode.toUpperCase()} mode.` };
  }
  if (/^(focus|sleep|security|assistant)\s*mode$/.test(t)) {
    const mode = t.split(' ')[0] as any;
    return { kind: 'set-mode', mode, reply: `Switching to ${mode.toUpperCase()} mode.` };
  }

  // Devices: "turn on/off lights", "connect tv", etc.
  const devMatch = t.match(/(?:turn|switch)\s+(on|off)\s+(?:the\s+)?(.+)/);
  if (devMatch) {
    return { kind: 'toggle-device', query: devMatch[2].trim(), reply: `Toggling ${devMatch[2].trim()}.` };
  }
  const connMatch = t.match(/(?:connect|disconnect)\s+(?:to\s+)?(?:the\s+)?(.+)/);
  if (connMatch) {
    return { kind: 'toggle-device', query: connMatch[1].trim(), reply: `Toggling ${connMatch[1].trim()}.` };
  }

  // Automations
  const autoMatch = t.match(/(?:enable|disable|activate|deactivate)\s+(.+?)(?:\s+automation)?$/);
  if (autoMatch && /(automation|routine|backup|briefing|organizer|focus|sleep)/.test(t)) {
    return { kind: 'toggle-automation', query: autoMatch[1].trim(), reply: `Toggling ${autoMatch[1].trim()}.` };
  }

  // List
  if (/(list|show).*devices/.test(t)) return { kind: 'list-devices', reply: 'Listing connected devices.' };
  if (/(list|show).*modules/.test(t)) return { kind: 'list-modules', reply: 'Listing AI modules.' };

  // Open app
  const openMatch = t.match(/^(?:open|launch|start)\s+(.+)/);
  if (openMatch) {
    return { kind: 'open', target: openMatch[1].trim(), reply: `Opening ${openMatch[1].trim()}.` };
  }

  // Search
  const searchMatch = t.match(/^(?:search|google|find|look up)\s+(?:for\s+)?(.+)/);
  if (searchMatch) {
    return { kind: 'search', query: searchMatch[1].trim(), reply: `Searching for "${searchMatch[1].trim()}".` };
  }

  // Calc: "what is 12 * 7"
  const calcMatch = t.match(/(?:what(?:'s| is)|calculate|compute)\s+([\d\s+\-*/().]+)\??$/);
  if (calcMatch) {
    try {
      const expr = calcMatch[1].replace(/[^\d+\-*/().\s]/g, '');
      const result = Function(`"use strict"; return (${expr})`)();
      return { kind: 'calc', expr, reply: `${expr.trim()} = ${result}` };
    } catch {
      return { kind: 'unknown', reply: 'I could not evaluate that expression.' };
    }
  }

  // Default
  return {
    kind: 'unknown',
    reply: pickFallback(text),
  };
}

function greetReply(): string {
  const h = new Date().getHours();
  const period = h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  return `Good ${period}. How may I assist?`;
}

const JOKES = [
  'Why did the robot go to therapy? It had too many bugs to process.',
  'I would tell you a UDP joke, but you might not get it.',
  'There are 10 types of people in the world: those who understand binary and those who do not.',
  'Why did the AI cross the road? To optimize the chicken on the other side.',
  'I asked the database to dance — it joined right in.',
];
function pickJoke() { return JOKES[Math.floor(Math.random() * JOKES.length)]; }

const FALLBACKS = [
  'Acknowledged. Processing your request.',
  'Understood. Logging and analyzing.',
  'Noted. I will look into that.',
  'I am not certain, but I have logged the query.',
];
function pickFallback(text: string) {
  // Echo brief
  if (text.length < 80) return `${FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)]}`;
  return 'Acknowledged. That request requires deeper analysis — logged for review.';
}

// Find best matching item by name (fuzzy contains)
export function fuzzyFind<T extends { name: string }>(items: T[], query: string): T | undefined {
  const q = query.toLowerCase();
  return items.find(i => i.name.toLowerCase().includes(q))
    || items.find(i => q.split(/\s+/).some(word => i.name.toLowerCase().includes(word)));
}
