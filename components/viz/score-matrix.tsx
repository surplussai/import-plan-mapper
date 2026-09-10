const FIELDS = ["Product name", "Quantity", "MRP", "Offer price", "GST"];
const ROWS: [string, number[]][] = [
  ["PARTICULAR", [8, 0, 0, 0, 0]],
  ["AV STK", [0, 10, 0, 0, 0]],
  ["M.R.P.", [0, 0, 10, 2, 0]],
  ["PTR", [0, 0, -2, 9, 3]],
  ["GST%", [0, 0, 0, 0, 10]],
];

function cellTone(score: number) {
  if (score >= 8) return "bg-teal/15 text-teal";
  if (score >= 3) return "bg-saffron/12 text-saffron";
  if (score < 0) return "bg-[#b23b4b]/10 text-[#b23b4b]";
  return "bg-strong text-ink-3";
}

export function ScoreMatrix() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">Score matrix after evidence is added</div>
      <div className="mt-2.5 overflow-x-auto">
        <table className="w-full border-separate border-spacing-1 text-[11px]">
          <thead>
            <tr>
              <th className="text-left font-medium text-ink-3"></th>
              {FIELDS.map((f) => (
                <th key={f} className="px-1 pb-1 text-center font-medium leading-tight text-ink-2">
                  {f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([src, cells]) => (
              <tr key={src}>
                <th className="pr-1 text-left font-mono font-normal text-ink-2">{src}</th>
                {cells.map((score, i) => (
                  <td key={i} className={`rounded px-1 py-1.5 text-center font-mono font-semibold ${cellTone(score)}`}>
                    {score > 0 ? `+${score}` : score}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] leading-snug text-ink-3">The best cell in each row is the current winner. The resolver still checks duplicate fields and cross-column rules before the gate decides.</p>
    </div>
  );
}
