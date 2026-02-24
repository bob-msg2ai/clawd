"use client";

import { LiveIndicator } from "@/components/ui/live-indicator";

export function Header() {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#0a0a0a]/50 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-zinc-100">Dashboard</h2>
        <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1">
          <LiveIndicator size="sm" />
          <span className="text-xs text-zinc-400">Live Data</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-zinc-500">Session Uptime</p>
          <p className="text-sm font-mono text-zinc-300">00:00:00</p>
        </div>
        <div className="h-8 w-px bg-white/[0.06]" />
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]">
          <span className="text-xs font-medium text-zinc-300">A</span>
        </div>
      </div>
    </header>
  );
}