export function QuestionView() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">What the user sees</div>
      <div className="mt-2 rounded-lg border border-line bg-elevated p-3.5 shadow-[0_2px_8px_rgba(20,23,31,.05)]">
        <div className="font-display text-[15px] font-semibold text-ink">
          What does <span className="font-mono">“PTR”</span> represent?
        </div>
        <div className="mt-2.5 grid gap-1.5 text-[12.5px]">
          <div className="flex justify-between gap-3">
            <span className="text-ink-3">Suggested</span>
            <span className="font-medium text-ink">Offer price</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-ink-3">Sample values</span>
            <span className="font-mono text-ink">₹145 · ₹220 · ₹88</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="shrink-0 text-ink-3">Why we suggested it</span>
            <span className="text-right text-ink-2">It contains price values and appears alongside MRP.</span>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-md bg-ink px-2.5 py-1 text-[12px] font-semibold text-white">Confirm Offer price</span>
          <span className="rounded-md border border-line px-2.5 py-1 text-[12px] font-medium text-ink-2">Choose another</span>
          <span className="rounded-md border border-line px-2.5 py-1 text-[12px] font-medium text-ink-2">Leave unmapped</span>
        </div>
      </div>
    </div>
  );
}
