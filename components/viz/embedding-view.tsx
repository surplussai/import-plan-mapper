const VECTORS: [string, string, string][] = [
  ["Offer price", "[0.21, 0.82, 0.14, ...]", "text-teal"],
  ["Dealer selling price", "[0.24, 0.79, 0.17, ...]", "text-teal"],
  ["Product expiry date", "[0.91, 0.05, 0.62, ...]", "text-ink-3"],
];

export function EmbeddingView() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">What an embedding does</div>
      <div className="mt-1 text-[12.5px] font-semibold text-ink">Compare meaning as numbers</div>

      <div className="mt-3 overflow-hidden rounded-md border border-line bg-elevated">
        {VECTORS.map(([t, v, c]) => (
          <div key={t} className="grid grid-cols-[1fr_auto] gap-3 border-b border-line px-3 py-1.5 text-[12px] last:border-b-0">
            <span className="text-ink">{t}</span>
            <span className={`font-mono ${c}`}>{v}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-2 text-[11.5px] leading-snug">
        <div className="rounded-md border border-line bg-elevated px-3 py-2 text-ink-2">Similar meanings produce nearby vectors.</div>
        <div className="rounded-md border border-line bg-elevated px-3 py-2 text-ink-2">Short abbreviations like PTR are weak alone, so we include values and nearby headers.</div>
        <div className="rounded-md border border-line bg-elevated px-3 py-2 text-ink-2">Embedding matches create candidates. They do not finalize mappings.</div>
      </div>
    </div>
  );
}
