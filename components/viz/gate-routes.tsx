"use client";

import { motion } from "framer-motion";

const ROUTES = [
  { dot: "bg-teal", text: "text-teal", when: "High score, clear margin, no Layer 5 or resolver blocker", action: "Map automatically", hint: "show it in preview" },
  { dot: "bg-saffron", text: "text-saffron", when: "Meaning is unclear but recoverable", action: "Ask AI for one more clue", hint: "send result back to scorer" },
  { dot: "border-[1.5px] border-indigo bg-transparent", text: "text-indigo", when: "Close scores, risky field or validation blocker", action: "Ask the user", hint: "one focused question" },
];

export function GateRoutes() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">Route decision</div>
      <ul className="mt-2.5 flex flex-col gap-2">
        {ROUTES.map((r, i) => (
          <motion.li
            key={r.action}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
            className="grid grid-cols-[10px_1fr] items-start gap-2.5 rounded-md border border-line bg-elevated px-3 py-2.5"
          >
            <span className={`mt-[6px] h-2.5 w-2.5 rounded-full ${r.dot}`} />
            <div className="text-[13px] leading-snug">
              <div className="text-ink-2">{r.when}</div>
              <div className={`mt-0.5 font-medium ${r.text}`}>{r.action}</div>
              <div className="text-[11.5px] text-ink-3">{r.hint}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
