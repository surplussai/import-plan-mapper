const SIMS = [
  { field: "Trade price", desc: "the price offered to a retailer or distributor", level: "Strong", cls: "border-teal/50 bg-teal/12 text-teal" },
  { field: "Purchase price", desc: "what Surpluss would pay the supplier", level: "Useful", cls: "border-saffron/40 bg-saffron/10 text-saffron" },
  { field: "MRP", desc: "the maximum retail price printed on the product", level: "Weak", cls: "border-line bg-strong text-ink-3" },
];

export function AiRoute() {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[11.5px] font-medium text-ink-3">Step 1 · Semantic candidate retrieval</div>
          <span className="text-[11px] text-ink-3">embeddings · cheap</span>
        </div>
        <p className="mt-1.5 text-[12.5px] leading-snug text-ink-2">
          A description of the column — header, value shape, neighbouring headers — is turned into a vector (OpenAI text-embedding-3-small). It is compared with two
          things: the plain-language descriptions of the official Surpluss fields, and previously confirmed columns from real supplier files. The closest matches
          become the shortlist.
        </p>
        <div className="mt-2.5 rounded-md border border-line bg-elevated px-3 py-2 text-[12.5px]">
          Source header: <span className="font-mono text-ink">Dealer Landing</span>
        </div>
        <ul className="mt-1.5 flex flex-col gap-1">
          {SIMS.map((s) => (
            <li key={s.field} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-md border border-line bg-elevated px-3 py-1.5">
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-ink">{s.field}</div>
                <div className="truncate text-[11.5px] text-ink-3">“{s.desc}”</div>
              </div>
              <span className={`rounded border px-1.5 py-0.5 text-[11px] font-medium ${s.cls}`}>{s.level}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11.5px] text-ink-3">
          Field descriptions answer “which official field has the closest meaning?”. Confirmed examples answer “which real past columns looked like this, and what were
          they confirmed as?”. Both results go to the scorer.
        </p>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[11.5px] font-medium text-ink-3">Step 2 · Model suggestion</div>
          <span className="text-[11px] text-ink-3">only if still unresolved</span>
        </div>
        <div className="mt-2 grid gap-1.5 text-[12px]">
          <div className="rounded-md border border-line bg-elevated px-3 py-2">
            <div className="text-[11px] text-ink-3">What the model receives</div>
            <div className="mt-0.5 font-mono text-ink-2">PTR · 145, 220, 88 · beside MRP, GST%, AV STK</div>
            <div className="mt-0.5 text-ink-2">
              Allowed answers: <span className="font-mono">mrp · offerPrice · purchasePrice · unknown</span>
            </div>
          </div>
          <div className="rounded-md border border-saffron/40 bg-saffron/8 px-3 py-2">
            <div className="text-[11px] text-ink-3">What it returns</div>
            <div className="mt-0.5 text-ink">
              Suggested: <span className="font-medium text-saffron">offerPrice</span> · reason: commonly the price to a retailer
            </div>
          </div>
        </div>
        <p className="mt-2 text-[11.5px] text-ink-3">The model proposes a candidate. It does not control the decision, and its own confidence is not ours.</p>
      </div>
    </div>
  );
}
