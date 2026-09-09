function Bar({ label, v, max, tone }: { label: string; v: number; max: number; tone: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-2 text-[11.5px]">
      <span className="text-ink-2">{label}</span>
      <span className="h-1.5 rounded-full bg-strong">
        <span className={`block h-full rounded-full ${tone}`} style={{ width: `${(v / max) * 100}%` }} />
      </span>
      <span className="text-right font-mono text-ink-3">{v}</span>
    </div>
  );
}

export function ConfidenceExamples() {
  return (
    <div className="grid gap-2.5">
      <div className="rounded-lg border border-teal/30 bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[12.5px] font-semibold text-ink">Example A · clear winner</div>
          <span className="rounded border border-teal/40 bg-teal/10 px-1.5 py-0.5 text-[11px] font-medium text-teal">auto-map</span>
        </div>
        <div className="mt-2 grid gap-1">
          <Bar label="MRP" v={90} max={100} tone="bg-teal" />
          <Bar label="Offer price" v={30} max={100} tone="bg-line" />
          <Bar label="Purchase price" v={15} max={100} tone="bg-line" />
        </div>
        <p className="mt-2 text-[12px] text-ink-2">Exact alias, price-like values, no duplicate target, rules pass. Far ahead and well supported.</p>
      </div>

      <div className="rounded-lg border border-indigo/30 bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[12.5px] font-semibold text-ink">Example B · close competition</div>
          <span className="rounded border border-indigo/40 bg-indigo/10 px-1.5 py-0.5 text-[11px] font-medium text-indigo">ask the user</span>
        </div>
        <div className="mt-2 grid gap-1">
          <Bar label="Offer price" v={78} max={100} tone="bg-indigo" />
          <Bar label="Purchase price" v={75} max={100} tone="bg-line" />
          <Bar label="MRP" v={40} max={100} tone="bg-line" />
        </div>
        <p className="mt-2 text-[12px] text-ink-2">Offer price is technically winning — by three points. The winner is not clear enough.</p>
      </div>

      <div className="rounded-lg border border-saffron/30 bg-canvas p-3.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[12.5px] font-semibold text-ink">Example C · high score, thin evidence</div>
          <span className="rounded border border-saffron/40 bg-saffron/10 px-1.5 py-0.5 text-[11px] font-medium text-saffron">confirm first</span>
        </div>
        <div className="mt-2 grid gap-1">
          <Bar label="Offer price" v={85} max={100} tone="bg-saffron" />
        </div>
        <p className="mt-2 text-[12px] text-ink-2">
          All the support came from the embedding and the model. No alias, no memory, no strong value match. The number looks high; the evidence is not reliable enough.
        </p>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="text-[12.5px] font-semibold text-ink">A hard rule fails</div>
        <p className="mt-1 text-[12px] text-ink-2">
          Suggested field <span className="font-mono">expiryDate</span>, values <span className="font-mono">₹100 · ₹150 · ₹230</span>. That is a datatype contradiction. Even if the model insists, this
          cannot auto-map.
        </p>
      </div>
    </div>
  );
}
