const FIRST = [
  ["Layer 2 alias", "+4 to Offer price"],
  ["Layer 5 profile", "+2 because values are prices"],
  ["Seller memory", "0 because first upload"],
  ["Gate result", "ask user because price field is new for this seller"],
  ["After commit", "store confirmed PTR to Offer price"],
];

const SECOND = [
  ["Layer 2 alias", "+4 to Offer price"],
  ["Layer 3 seller memory", "+4 from previous confirmation"],
  ["Layer 5 profile", "+2 because values are prices"],
  ["Gate result", "auto-map because score is high and no blockers"],
];

function Upload({ title, rows, result, tone }: { title: string; rows: string[][]; result: string; tone: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-canvas">
      <div className="border-b border-line bg-strong px-3 py-1.5 text-[12px] font-semibold text-ink">{title}</div>
      <dl className="divide-y divide-line bg-elevated">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-2 px-3 py-1.5 text-[12px]">
            <dt className="text-ink-3">{k}</dt>
            <dd className="text-ink-2">{v}</dd>
          </div>
        ))}
      </dl>
      <div className={`border-t border-line px-3 py-2 text-[12px] font-medium ${tone}`}>{result}</div>
    </div>
  );
}

export function TwoUploads() {
  return (
    <div className="grid gap-3">
      <div className="text-[11.5px] font-medium text-ink-3">Same seller, same PTR column</div>
      <Upload title="First upload" rows={FIRST} result="The user confirms. Memory is written only after commit." tone="text-indigo" />
      <Upload title="Second upload" rows={SECOND} result="PTR maps automatically because seller memory now supports it." tone="text-teal" />
    </div>
  );
}
