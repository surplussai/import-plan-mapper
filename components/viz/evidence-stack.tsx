"use client";

import { motion } from "framer-motion";

const SIGNALS = [
  { signal: "Price-like", check: "145, 220, 88", supports: "Offer price or MRP", score: "+2", tone: "text-teal" },
  { signal: "Percentage-like", check: "5, 12, 18", supports: "GST rate", score: "+2", tone: "text-teal" },
  { signal: "Identifier-like", check: "8901030895484", supports: "EAN or SKU", score: "+2", tone: "text-teal" },
  { signal: "Wrong type", check: "₹145 for Expiry date", supports: "Block candidate", score: "-4", tone: "text-[#b23b4b]" },
];

export function EvidenceStack() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">Layer 5 output</div>
      <div className="mt-1 text-[12.5px] font-semibold text-ink">Value profile becomes evidence</div>

      <div className="mt-3 grid gap-2">
        {SIGNALS.map((s, i) => (
          <motion.div
            key={s.signal}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.28 }}
            className="rounded-md border border-line bg-elevated px-3 py-2"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[12.5px] font-semibold text-ink">{s.signal}</span>
              <span className={`font-mono text-[12px] font-semibold ${s.tone}`}>{s.score}</span>
            </div>
            <div className="mt-1 grid grid-cols-[5.25rem_1fr] gap-x-2 gap-y-1 text-[11.5px]">
              <span className="text-ink-3">Example</span>
              <span className="font-mono text-ink-2">{s.check}</span>
              <span className="text-ink-3">Meaning</span>
              <span className="text-ink-2">{s.supports}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-line bg-elevated px-3 py-2 text-[11.5px] leading-snug text-ink-2">
        Layer 5 does not choose the final field. It only tells the scorer whether the values support or contradict each candidate.
      </div>
    </div>
  );
}
