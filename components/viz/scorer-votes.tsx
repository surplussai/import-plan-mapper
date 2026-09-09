"use client";

import { motion } from "framer-motion";

const CANDIDATES = [
  {
    field: "Offer price",
    total: 10,
    tone: "text-teal",
    votes: [
      ["Known alias", 4],
      ["Seller memory", 0],
      ["Values look like a price", 2],
      ["Lower than MRP", 2],
      ["Meaning similarity", 1],
      ["Model suggestion", 1],
    ],
  },
  {
    field: "Purchase price",
    total: 3,
    tone: "text-saffron",
    votes: [
      ["Known alias", 0],
      ["Values look like a price", 2],
      ["Meaning similarity", 1],
    ],
  },
  {
    field: "MRP",
    total: -3,
    tone: "text-ink-3",
    votes: [
      ["Values look like a price", 2],
      ["Another column is already MRP", -5],
    ],
  },
] as const;

export function ScorerVotes() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">Weighted votes for “PTR” — illustrative, not real units</div>
      <div className="mt-2.5 flex flex-col gap-2">
        {CANDIDATES.map((c, i) => (
          <motion.div
            key={c.field}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.3 }}
            className="rounded-md border border-line bg-elevated px-3 py-2"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-ink">PTR → {c.field}</span>
              <span className={`font-mono text-[13px] font-semibold ${c.tone}`}>{c.total > 0 ? `+${c.total}` : c.total}</span>
            </div>
            <ul className="mt-1 grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 text-[11.5px]">
              {c.votes.map(([name, v]) => (
                <li key={name} className="contents">
                  <span className="text-ink-2">{name}</span>
                  <span className={`font-mono ${v > 0 ? "text-teal" : v < 0 ? "text-[#b23b4b]" : "text-ink-3"}`}>{v > 0 ? `+${v}` : v}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-[12px] text-ink-3">Ranked: Offer price, then Purchase price, then MRP.</p>
    </div>
  );
}
