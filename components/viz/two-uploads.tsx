const FIRST = [
  ["Alias", "PTR may mean Offer price"],
  ["Values", "definitely prices, lower than MRP"],
  ["Seller memory", "none — first time"],
  ["Meaning + model", "both point to Offer price"],
  ["Scorer", "Offer price wins"],
  ["Gate", "clear winner, but no memory and a price field → ask"],
];
const SECOND = [
  ["Alias", "supports Offer price"],
  ["Values", "valid prices, compatible with MRP"],
  ["Seller memory", "confirmed last time"],
  ["Scorer", "Offer price wins"],
  ["Gate", "strong winner, confirmed history, no conflicts → auto-map"],
];

function Upload({ title, rows, result, tone }: { title: string; rows: string[][]; result: string; tone: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="border-b border-line bg-strong px-3 py-1.5 text-[12px] font-semibold text-ink">{title}</div>
      <dl className="divide-y divide-line bg-elevated">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[6rem_1fr] gap-2 px-3 py-1.5 text-[12px]">
            <dt className="text-ink-3">{k}</dt>
            <dd className="text-ink-2">{v}</dd>
          </div>
        ))}
      </dl>
      <div className={`border-t border-line px-3 py-1.5 text-[12px] font-medium ${tone}`}>{result}</div>
    </div>
  );
}

export function TwoUploads() {
  return (
    <div className="grid gap-2.5">
      <div className="text-[11.5px] font-medium text-ink-3">The complete loop — ABC Distributors sends PARTICULAR · MRP · PTR · AV STK</div>
      <Upload title="First upload" rows={FIRST} result="Suggested Offer price; the user confirms. Stored in this import’s record and in seller memory." tone="text-indigo" />
      <Upload title="Second upload" rows={SECOND} result="PTR → Offer price mapped automatically. No question asked." tone="text-teal" />
    </div>
  );
}
