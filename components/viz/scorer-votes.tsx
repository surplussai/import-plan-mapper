"use client";

import { motion } from "framer-motion";

const CANDIDATES = [
  {
    field: "Offer price",
    total: 9,
    tone: "text-teal",
    votes: [
      ["Layer 2 alias: PTR means Offer price", 4],
      ["Layer 5 profile: values look like prices", 2],
      ["Resolver clue: PTR is lower than MRP", 2],
      ["Layer 3 semantic history: similar past columns", 1],
    ],
  },
  {
    field: "Purchase price",
    total: 3,
    tone: "text-saffron",
    votes: [
      ["Layer 5 profile: values look like prices", 2],
      ["Layer 3 semantic history: weak similarity", 1],
    ],
  },
  {
    field: "MRP",
    total: -2,
    tone: "text-ink-3",
    votes: [
      ["Layer 5 profile: values look like prices", 2],
      ["Resolver clue: another column is clearly MRP", -4],
    ],
  },
] as const;

const maxScore = Math.max(...CANDIDATES.map((c) => Math.max(c.total, 0)));

export function ScorerVotes() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div>
        <div className="text-[11.5px] font-medium text-ink-3">Worked example</div>
        <div className="mt-1 font-mono text-[13px] font-semibold text-ink">PTR</div>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {CANDIDATES.map((c, i) => (
          <motion.div
            key={c.field}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.3 }}
            className="rounded-md border border-line bg-elevated px-3 py-2"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-ink">{c.field}</span>
              <span className={`font-mono text-[13px] font-semibold ${c.tone}`}>{c.total > 0 ? `+${c.total}` : c.total}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-strong">
              <div className={`h-full rounded-full ${c.total >= 8 ? "bg-teal" : c.total > 0 ? "bg-saffron" : "bg-[#b23b4b]"}`} style={{ width: `${c.total > 0 ? (c.total / maxScore) * 100 : 28}%` }} />
            </div>
            <ul className="mt-2 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-[11.5px]">
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

      <div className="mt-3 rounded-md border border-teal/30 bg-teal/8 px-3 py-2.5">
        <div className="text-[11.5px] font-medium text-teal">Result</div>
        <div className="mt-1 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-[12px]">
          <span className="text-ink-2">Winner</span>
          <span className="font-semibold text-ink">Offer price</span>
          <span className="text-ink-2">Score</span>
          <span className="font-mono font-semibold text-teal">+9</span>
          <span className="text-ink-2">Margin</span>
          <span className="font-mono font-semibold text-teal">+6</span>
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-ink-2">This is a strong candidate. The confidence gate still checks blockers before auto-mapping.</p>
      </div>
    </div>
  );
}
