const CASES = [
  {
    title: "Case A",
    label: "auto-map",
    tone: "teal",
    rows: [
      ["Winner", "MRP"],
      ["Score", "+10"],
      ["Margin", "+8"],
      ["Blockers", "none from Layer 5, resolver or validation"],
    ],
    result: "Exact alias, valid prices, no duplicate field. Safe to map automatically.",
  },
  {
    title: "Case B",
    label: "ask user",
    tone: "indigo",
    rows: [
      ["Winner", "Offer price"],
      ["Score", "+8"],
      ["Margin", "+1"],
      ["Blockers", "none, but scorer margin is too close"],
    ],
    result: "The score is useful, but Purchase price is too close. Ask one question.",
  },
  {
    title: "Case C",
    label: "do not auto-map",
    tone: "saffron",
    rows: [
      ["Winner", "Expiry date"],
      ["Score", "+7"],
      ["Margin", "+4"],
      ["Blockers", "Layer 5 says wrong datatype"],
    ],
    result: "Values are prices, not dates. Layer 5 creates the blocker, so the gate refuses auto-map.",
  },
] as const;

const TONE = {
  teal: {
    border: "border-teal/30",
    badge: "border-teal/40 bg-teal/10 text-teal",
    text: "text-teal",
  },
  indigo: {
    border: "border-indigo/30",
    badge: "border-indigo/40 bg-indigo/10 text-indigo",
    text: "text-indigo",
  },
  saffron: {
    border: "border-saffron/30",
    badge: "border-saffron/40 bg-saffron/10 text-saffron",
    text: "text-saffron",
  },
} as const;

export function ConfidenceExamples() {
  return (
    <div className="grid gap-3">
      {CASES.map((c) => {
        const tone = TONE[c.tone];
        return (
          <div key={c.title} className={`rounded-lg border ${tone.border} bg-canvas p-3.5`}>
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-[12.5px] font-semibold text-ink">{c.title}</div>
              <span className={`rounded border px-1.5 py-0.5 text-[11px] font-medium ${tone.badge}`}>{c.label}</span>
            </div>
            <div className="mt-2 grid gap-1.5 rounded-md border border-line bg-elevated px-3 py-2 text-[12px]">
              {c.rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5rem_1fr] gap-2">
                  <span className="text-ink-3">{k}</span>
                  <span className={`font-medium ${k === "Blockers" && !v.startsWith("none") ? "text-[#b23b4b]" : k === "Score" || k === "Margin" ? tone.text : "text-ink"}`}>{v}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[12px] leading-snug text-ink-2">{c.result}</p>
          </div>
        );
      })}
    </div>
  );
}
