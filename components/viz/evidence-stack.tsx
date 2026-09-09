"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const CLUES = [
  { text: "Header says “Rate”", chip: "Header meaning" },
  { text: "Values look like currency", chip: "Values underneath" },
  { text: "Nearby column is “MRP”", chip: "Nearby columns" },
];
const STATES = ["Weak", "Useful", "Strong"] as const;
const STEP = 0.75;

export function EvidenceStack() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">How the clues work together</div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {CLUES.map((c, i) => (
          <motion.span
            key={c.chip}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * STEP + 0.2, duration: 0.3 }}
            className="rounded-full border border-teal/30 bg-teal/10 px-2.5 py-0.5 text-[11.5px] text-teal"
          >
            {c.chip}
          </motion.span>
        ))}
      </div>

      <ol className="mt-3 flex flex-col gap-1.5">
        {CLUES.map((c, i) => (
          <motion.li
            key={c.text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * STEP + 0.2, duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-2.5 rounded-md border border-line bg-elevated px-3 py-2 text-[13px] text-ink"
          >
            <span className="text-[11px] text-ink-3">{i + 1}</span>
            {c.text}
          </motion.li>
        ))}
      </ol>

      <div className="mt-3 flex items-center gap-2 text-[11.5px] font-medium text-ink-3">
        <ArrowDown className="h-3.5 w-3.5" />
        Combined confidence
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {STATES.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * STEP + 0.45, duration: 0.3 }}
            className={`rounded-md border px-2 py-1.5 text-center text-[12px] font-medium ${
              i === 2 ? "border-teal/50 bg-teal/12 text-teal" : i === 1 ? "border-saffron/40 bg-saffron/10 text-saffron" : "border-line bg-strong text-ink-3"
            }`}
          >
            {s}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 * STEP + 0.3, duration: 0.35 }}
        className="mt-3 rounded-md border border-teal/30 bg-teal/10 px-3 py-2 text-[13px] font-medium text-ink"
      >
        Likely meaning: <span className="text-teal">Trade price</span>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 * STEP + 0.7, duration: 0.4 }} className="mt-2 text-[12.5px] text-ink-2">
        The decision becomes stronger because the clues agree.
      </motion.p>
    </div>
  );
}
