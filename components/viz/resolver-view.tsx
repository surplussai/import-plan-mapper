import { ArrowRight } from "lucide-react";

const SCORES = [
  { col: "MRP", scores: [["MRP", "+10"], ["Offer price", "+2"]] },
  { col: "RATE", scores: [["MRP", "+8"], ["Offer price", "+6"]] },
  { col: "PRICE", scores: [["Offer price", "+7"], ["MRP", "+5"]] },
];
const AFTER = [
  { col: "MRP", to: "MRP", tone: "text-teal" },
  { col: "RATE", to: "MRP candidate loses to existing MRP", tone: "text-saffron" },
  { col: "PRICE", to: "Offer price", tone: "text-teal" },
];

export function ResolverView() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">Input from scorer</div>
      <div className="mt-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex flex-col gap-1">
          <div className="text-[11px] text-ink-3">Column candidates</div>
          {SCORES.map((row) => (
            <div key={row.col} className="rounded-md border border-line bg-elevated px-2.5 py-2 text-[12px]">
              <div className="font-mono font-semibold text-ink">{row.col}</div>
              <div className="mt-1 grid gap-0.5">
                {row.scores.map(([field, score]) => (
                  <div key={field} className="flex items-center justify-between gap-2">
                    <span className="text-ink-2">{field}</span>
                    <span className="font-mono text-teal">{score}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ArrowRight className="h-4 w-4 text-ink-3" />
        <div className="flex flex-col gap-1">
          <div className="text-[11px] text-ink-3">Best group result</div>
          {AFTER.map((a) => (
            <div key={a.col} className="grid grid-cols-[3.5rem_1fr] gap-2 rounded-md border border-line bg-elevated px-2.5 py-2 text-[12px]">
              <span className="font-mono text-ink-2">{a.col}</span>
              <span className={`font-medium ${a.tone}`}>{a.to}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 grid gap-2 rounded-md border border-line bg-elevated px-3 py-2.5 text-[11.5px]">
        <div className="font-medium text-ink">Why after scorer?</div>
        <p className="leading-snug text-ink-2">The resolver needs a score for every column to field pair. Then it can choose the highest total combination without duplicates or broken rules.</p>
      </div>
    </div>
  );
}
