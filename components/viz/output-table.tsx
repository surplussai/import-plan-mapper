const ROWS: [string, string, string][] = [
  ["PARTICULAR", "Product name", "productName"],
  ["AV STK", "Available quantity", "availableQuantity"],
  ["M.R.P.", "MRP", "mrp"],
  ["PTR", "Offer price", "offerPrice"],
  ["GST%", "GST rate", "gstRate"],
];

export function OutputTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-2 border-b border-line bg-strong px-3 py-1.5 text-[11px] font-medium text-ink-2">
        <span>Supplier header</span>
        <span>Surpluss field</span>
        <span>Stored as</span>
      </div>
      <div className="divide-y divide-line bg-elevated">
        {ROWS.map(([a, b, c]) => (
          <div key={a} className="grid grid-cols-[1fr_1.2fr_1fr] gap-2 px-3 py-1.5 text-[12.5px]">
            <span className="font-mono text-ink-2">{a}</span>
            <span className="font-medium text-ink">{b}</span>
            <span className="font-mono text-ink-3">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
