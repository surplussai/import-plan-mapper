"use client";

import { motion } from "framer-motion";

const ROUTES = [
  { dot: "bg-teal", text: "text-teal", when: "Strong agreement", action: "Map automatically", hint: "M.R.P. → MRP" },
  { dot: "bg-saffron", text: "text-saffron", when: "Useful but incomplete evidence", action: "Ask AI for a constrained suggestion", hint: "then back through the gate" },
  { dot: "border-[1.5px] border-indigo bg-transparent", text: "text-indigo", when: "Conflicting or weak evidence", action: "Ask the user one clear question", hint: "the import continues meanwhile" },
];

export function GateRoutes() {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3.5">
      <div className="text-[11.5px] font-medium text-ink-3">Three possible routes</div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {ROUTES.map((r, i) => (
          <motion.li
            key={r.action}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
            className="grid grid-cols-[10px_1fr] items-start gap-2.5 rounded-md border border-line bg-elevated px-3 py-2"
          >
            <span className={`mt-[6px] h-2.5 w-2.5 rounded-full ${r.dot}`} />
            <div className="text-[13px] leading-snug">
              <span className="text-ink-2">{r.when}</span>
              <span className="mx-1.5 text-ink-3">→</span>
              <span className={`font-medium ${r.text}`}>{r.action}</span>
              <div className="text-[11.5px] text-ink-3">{r.hint}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
