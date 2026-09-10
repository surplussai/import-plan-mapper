const RECORDS = [
  {
    title: "This import record",
    sub: "Used for audit and replay",
    rows: [
      ["Header", "PTR"],
      ["Suggested", "offerPrice"],
      ["Final", "offerPrice"],
      ["Evidence", "alias + profile + relation"],
    ],
  },
  {
    title: "Seller/template memory",
    sub: "Used on this seller's next upload",
    rows: [
      ["Seller", "ABC Distributors"],
      ["Header", "ptr"],
      ["Confirmed", "offerPrice"],
      ["Rejected", "mrp"],
    ],
  },
  {
    title: "Global memory",
    sub: "Used for new sellers",
    rows: [
      ["Header", "ptr"],
      ["offerPrice", "82 confirmed"],
      ["purchasePrice", "7 confirmed"],
      ["mrp", "2 confirmed"],
    ],
  },
  {
    title: "Semantic memory",
    sub: "Used for embedding search",
    rows: [
      ["Description", "PTR, price-like, beside MRP"],
      ["Confirmed", "offerPrice"],
      ["Vector", "stored embedding"],
      ["Scope", "committed examples only"],
    ],
  },
];

function RecordCard({ title, sub, rows }: { title: string; sub: string; rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-canvas">
      <div className="border-b border-line bg-strong px-3 py-2">
        <div className="text-[12.5px] font-semibold text-ink">{title}</div>
        <div className="text-[11.5px] text-ink-2">{sub}</div>
      </div>
      <dl className="divide-y divide-line bg-elevated">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-2 px-3 py-1.5 text-[12px]">
            <dt className="text-ink-3">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function StorageView() {
  return (
    <div className="grid gap-3">
      {RECORDS.map((r) => (
        <RecordCard key={r.title} title={r.title} sub={r.sub} rows={r.rows as [string, string][]} />
      ))}
      <p className="text-[12px] leading-snug text-ink-3">Rejected choices are stored too, so the engine does not keep asking the same wrong question.</p>
    </div>
  );
}
