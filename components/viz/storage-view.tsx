const IMPORT_RECORD: [string, string][] = [
  ["Import", "September stock upload"],
  ["Source header", "PTR → normalized “ptr”"],
  ["Suggested · final", "offerPrice · offerPrice"],
  ["Decision", "user confirmed"],
  ["Confidence", "useful"],
  ["Evidence", "alias + price profile + MRP relationship"],
];

const KNOWLEDGE_RECORD: [string, string][] = [
  ["Seller", "ABC Distributors"],
  ["Header", "ptr → offerPrice"],
  ["Confirmations · rejections", "3 · 0"],
  ["Also stored", "ptr → MRP was rejected"],
  ["Trust", "confirmed"],
];

function Record({ title, sub, rows, accent }: { title: string; sub: string; rows: [string, string][]; accent: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className={`border-b border-line px-3 py-2 ${accent}`}>
        <div className="text-[12.5px] font-semibold text-ink">{title}</div>
        <div className="text-[11.5px] text-ink-2">{sub}</div>
      </div>
      <dl className="divide-y divide-line bg-elevated">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-2 px-3 py-1.5 text-[12px]">
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
    <div className="flex flex-col gap-2.5">
      <Record title="This import" sub="What happened on this upload — for audit, replay and explaining decisions" rows={IMPORT_RECORD} accent="bg-strong" />
      <Record title="Seller memory" sub="What we have learned about this seller over time — reused on the next upload" rows={KNOWLEDGE_RECORD} accent="bg-teal/10" />
      <p className="text-[12px] leading-snug text-ink-3">Rejected choices are stored too — otherwise the engine would keep suggesting the same wrong option.</p>
    </div>
  );
}
