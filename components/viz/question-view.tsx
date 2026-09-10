export function QuestionView() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">What the user sees</div>
      <div className="mt-2 rounded-lg border border-line bg-elevated p-3.5 shadow-[0_2px_8px_rgba(20,23,31,.05)]">
        <div className="font-display text-[15px] font-semibold text-ink">
          What does <span className="font-mono">“PTR”</span> represent?
        </div>
        <div className="mt-3 grid gap-1.5 rounded-md border border-line bg-canvas px-3 py-2 text-[12px]">
          <div className="grid grid-cols-[6rem_1fr] gap-2">
            <span className="text-ink-3">Suggested</span>
            <span className="font-medium text-ink">Offer price</span>
          </div>
          <div className="grid grid-cols-[6rem_1fr] gap-2">
            <span className="text-ink-3">Score</span>
            <span className="font-mono font-semibold text-teal">+9, margin +6</span>
          </div>
          <div className="grid grid-cols-[6rem_1fr] gap-2">
            <span className="text-ink-3">Samples</span>
            <span className="font-mono text-ink">₹145 · ₹220 · ₹88</span>
          </div>
          <div className="grid grid-cols-[6rem_1fr] gap-2">
            <span className="text-ink-3">Reason</span>
            <span className="text-ink-2">Alias, price values and MRP relationship agree.</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-ink px-2.5 py-1 text-[12px] font-semibold text-white">Confirm Offer price</span>
          <span className="rounded-md border border-line px-2.5 py-1 text-[12px] font-medium text-ink-2">Choose another</span>
          <span className="rounded-md border border-line px-2.5 py-1 text-[12px] font-medium text-ink-2">Leave unmapped</span>
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-ink-3">The answer is stored only if the import is completed.</p>
      </div>
    </div>
  );
}
