const VECTORS: [string, string, string][] = [
  ["Offer price", "[0.21, 0.82, 0.14, …]", "text-teal"],
  ["Dealer selling price", "[0.24, 0.79, 0.17, …]", "text-teal"],
  ["Product expiry date", "[0.91, 0.05, 0.62, …]", "text-ink-3"],
];

export function EmbeddingView() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">First, what an embedding is</div>
      <p className="mt-1.5 text-[12.5px] leading-snug text-ink-2">
        An embedding turns a piece of text into a list of numbers that stands for its approximate meaning. Phrases that mean similar things end up with similar
        numbers, even when the words are different.
      </p>
      <div className="mt-2.5 overflow-hidden rounded-md border border-line bg-elevated">
        {VECTORS.map(([t, v, c]) => (
          <div key={t} className="grid grid-cols-[1fr_auto] gap-3 border-b border-line px-3 py-1.5 text-[12px] last:border-b-0">
            <span className="text-ink">{t}</span>
            <span className={`font-mono ${c}`}>{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[12px] text-ink-2">
        The first two are close to each other; the third is far away. Real vectors have hundreds or thousands of numbers — the idea is the same.
      </p>
      <div className="mt-3 text-[11.5px] font-medium text-ink-3">What embeddings cannot do</div>
      <p className="mt-1 text-[12px] leading-snug text-ink-2">
        They are weak for short abbreviations. <span className="font-mono">PTR</span>, <span className="font-mono">PC</span>, <span className="font-mono">Qty</span> or{" "}
        <span className="font-mono">Rate</span> carry almost no meaning on their own, so for those, aliases and seller memory are more reliable. Embeddings generate
        candidates — they do not finalise mappings.
      </p>
    </div>
  );
}
