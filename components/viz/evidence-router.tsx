"use client";

import { ArrowRight, Check, Search, Tags } from "lucide-react";

const PATHS = [
  {
    icon: Check,
    tone: "border-teal/30 bg-teal/5 text-teal",
    title: "Short path",
    when: "Exact alias or exact seller memory",
    action: "Skip deeper evidence",
  },
  {
    icon: Search,
    tone: "border-saffron/30 bg-saffron/5 text-saffron",
    title: "Targeted path",
    when: "Close candidates or a weak clue",
    action: "Run fuzzy, values and semantics",
  },
  {
    icon: Tags,
    tone: "border-indigo/25 bg-indigo/5 text-indigo",
    title: "Attribute path",
    when: "No plausible Surpluss field",
    action: "Preserve as an attribute",
  },
] as const;

export function EvidenceRouter() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11.5px] font-medium text-ink-3">Quick check after cheap evidence</div>
          <div className="mt-0.5 text-[13px] font-semibold text-ink">How difficult is this column?</div>
        </div>
        <span className="rounded-md border border-line bg-elevated px-2 py-1 font-mono text-[11px] text-ink-2">MRP</span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11.5px]">
        {["Top score: +4", "Margin: +4", "Contradictions: 0", "Target conflicts: 0"].map((item) => (
          <div key={item} className="rounded-md border border-line bg-elevated px-2.5 py-1.5 text-ink-2">
            {item}
          </div>
        ))}
      </div>

      <div className="my-2 flex items-center gap-2 text-[10.5px] uppercase text-ink-3">
        <span className="h-px flex-1 bg-line" />
        choose one route
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid gap-1.5">
        {PATHS.map(({ icon: Icon, tone, title, when, action }) => (
          <div key={title} className={`grid grid-cols-[28px_1fr] gap-2 rounded-md border px-2.5 py-2 ${tone}`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-elevated">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold">{title}</div>
              <div className="mt-0.5 text-[11.5px] leading-snug text-ink-2">{when}</div>
              <div className="mt-0.5 flex items-start gap-1 text-[11.5px] font-medium">
                <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" />
                <span>{action}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 rounded-md border border-line bg-elevated px-3 py-1.5 text-center text-[11.5px] font-medium text-ink">
        Provisional only: scorer and whole-sheet resolver still approve it
      </div>
    </div>
  );
}
