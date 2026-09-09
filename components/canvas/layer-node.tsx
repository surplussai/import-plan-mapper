"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  BarChart3,
  BookOpen,
  BookmarkCheck,
  Bot,
  CaseSensitive,
  FileSpreadsheet,
  Grid3x3,
  History,
  PackageCheck,
  Scale,
  ScanSearch,
  Sigma,
  SpellCheck,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { memo, type ReactNode } from "react";
import type { IconName, NodeContent } from "@/lib/content";
import type { LayerNodeType } from "@/lib/graph";

const ICONS: Record<IconName, LucideIcon> = {
  file: FileSpreadsheet,
  scan: ScanSearch,
  case: CaseSensitive,
  book: BookOpen,
  history: History,
  spell: SpellCheck,
  chart: BarChart3,
  sigma: Sigma,
  grid: Grid3x3,
  scale: Scale,
  zap: Zap,
  bot: Bot,
  user: UserCheck,
  bookmark: BookmarkCheck,
  package: PackageCheck,
};

function badgeClass(c: NodeContent): string {
  switch (c.kind) {
    case "input":
      return "bg-strong text-ink-2";
    case "layer":
      return "bg-indigo/10 text-indigo";
    case "engine":
      return "bg-strong text-ink";
    case "gate":
      return "bg-saffron/12 text-saffron";
    case "route":
      return c.tone === "auto" ? "bg-teal/12 text-teal" : c.tone === "assisted" ? "bg-saffron/12 text-saffron" : "bg-indigo/10 text-indigo";
    case "learning":
      return "bg-teal/12 text-teal";
    case "output":
      return "bg-ink text-white";
  }
}

const RING: Record<NodeContent["tone"], string> = {
  auto: "#0e8f82",
  assisted: "#b9740a",
  review: "#4f55e0",
  neutral: "#4f55e0",
};

/** Renders `**bold**` spans inside the summary sentence. */
export function richText(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function LayerNodeInner({ data }: NodeProps<LayerNodeType>) {
  const { content, selected, dim, lit } = data;
  const Icon = ICONS[content.icon];
  const ring = selected ? "#3b6cf6" : RING[content.tone];

  const style: React.CSSProperties = selected
    ? { borderColor: ring, boxShadow: `0 0 0 3px ${ring}22, 0 8px 24px rgba(20,23,31,.10)` }
    : lit
      ? { borderColor: ring, boxShadow: `0 0 0 3px ${ring}14, 0 4px 14px rgba(20,23,31,.06)` }
      : { boxShadow: "0 1px 2px rgba(20,23,31,.05), 0 6px 18px rgba(20,23,31,.05)" };

  return (
    <div
      className={`relative flex h-[144px] w-[244px] flex-col rounded-lg border bg-elevated px-4 pb-3 pt-3.5 transition-[opacity,box-shadow,border-color] duration-300 ${
        selected || lit ? "" : "border-line hover:border-ink-3/60"
      } ${dim ? "opacity-40" : "opacity-100"}`}
      style={style}
    >
      <Handle type="target" position={Position.Left} id="in" />
      <Handle type="target" position={Position.Top} id="in-top" />
      <Handle type="source" position={Position.Right} id="out" />
      <Handle type="source" position={Position.Bottom} id="out-bottom" />

      <div className="flex items-start gap-2.5">
        <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${badgeClass(content)}`}>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1 pt-[3px] font-display text-[15.5px] font-semibold leading-[1.15] text-ink">{content.title}</span>
      </div>
      <div className="mt-2 line-clamp-2 text-[12.5px] leading-[1.45] text-ink-2">{richText(content.summary)}</div>
      <span className="mt-auto self-end text-[11px] text-ink-3">{content.label}</span>
    </div>
  );
}

export const LayerNode = memo(LayerNodeInner);
