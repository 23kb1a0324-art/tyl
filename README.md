# J.A.R.V.I.S — AI Command Dashboard

A futuristic, fully-functional Iron-Man-style **HUD dashboard** built with React + Vite + TypeScript + Tailwind. Every panel is wired to **real browser APIs** — not mocked visuals.

> *"Sir, I'm online and ready."*

![JARVIS Dashboard Preview](docs/preview.png)

---

## Live Features (everything actually works)

### Voice Command Center
- **Web Speech API** speech-to-text (Chrome / Edge / Safari)
- Live mic level meter (Web Audio AnalyserNode)
- Wake-word strip (`JARVIS`, `HEY JARVIS`)
- Real speech confidence %
- Toggle mic, last-command playback, error states

### HeroHUD — Conversation Console
- Time-of-day greeting (`GOOD MORNING / AFTERNOON / EVENING`)
- Type or speak: full **rule-based intent parser** (greet, time, date, weather, jokes, status, calc, search, open, mode-switch, device toggle, automation toggle, module toggle, list, clear)
- JARVIS speaks replies via **SpeechSynthesis API** (mute toggle in top right)
- Action chips (CHAT / CODE / ANALYZE / DESIGN / RESEARCH / AUTOMATE) trigger commands
- Animated thinking pulse + AI-confidence and learning-rate gauges

### AI Thinking Process
- Reactive 6-stage pipeline (`INPUT → ANALYZING → REASONING → DECISION → EXECUTING → COMPLETED`)
- Driven by real command processor lifecycle from the shared store

### Top Bar
- **Real CPU load** (estimated via 60fps frame-time deltas)
- **Real RAM** (`performance.memory.usedJSHeapSize`)
- **Real battery %** + charging state (`navigator.getBattery()`)
- **Real network** type + downlink Mbps (`navigator.connection`)
- Live online/offline badge

### Connected Devices (clickable toggles)
- Persisted device list with on/off toggles
- Each click logs an event and updates the network map

### Automation Center
- Switch toggles for Folder Organizer, Schedule Manager, Auto-Reply, Backup Sync, Smart Lighting…
- "Enable All" one-click action

### AI Modules
- Voice / Vision / Laptop Control / Code Generator / Emotion AI / Drone / Echo Engine
- Click any module to toggle ACTIVE ↔ INACTIVE
- Color-coded status: ACTIVE / INACTIVE / BETA / INSTALLING / TESTING

### Mode Switcher
- Click to switch: Assistant / Focus / Security / Sleep
- Mode persists, shows in HeroHUD + Memory + Insights

### Network Map
- Live ping (calculated from `fetch` round-trip)
- Online/offline node coloring
- Network type & speed overlay

### System Performance
- Real CPU / RAM / GPU(estimated) gauges
- Real temperature estimate, battery, up/downstream Mbps

### Memory Center
- Counts every conversation, computes usage %, lists 3 most recent user messages
- "CLEAR MEMORY" wipes chat history

### Data Overview
- Live `localStorage` byte usage (refreshed every 4s)
- Growth delta per refresh, total record/event/chat counts

### Security Status
- Real `isSecureContext` / HTTPS / mediaDevices / Notification / online checks
- Run-scan button with timed scan + log entry
- Computed threat level (0–100%)

### Live Logs + Activity Timeline
- Every interaction across the dashboard logs to the shared store
- LiveLogs auto-scrolls; Timeline shows newest 6 with color-coded severity

### Predictive Insights
- Time-aware (morning routine, focus block, evening wind-down, late-night)
- Battery / CPU warnings
- Offline-device suggestions
- Conversation-pattern hints

### Terminal (full working REPL)
- Commands: `help`, `clear`, `status`, `metrics`, `devices`, `automations`, `modules`, `mode <name>`, `toggle <device>`, `log "<msg>"`, `echo`, `date`, `whoami`, `jarvis <prompt>`
- Arrow-up / down command history
- Ctrl+L to clear
- Every command writes to the live log

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 7 |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Icons | lucide-react |
| Fonts | Orbitron (display) · Inter (UI) · JetBrains Mono (code) |
| Charts | Recharts |
| State | React Context + `localStorage` persistence |
| Speech | Web Speech API + SpeechSynthesis |
| Audio | Web Audio API (mic level) |
| Metrics | `performance.memory`, `navigator.getBattery`, `navigator.connection`, frame-time deltas |
| Monorepo | pnpm workspaces |

---

## Project Structure

```
artifacts/
└── jarvis-dashboard/
    └── src/
        ├── components/
        │   ├── dashboard/        # All HUD panels
        │   └── ui/               # shadcn primitives
        ├── hooks/
        │   ├── useSystemMetrics.ts     # CPU / RAM / battery / network
        │   └── useSpeechRecognition.ts # mic + STT + speak()
        ├── lib/
        │   └── commandProcessor.ts     # intent parser + fuzzy matcher
        ├── store/
        │   └── jarvis.tsx              # global state + persistence
        ├── pages/
        │   └── Dashboard.tsx
        └── App.tsx
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Install & Run

```bash
# from the repo root (monorepo)
pnpm install

# start the dashboard dev server
pnpm --filter @workspace/jarvis-dashboard dev
```

Open the printed URL (Vite will pick a free port). For best results use **Chrome** or **Edge** (Web Speech API + battery API).

### Build for production

```bash
pnpm --filter @workspace/jarvis-dashboard build
```

The static bundle lands in `artifacts/jarvis-dashboard/dist`.

---

## Try It Out

In the HeroHUD chat, try:

| Say / type | What happens |
|---|---|
| `hello jarvis` | Time-aware greeting |
| `what time is it?` | Current time |
| `tell me a joke` | Random tech joke |
| `system status` | Full status report |
| `set mode focus` | Switches mode → Focus |
| `toggle laptop` | Toggles a connected device |
| `enable smart lighting` | Toggles automation |
| `calc 14 * 23 + 5` | Quick math |
| `clear chat` | Wipes conversation |

Then open the **Terminal** panel and run `help`, `status`, `metrics`, `devices`, `mode security`, `toggle phone` …

---

## Repo

[github.com/23kb1a0324-art/tyl](https://github.com/23kb1a0324-art/tyl)

## License

MIT
