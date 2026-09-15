"use client";

import { Maximize, Minimize } from "lucide-react";
import { SCENARIOS } from "@/lib/scenarios";

export function CanvasHeading({
  scenarioId,
  onScenario,
  fullscreen,
  onFullscreen,
}: {
  scenarioId: string | null;
  onScenario: (id: string | null) => void;
  fullscreen: boolean;
  onFullscreen: () => void;
}) {
  return (
    <div className="mb-2.5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <h2 className="font-display text-[20px] font-semibold text-ink">The mapping journey</h2>
        <p className="text-[13px] text-ink-2">Select a step or play a scenario. Clear columns take a short path; uncertain columns collect deeper evidence.</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex items-center gap-1.5" role="group" aria-label="Scenarios">
          <span className="mr-1 text-[12px] text-ink-3">Scenarios</span>
          {SCENARIOS.map((s) => {
            const on = s.id === scenarioId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onScenario(on ? null : s.id)}
                aria-pressed={on}
                className={`h-7 rounded-full border px-2.5 text-[12px] font-medium transition ${
                  on ? "border-ink bg-ink text-white" : "border-line bg-elevated text-ink-2 hover:border-ink-3 hover:text-ink"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
        <ul className="flex items-center gap-3.5 text-[12px] text-ink-2" aria-label="Legend">
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal" /> Automatic
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-saffron" /> Assisted
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-indigo" /> Needs confirmation
          </li>
        </ul>
        <button
          type="button"
          onClick={onFullscreen}
          title={fullscreen ? "Exit full screen (Esc)" : "Full screen (F)"}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-elevated px-3 text-[12.5px] font-medium text-ink-2 transition hover:border-ink-3 hover:text-ink"
        >
          {fullscreen ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
          {fullscreen ? "Exit full screen" : "Full screen"}
        </button>
      </div>
    </div>
  );
}
