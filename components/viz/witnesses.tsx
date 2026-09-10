const ROWS: [string, string, string][] = [
  ["+4", "Trusted proof", "seller/template history, exact alias"],
  ["+2", "Supporting evidence", "value profile, global history, field relation"],
  ["+1", "Weak clue", "fuzzy match, semantic history, model suggestion"],
  ["-2", "Suspicious", "low agreement, weak conflict, missing support"],
  ["-4", "Blocker", "wrong datatype, duplicate field, broken rule"],
];

export function Witnesses() {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="grid grid-cols-[3.5rem_1fr_1.4fr] gap-2 border-b border-line bg-strong px-3 py-1.5 text-[11px] font-medium text-ink-2">
        <span>Score</span>
        <span>Meaning</span>
        <span>Used for</span>
      </div>
      <div className="divide-y divide-line bg-elevated">
        {ROWS.map(([score, q, a]) => (
          <div key={score} className="grid grid-cols-[3.5rem_1fr_1.4fr] gap-2 px-3 py-1.5 text-[12px]">
            <span className={`font-mono font-semibold ${score.startsWith("-") ? "text-[#b23b4b]" : "text-teal"}`}>{score}</span>
            <span className="text-ink-2">{q}</span>
            <span className="text-ink-3">{a}</span>
          </div>
        ))}
      </div>
      <p className="border-t border-line bg-canvas px-3 py-2 text-[11.5px] leading-snug text-ink-3">
        The score is evidence strength, not AI confidence. The scorer adds points per candidate, then compares totals and margin.
      </p>
    </div>
  );
}
