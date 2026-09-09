"use client";

import { motion } from "framer-motion";
import type { Scenario } from "@/lib/scenarios";

export function ScenarioTrace({ scenario }: { scenario: Scenario }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-line bg-canvas px-3 py-2 text-[12.5px]">
        <span className="text-ink-3">Column</span> <span className="font-mono text-ink">{scenario.column}</span>
      </div>
      <ol className="flex flex-col gap-1.5">
        {scenario.steps.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.35 + 0.1, duration: 0.3, ease: "easeOut" }}
            className="flex gap-2.5 rounded-md border border-line bg-elevated px-3 py-2 text-[13px] leading-snug text-ink"
          >
            <span className="mt-[1px] text-[11px] text-ink-3">{i + 1}</span>
            {s}
          </motion.li>
        ))}
      </ol>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: scenario.steps.length * 0.35 + 0.3, duration: 0.4 }}
        className="border-l-2 border-saffron pl-3 font-display text-[15px] font-semibold leading-snug text-ink"
      >
        {scenario.message}
      </motion.p>
    </div>
  );
}
