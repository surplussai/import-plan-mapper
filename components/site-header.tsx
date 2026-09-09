"use client";

import { Play, RotateCcw } from "lucide-react";

export function SiteHeader({ onStart, onReset }: { onStart: () => void; onReset: () => void }) {
  return (
    <header className="shrink-0 border-b border-line bg-elevated">
      <div className="mx-auto flex h-14 w-full max-w-[1880px] items-center gap-4 px-5 md:px-6">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="font-display text-[15px] font-semibold text-ink">Surpluss</span>
          <span className="text-ink-3">/</span>
          <h1 className="truncate text-[14px] font-medium text-ink-2">How Surpluss understands messy inventory files</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink px-3.5 text-[13px] font-semibold text-white transition hover:bg-ink/90"
          >
            <Play className="h-3.5 w-3.5" strokeWidth={2.5} />
            Start walkthrough
          </button>
          <button
            type="button"
            onClick={onReset}
            aria-label="Reset view"
            title="Reset view (R)"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-elevated text-ink-2 transition hover:border-ink-3 hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
