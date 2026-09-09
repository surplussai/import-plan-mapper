import { ArrowRight } from "lucide-react";

const BEFORE = [
  { col: "MRP", wants: "MRP" },
  { col: "PRICE", wants: "MRP" },
  { col: "PTR", wants: "MRP" },
];
const AFTER = [
  { col: "MRP", to: "MRP", tone: "text-teal" },
  { col: "PTR", to: "Offer price", tone: "text-teal" },
  { col: "PRICE", to: "Purchase price? — or left open", tone: "text-saffron" },
];

export function ResolverView() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">Three price-like columns on one sheet</div>
      <div className="mt-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-[11px] text-ink-3">Judged one by one</div>
          {BEFORE.map((b) => (
            <div key={b.col} className="flex items-center justify-between rounded-md border border-line bg-elevated px-2.5 py-1.5 text-[12px]">
              <span className="font-mono text-ink-2">{b.col}</span>
              <span className="text-warn font-medium text-[#b23b4b]">{b.wants}</span>
            </div>
          ))}
        </div>
        <ArrowRight className="h-4 w-4 text-ink-3" />
        <div className="flex flex-col gap-1">
          <div className="text-[11px] text-ink-3">Judged as a group</div>
          {AFTER.map((a) => (
            <div key={a.col} className="flex items-center justify-between gap-2 rounded-md border border-line bg-elevated px-2.5 py-1.5 text-[12px]">
              <span className="font-mono text-ink-2">{a.col}</span>
              <span className={`text-right font-medium ${a.tone}`}>{a.to}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2.5 text-[12px] leading-snug text-ink-3">
        Under the hood this is a best-assignment problem: every column–field pair has a score, the same field can only be taken once, and the sheet-wide total is maximised.
      </p>
    </div>
  );
}
