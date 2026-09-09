const FIELDS = ["Product name", "Quantity", "MRP", "Offer price", "GST"];
type S = "s" | "m" | "w";
const ROWS: [string, S[]][] = [
  ["PARTICULAR", ["s", "w", "w", "w", "w"]],
  ["AV STK", ["w", "s", "w", "w", "w"]],
  ["M.R.P.", ["w", "w", "s", "m", "w"]],
  ["PTR", ["w", "w", "m", "s", "w"]],
  ["GST%", ["w", "w", "w", "w", "s"]],
];
const CELL: Record<S, string> = {
  s: "bg-teal/15 text-teal",
  m: "bg-saffron/12 text-saffron",
  w: "bg-strong text-ink-3",
};
const LABEL: Record<S, string> = { s: "Strong", m: "Useful", w: "Weak" };

export function ScoreMatrix() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">The score matrix — one row per source column</div>
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
                {cells.map((c, i) => (
                  <td key={i} className={`rounded px-1 py-1.5 text-center font-medium ${CELL[c]}`}>
                    {LABEL[c]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] leading-snug text-ink-3">PTR scores useful for MRP too — the resolver settles that with the rest of the sheet.</p>
    </div>
  );
}
