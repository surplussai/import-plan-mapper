const SHORTLIST = [
  { field: "Offer price", why: "closest field meaning", score: "+1", tone: "text-teal" },
  { field: "Purchase price", why: "related, but weaker", score: "+1", tone: "text-saffron" },
  { field: "MRP", why: "price field, but less similar", score: "0", tone: "text-ink-3" },
];

export function AiRoute() {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="text-[11.5px] font-medium text-ink-3">Step 1: embedding retrieval</div>
        <div className="mt-1 text-[12.5px] font-semibold text-ink">Build a shortlist</div>

        <div className="mt-2 rounded-md border border-line bg-elevated px-3 py-2 text-[11.5px]">
          <div className="text-ink-3">Column description</div>
          <div className="mt-1 font-mono leading-snug text-ink-2">Header Dealer Landing. Price-like values. Nearby columns MRP and stock.</div>
        </div>

        <div className="mt-2 grid gap-1.5">
          {SHORTLIST.map((s) => (
            <div key={s.field} className="grid grid-cols-[1fr_auto] gap-2 rounded-md border border-line bg-elevated px-3 py-2 text-[12px]">
              <div>
                <div className="font-medium text-ink">{s.field}</div>
                <div className="text-[11.5px] text-ink-3">{s.why}</div>
              </div>
              <span className={`font-mono font-semibold ${s.tone}`}>{s.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="text-[11.5px] font-medium text-ink-3">Step 2: model suggestion</div>
        <div className="mt-1 text-[12.5px] font-semibold text-ink">Only if still unresolved</div>

        <div className="mt-2 grid gap-2 text-[12px]">
          <div className="rounded-md border border-line bg-elevated px-3 py-2">
            <div className="text-[11px] text-ink-3">Allowed answers</div>
            <div className="mt-0.5 font-mono text-ink-2">mrp · offerPrice · purchasePrice · unknown</div>
          </div>
          <div className="rounded-md border border-saffron/40 bg-saffron/8 px-3 py-2">
            <div className="text-[11px] text-ink-3">Returned clue</div>
            <div className="mt-0.5 text-ink">
              Suggested <span className="font-medium text-saffron">offerPrice</span>. Add at most <span className="font-mono text-saffron">+1</span> unless other layers agree.
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11.5px] leading-snug text-ink-3">The AI result goes back to the scorer. It cannot bypass the confidence gate.</p>
      </div>
    </div>
  );
}
