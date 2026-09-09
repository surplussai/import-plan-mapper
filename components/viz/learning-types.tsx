import { ArrowDown } from "lucide-react";

const FLOW = ["User confirmations", "Confirmed dataset", "Periodic offline testing", "Adjusted, versioned weights", "New scorer version deployed"];

export function LearningTypes() {
  return (
    <div className="grid gap-2.5">
      <div className="rounded-lg border border-teal/30 bg-canvas p-3.5">
        <div className="text-[12.5px] font-semibold text-ink">1 · Seller memory</div>
        <p className="mt-1 text-[12px] leading-snug text-ink-2">
          Remembers a specific confirmed answer: <span className="font-mono">ABC Distributors · PTR → Offer price</span>. On their next upload that mapping arrives
          with strong evidence. This is not machine learning — it is a trusted lookup: have we seen this header from this seller, and what did the person confirm?
        </p>
        <div className="mt-1.5 text-[11.5px] text-ink-3">Scope: one seller, one header</div>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="text-[12.5px] font-semibold text-ink">2 · Offline-calibrated weights</div>
        <p className="mt-1 text-[12px] leading-snug text-ink-2">
          Learns which witnesses are generally reliable. After, say, a thousand confirmed mappings we can test: seller memory was right 97% of the time, exact
          aliases 94%, model suggestions 74%, fuzzy matching 72%, embeddings 68%. Then the weights are adjusted — for the whole engine, not for one seller.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {FLOW.map((f, i) => (
            <span key={f} className="flex items-center gap-1">
              <span className="rounded border border-line bg-elevated px-2 py-0.5 text-[11px] text-ink-2">{f}</span>
              {i < FLOW.length - 1 && <ArrowDown className="h-3 w-3 -rotate-90 text-ink-3" />}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] text-ink-3">Never after a single upload — one confirmation must not change how the whole engine weighs evidence.</p>
      </div>
    </div>
  );
}
