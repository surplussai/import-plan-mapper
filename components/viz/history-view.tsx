const GLOBAL_PTR: [string, number][] = [
  ["Offer price", 82],
  ["Purchase price", 7],
  ["MRP", 2],
];
const GLOBAL_RATE: [string, number][] = [
  ["Offer price", 40],
  ["Purchase price", 35],
  ["MRP", 30],
];
const SIMILAR: [string, string, string][] = [
  ["Dealer Price", "Offer price", "High"],
  ["Retailer Rate", "Offer price", "High"],
  ["Trade Price", "Offer price", "Medium"],
  ["Landing Price", "Purchase price", "Medium"],
];
const STRENGTH: [string, string][] = [
  ["1 of 1 confirmations", "weak — too little data"],
  ["8 of 10", "useful"],
  ["82 of 91", "strong"],
  ["40 of 100", "ambiguous"],
  ["5 confirmed, 10 rejected", "negative evidence"],
];

function Counts({ rows }: { rows: [string, number][] }) {
  const total = rows.reduce((a, r) => a + r[1], 0);
  return (
    <div className="grid gap-1">
      {rows.map(([f, n]) => (
        <div key={f} className="grid grid-cols-[7rem_1fr_2rem] items-center gap-2 text-[11.5px]">
          <span className="text-ink-2">{f}</span>
          <span className="h-1.5 rounded-full bg-strong">
            <span className="block h-full rounded-full bg-teal" style={{ width: `${(n / total) * 100}%` }} />
          </span>
          <span className="text-right font-mono text-ink-3">{n}</span>
        </div>
      ))}
    </div>
  );
}

export function HistoryView() {
  return (
    <div className="grid gap-2.5">
      <div className="rounded-lg border border-teal/30 bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[12.5px] font-semibold text-ink">1 · Seller history</div>
          <span className="text-[11px] text-teal">trust: very high</span>
        </div>
        <p className="mt-1 text-[12px] text-ink-2">Has this exact seller used this exact header before?</p>
        <div className="mt-2 rounded-md border border-line bg-elevated px-3 py-1.5 font-mono text-[11.5px] text-ink-2">
          ABC Distributors · PTR → Offer price · confirmed 4 · rejected 0
        </div>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[12.5px] font-semibold text-ink">2 · Global header history</div>
          <span className="text-[11px] text-ink-3">trust: high when consistent</span>
        </div>
        <p className="mt-1 text-[12px] text-ink-2">Across all suppliers, what has this exact header usually meant?</p>
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-elevated p-2.5">
            <div className="mb-1.5 font-mono text-[11px] text-ink">ptr</div>
            <Counts rows={GLOBAL_PTR} />
            <div className="mt-1.5 text-[11px] text-teal">90% agree — strong evidence</div>
          </div>
          <div className="rounded-md border border-line bg-elevated p-2.5">
            <div className="mb-1.5 font-mono text-[11px] text-ink">rate</div>
            <Counts rows={GLOBAL_RATE} />
            <div className="mt-1.5 text-[11px] text-saffron">mixed — cannot decide alone</div>
          </div>
        </div>
        <div className="mt-2.5 overflow-hidden rounded-md border border-line bg-elevated">
          {STRENGTH.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[1fr_1fr] gap-2 border-b border-line px-2.5 py-1 text-[11.5px] last:border-b-0">
              <span className="font-mono text-ink-2">{k}</span>
              <span className="text-ink-2">{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-[11.5px] text-ink-3">Strength depends on how many examples, how many agree, how many were rejected, and how recently the pattern was seen.</p>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[12.5px] font-semibold text-ink">3 · Semantic history search</div>
          <span className="text-[11px] text-ink-3">trust: medium</span>
        </div>
        <p className="mt-1 text-[12px] text-ink-2">
          Have we seen a different header with a similar meaning and similar context? Spelling won’t connect <span className="font-mono">Dealer Landing</span> to Offer
          price, but confirmed examples with similar meaning can.
        </p>
        <div className="mt-2 overflow-hidden rounded-md border border-line bg-elevated">
          <div className="grid grid-cols-[1fr_1fr_4rem] gap-2 border-b border-line bg-strong px-2.5 py-1 text-[11px] font-medium text-ink-2">
            <span>Past header</span>
            <span>Confirmed as</span>
            <span>Similar</span>
          </div>
          {SIMILAR.map(([h, t, s]) => (
            <div key={h} className="grid grid-cols-[1fr_1fr_4rem] gap-2 border-b border-line px-2.5 py-1 text-[11.5px] last:border-b-0">
              <span className="font-mono text-ink-2">{h}</span>
              <span className="text-ink">{t}</span>
              <span className={s === "High" ? "text-teal" : "text-ink-3"}>{s}</span>
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-[11.5px] text-ink-3">Among the closest confirmed examples: Offer price 3, Purchase price 1. That becomes evidence — not an answer.</p>
        <div className="mt-2.5 rounded-md border border-line bg-elevated px-3 py-2 text-[11.5px] text-ink-2">
          <div className="text-[11px] font-medium text-ink-3">What we actually embed — a description, not just the header</div>
          <div className="mt-1 font-mono leading-snug">Inventory spreadsheet column. Header PTR. Positive decimal currency values. Nearby columns MRP, GST and available stock.</div>
        </div>
      </div>
    </div>
  );
}
