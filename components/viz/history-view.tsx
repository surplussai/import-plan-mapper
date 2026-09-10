const MEMORY = [
  {
    name: "Seller/template",
    score: "+4",
    when: "after Layer 1",
    uses: "same seller or same template confirmed this header",
    example: "ABC · PTR → Offer price · 4 confirmed",
    tone: "text-teal",
  },
  {
    name: "Global",
    score: "+2",
    when: "after Layer 1",
    uses: "many suppliers confirmed the same header",
    example: "ptr → Offer price in 82 of 91 imports",
    tone: "text-saffron",
  },
  {
    name: "Semantic",
    score: "+1",
    when: "after Layer 5",
    uses: "similar confirmed columns found by embedding search",
    example: "Dealer Price, Retailer Rate, Trade Price",
    tone: "text-indigo",
  },
];

const FLOW = [
  ["Layer 1", "normalize header"],
  ["Exact memory", "seller and global lookup"],
  ["Layer 5", "add value shape"],
  ["Semantic memory", "embedding search"],
  ["Scorer", "add points"],
];

export function HistoryView() {
  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="text-[11.5px] font-medium text-ink-3">Memory scorecard</div>
        <div className="mt-2 grid gap-2">
          {MEMORY.map((m) => (
            <div key={m.name} className="rounded-md border border-line bg-elevated px-3 py-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-2">
                <span className="text-[12.5px] font-semibold text-ink">{m.name}</span>
                <span className={`font-mono text-[12px] font-semibold ${m.tone}`}>{m.score}</span>
              </div>
              <div className="mt-1 grid grid-cols-[4.75rem_1fr] gap-x-2 gap-y-1 text-[11.5px] leading-snug">
                <span className="text-ink-3">When</span>
                <span className="text-ink-2">{m.when}</span>
                <span className="text-ink-3">Uses</span>
                <span className="text-ink-2">{m.uses}</span>
                <span className="text-ink-3">Example</span>
                <span className="font-mono text-ink-2">{m.example}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-line bg-canvas p-3.5">
        <div className="text-[11.5px] font-medium text-ink-3">Where it fits</div>
        <div className="mt-2 grid gap-1.5">
          {FLOW.map(([step, text], i) => (
            <div key={step} className="grid grid-cols-[1.75rem_5.5rem_1fr] items-center gap-2 rounded-md border border-line bg-elevated px-2.5 py-1.5 text-[11.5px]">
              <span className="font-mono text-ink-3">{i + 1}</span>
              <span className="font-medium text-ink">{step}</span>
              <span className="text-ink-2">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-teal/30 bg-teal/8 px-3 py-2.5">
        <div className="text-[11.5px] font-medium text-teal">Simple explanation</div>
        <p className="mt-1 text-[12px] leading-snug text-ink-2">Exact memory remembers headers. Semantic memory remembers meaning. Both become scorer evidence, not final decisions.</p>
      </div>
    </div>
  );
}
