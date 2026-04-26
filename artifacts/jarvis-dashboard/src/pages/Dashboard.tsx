import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { VoiceCommandCenter } from '@/components/dashboard/VoiceCommandCenter';
import { HeroHUD } from '@/components/dashboard/HeroHUD';
import { AIThinkingProcess } from '@/components/dashboard/AIThinkingProcess';
import { DataOverview } from '@/components/dashboard/DataOverview';
import { SystemPerformance } from '@/components/dashboard/SystemPerformance';
import { AIModules } from '@/components/dashboard/AIModules';
import { ConnectedDevices } from '@/components/dashboard/ConnectedDevices';
import { AutomationCenter } from '@/components/dashboard/AutomationCenter';
import { MemoryCenter } from '@/components/dashboard/MemoryCenter';
import { SecurityStatus } from '@/components/dashboard/SecurityStatus';
import { PredictiveInsights } from '@/components/dashboard/PredictiveInsights';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { LiveLogs } from '@/components/dashboard/LiveLogs';
import { Terminal } from '@/components/dashboard/Terminal';
import { NetworkMap } from '@/components/dashboard/NetworkMap';
import { ModeSwitcher } from '@/components/dashboard/ModeSwitcher';

export default function Dashboard() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-hidden flex flex-col relative select-none">
      {/* Global overlay grid */}
      <div className="absolute inset-0 pointer-events-none z-[-1] opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwRTVGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="max-w-[1600px] mx-auto pb-4">
            {/* Main Grid: 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
              
              {/* Left Column */}
              <div className="md:col-span-3 flex flex-col gap-3">
                <div className="h-[250px]">
                  <VoiceCommandCenter />
                </div>
                <div className="h-[280px] jarvis-panel p-3">
                  <AIThinkingProcess />
                </div>
              </div>

              {/* Center Column - Hero */}
              <div className="md:col-span-6 h-[542px] jarvis-panel">
                <HeroHUD />
              </div>

              {/* Right Column */}
              <div className="md:col-span-3 flex flex-col gap-3">
                <div className="h-[120px] jarvis-panel p-3">
                  <DataOverview />
                </div>
                <div className="h-[200px] jarvis-panel p-3">
                  <SystemPerformance />
                </div>
                <div className="h-[198px] jarvis-panel p-3">
                  <AIModules />
                </div>
              </div>
            </div>

            {/* Middle Band - 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
              <div className="h-[200px] jarvis-panel p-3">
                <ConnectedDevices />
              </div>
              <div className="h-[200px] jarvis-panel p-3">
                <AutomationCenter />
              </div>
              <div className="h-[200px] jarvis-panel p-3">
                <MemoryCenter />
              </div>
              <div className="h-[200px] jarvis-panel p-3">
                <SecurityStatus />
              </div>
            </div>

            {/* Predictive Insights Wide Band */}
            <div className="grid grid-cols-1 gap-3 mb-3">
              <div className="h-[180px] jarvis-panel p-3">
                <PredictiveInsights />
              </div>
            </div>

            {/* Bottom Band - 5 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-1 h-[240px] jarvis-panel p-3">
                 <ActivityTimeline />
              </div>
              <div className="md:col-span-1 h-[240px] jarvis-panel p-3">
                 <LiveLogs />
              </div>
              <div className="md:col-span-1 h-[240px] jarvis-panel p-3">
                 <Terminal />
              </div>
              <div className="md:col-span-1 h-[240px] jarvis-panel p-3">
                 <NetworkMap />
              </div>
              <div className="md:col-span-1 h-[240px]">
                 <ModeSwitcher />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
