import { useState, useEffect } from 'react';

type Metrics = {
  cores: number;
  memUsedMB: number;
  memTotalMB: number;
  memPercent: number;
  online: boolean;
  netType: string;
  netDownlinkMbps: number;
  batteryPercent: number | null;
  batteryCharging: boolean;
  cpuLoad: number;
  uptime: number;
  pingMs: number | null;
};

const startTime = Date.now();

export function useSystemMetrics(): Metrics {
  const [metrics, setMetrics] = useState<Metrics>({
    cores: typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4,
    memUsedMB: 0,
    memTotalMB: 0,
    memPercent: 0,
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    netType: '4g',
    netDownlinkMbps: 10,
    batteryPercent: null,
    batteryCharging: false,
    cpuLoad: 23,
    uptime: 0,
    pingMs: null,
  });

  useEffect(() => {
    let mounted = true;
    let battery: any = null;
    let onBatteryChange: (() => void) | null = null;

    // Battery API
    const nav: any = navigator;
    if (nav.getBattery) {
      nav.getBattery().then((b: any) => {
        if (!mounted) return;
        battery = b;
        const update = () => {
          if (!mounted) return;
          setMetrics(m => ({
            ...m,
            batteryPercent: Math.round(b.level * 100),
            batteryCharging: b.charging,
          }));
        };
        onBatteryChange = update;
        b.addEventListener('levelchange', update);
        b.addEventListener('chargingchange', update);
        update();
      }).catch(() => {});
    }

    // Online listener
    const onOnline = () => setMetrics(m => ({ ...m, online: true }));
    const onOffline = () => setMetrics(m => ({ ...m, online: false }));
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    // Ping measurement
    const measurePing = async () => {
      const start = performance.now();
      try {
        await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
        const ms = Math.round(performance.now() - start);
        if (mounted) setMetrics(m => ({ ...m, pingMs: ms }));
      } catch {}
    };

    // Periodic update for memory + uptime + cpuLoad estimate
    let prevTime = performance.now();
    let frames = 0;
    let fpsAccum = 60;

    const tick = () => {
      if (!mounted) return;
      frames++;
      const now = performance.now();
      if (now - prevTime >= 1000) {
        const fps = (frames * 1000) / (now - prevTime);
        fpsAccum = fpsAccum * 0.7 + fps * 0.3;
        frames = 0;
        prevTime = now;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const updateInterval = setInterval(() => {
      if (!mounted) return;
      const perf: any = performance;
      const memUsed = perf.memory ? Math.round(perf.memory.usedJSHeapSize / 1024 / 1024) : 0;
      const memTotal = perf.memory ? Math.round(perf.memory.jsHeapSizeLimit / 1024 / 1024) : 0;
      const memPct = memTotal > 0 ? Math.round((memUsed / memTotal) * 100) : 0;

      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const netType = conn?.effectiveType || '4g';
      const downlink = conn?.downlink || 10;

      // CPU load estimate from FPS deficit (60fps = 0% load, 30fps = 50% load)
      const cpuEstimate = Math.max(5, Math.min(95, Math.round(100 - (fpsAccum / 60) * 100) + 18));

      setMetrics(m => ({
        ...m,
        memUsedMB: memUsed,
        memTotalMB: memTotal,
        memPercent: memPct,
        netType,
        netDownlinkMbps: downlink,
        cpuLoad: cpuEstimate,
        uptime: Math.round((Date.now() - startTime) / 1000),
      }));
    }, 1500);

    measurePing();
    const pingInterval = setInterval(measurePing, 8000);

    return () => {
      mounted = false;
      clearInterval(updateInterval);
      clearInterval(pingInterval);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      if (battery && onBatteryChange) {
        battery.removeEventListener('levelchange', onBatteryChange);
        battery.removeEventListener('chargingchange', onBatteryChange);
      }
    };
  }, []);

  return metrics;
}
