const ROWS: [string, string, string][] = [
  ["Known aliases", "Have we explicitly seen this name before?", "“I think yes.”"],
  ["Seller history", "Has this seller confirmed it before?", "“No information.”"],
  ["Global history", "What has this header usually meant elsewhere?", "“Usually Offer price.”"],
  ["Fuzzy matching", "Is the spelling similar to a known name?", "“Close enough.”"],
  ["Value profiling", "What kind of data is inside the column?", "“Definitely a price.”"],
  ["Meaning (embedding)", "Is the overall meaning similar?", "“Looks related.”"],
  ["Model suggestion", "Given the context, what is most likely?", "“Offer price.”"],
  ["Business rule", "Does the mapping make sense?", "“Lower than MRP — possible.”"],
];

export function Witnesses() {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="grid grid-cols-[1fr_1.3fr_1fr] gap-2 border-b border-line bg-strong px-3 py-1.5 text-[11px] font-medium text-ink-2">
        <span>Witness</span>
        <span>The question it answers</span>
        <span>On “PTR → Offer price”</span>
      </div>
      <div className="divide-y divide-line bg-elevated">
        {ROWS.map(([w, q, a]) => (
          <div key={w} className="grid grid-cols-[1fr_1.3fr_1fr] gap-2 px-3 py-1.5 text-[12px]">
            <span className="font-medium text-ink">{w}</span>
            <span className="text-ink-2">{q}</span>
            <span className="text-ink-3">{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
