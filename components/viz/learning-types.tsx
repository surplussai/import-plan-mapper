import { ArrowDown } from "lucide-react";

const MEMORY = [
  ["Seller memory", "PTR from ABC Distributors was confirmed as Offer price", "next ABC upload can get +4"],
  ["Global memory", "PTR was confirmed as Offer price in many imports", "new sellers can get +2"],
  ["Semantic memory", "PTR with price-like values beside MRP was embedded", "similar columns can get +1"],
];

const CALIBRATION = ["Confirmed imports", "Compare predictions", "Measure corrections", "Adjust weights", "Deploy scorer version"];

export function LearningTypes() {
  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-teal/30 bg-canvas p-3.5">
        <div className="text-[12.5px] font-semibold text-ink">Memory used on future imports</div>
        <div className="mt-2 grid gap-2">
          {MEMORY.map(([name, example, score]) => (
            <div key={name} className="rounded-md border border-line bg-elevated px-3 py-2 text-[12px]">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-medium text-ink">{name}</span>
                <span className="font-mono text-[11.5px] font-semibold text-teal">{score}</span>
              </div>
              <div className="mt-1 text-[11.5px] leading-snug text-ink-2">{example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="text-[12.5px] font-semibold text-ink">Offline calibration</div>
        <p className="mt-1 text-[12px] leading-snug text-ink-2">After many committed imports, we check which evidence types were actually reliable.</p>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {CALIBRATION.map((f, i) => (
            <span key={f} className="flex items-center gap-1">
              <span className="rounded border border-line bg-elevated px-2 py-0.5 text-[11px] text-ink-2">{f}</span>
              {i < CALIBRATION.length - 1 && <ArrowDown className="h-3 w-3 -rotate-90 text-ink-3" />}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-ink-3">One upload does not change global scoring. Weight changes are measured, versioned and deployed deliberately.</p>
      </div>
    </div>
  );
}
