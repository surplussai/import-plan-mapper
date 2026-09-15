"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { DETAILS, GATE_QUOTE, NODE_BY_ID, progressLabel, type NodeId, type Section } from "@/lib/content";
import type { Scenario } from "@/lib/scenarios";
import { richText } from "./canvas/layer-node";
import { EvidenceStack } from "./viz/evidence-stack";
import { ScoreMatrix } from "./viz/score-matrix";
import { ResolverView } from "./viz/resolver-view";
import { GateRoutes } from "./viz/gate-routes";
import { AiRoute } from "./viz/ai-route";
import { StorageView } from "./viz/storage-view";
import { OutputTable } from "./viz/output-table";
import { QuestionView } from "./viz/question-view";
import { ScenarioTrace } from "./viz/scenario-trace";
import { Witnesses } from "./viz/witnesses";
import { ScorerVotes } from "./viz/scorer-votes";
import { ConfidenceExamples } from "./viz/confidence-examples";
import { EmbeddingView } from "./viz/embedding-view";
import { LearningTypes } from "./viz/learning-types";
import { TwoUploads } from "./viz/two-uploads";
import { HistoryView } from "./viz/history-view";
import { EvidenceRouter } from "./viz/evidence-router";

interface Props {
  selected: NodeId | null;
  scenario: Scenario | null;
  index: number;
  last: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Viz({ name }: { name: Extract<Section, { kind: "viz" }>["name"] }) {
  switch (name) {
    case "evidence":
      return <EvidenceStack />;
    case "matrix":
      return <ScoreMatrix />;
    case "resolver":
      return <ResolverView />;
    case "gate":
      return <GateRoutes />;
    case "ai":
      return <AiRoute />;
    case "storage":
      return <StorageView />;
    case "output":
      return <OutputTable />;
    case "question":
      return <QuestionView />;
    case "witnesses":
      return <Witnesses />;
    case "votes":
      return <ScorerVotes />;
    case "confidence":
      return <ConfidenceExamples />;
    case "embedding":
      return <EmbeddingView />;
    case "learning":
      return <LearningTypes />;
    case "uploads":
      return <TwoUploads />;
    case "history":
      return <HistoryView />;
    case "router":
      return <EvidenceRouter />;
  }
}

export function SectionBlock({ s }: { s: Section }) {
  switch (s.kind) {
    case "text":
      return <p className="text-[13.5px] leading-relaxed text-ink-2">{richText(s.text)}</p>;
    case "example":
      return (
        <div className="overflow-hidden rounded-lg border border-line">
          <div className="border-b border-line bg-strong px-3 py-1.5 text-[11.5px] font-medium text-ink-2">{s.title}</div>
          <dl className="divide-y divide-line bg-elevated">
            {s.rows.map(([k, v]) => (
              <div key={k + v} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-3 px-3 py-1.5 text-[12.5px]">
                <dt className="font-mono text-ink-2">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "list":
      return (
        <div>
          <div className="text-[11.5px] font-medium text-ink-3">{s.title}</div>
          <ul className="mt-1.5 flex flex-col gap-1">
            {s.items.map((it) => (
              <li key={it} className="flex gap-2 text-[13px] leading-snug text-ink-2">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-3" />
                <span>{richText(it)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "why":
      return (
        <div className="border-l-2 border-saffron pl-3">
          <div className="text-[11.5px] font-medium text-ink-3">Why it matters</div>
          <p className="mt-0.5 text-[13.5px] leading-snug text-ink">{s.text}</p>
        </div>
      );
    case "grows":
      return (
        <div className="rounded-lg border border-teal/30 bg-teal/8 px-3 py-2.5">
          <div className="text-[11.5px] font-medium text-teal">Gets stronger with every import</div>
          <p className="mt-0.5 text-[12.5px] leading-snug text-ink-2">{s.text}</p>
        </div>
      );
    case "note":
      return <p className="text-[12.5px] leading-snug text-ink-3">{s.text}</p>;
    case "viz":
      return <Viz name={s.name} />;
  }
}

function NodeBody({ id }: { id: NodeId }) {
  const d = DETAILS[id];
  return (
    <div className="flex flex-col gap-4">
      {d.heading && <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">{d.heading}</h3>}
      {d.sections.map((s, i) => (
        <SectionBlock key={i} s={s} />
      ))}
      {id === "gate" && <p className="font-display text-[15px] font-semibold leading-snug text-ink">{GATE_QUOTE}</p>}
    </div>
  );
}

export function DetailPanel({ selected, scenario, index, last, onClose, onPrev, onNext }: Props) {
  const open = selected !== null || scenario !== null;
  const node = selected ? NODE_BY_ID[selected] : null;
  const contentKey = selected ?? (scenario ? `s-${scenario.id}` : "none");

  return (
    <aside className={`shrink-0 overflow-hidden border-l border-line bg-elevated ${open ? "w-[400px] xl:w-[420px]" : "w-0 border-l-0"}`} aria-live="polite">
      {open && (
        <motion.div
          key={open ? "open" : "closed"}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex h-full w-[400px] flex-col xl:w-[420px]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
            <div className="min-w-0">
              <div className="text-[12px] text-ink-3">{node ? `${progressLabel(node.id)} · ${node.label}` : "Scenario"}</div>
              <h2 className="mt-0.5 font-display text-[19px] font-semibold leading-tight text-ink">{node ? node.title : scenario?.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-3 hover:bg-strong hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <motion.div key={contentKey} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: "easeOut" }}>
              {selected ? <NodeBody id={selected} /> : scenario ? <ScenarioTrace scenario={scenario} /> : null}
            </motion.div>
          </div>

          {selected && (
            <div className="flex items-center justify-between gap-2 border-t border-line px-4 py-3">
              <button
                type="button"
                onClick={onPrev}
                disabled={index <= 0}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-elevated px-3 text-[13px] font-medium text-ink-2 transition hover:border-ink-3 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={index >= last}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-3 text-[13px] font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </aside>
  );
}
