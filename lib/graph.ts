import type { Edge, Node } from "@xyflow/react";
import { NODES, type NodeContent, type NodeId, type Tone } from "./content";

export const NODE_W = 244;
export const NODE_H = 144;
const COL = 278;
const ROW = 226;
const ROUTE_GAP = 176;

const POS: Record<NodeId, { x: number; y: number }> = {
  input: { x: 0, y: 0 },
  l0: { x: COL, y: 0 },
  l1: { x: COL * 2, y: 0 },
  l2: { x: COL * 3, y: 0 },
  l3: { x: COL * 4, y: 0 },
  l4: { x: COL * 5, y: 0 },
  l5: { x: COL * 6, y: 0 },
  scorer: { x: 0, y: ROW },
  resolver: { x: COL, y: ROW },
  gate: { x: COL * 2, y: ROW },
  auto: { x: COL * 3, y: ROW },
  ai: { x: COL * 3, y: ROW + ROUTE_GAP },
  user: { x: COL * 3, y: ROW + ROUTE_GAP * 2 },
  remember: { x: COL * 4, y: ROW },
  output: { x: COL * 5, y: ROW },
};

export interface RegionData extends Record<string, unknown> {
  label: string;
  width: number;
  height: number;
}

export interface LayerData extends Record<string, unknown> {
  content: NodeContent;
  selected: boolean;
  dim: boolean;
  lit: boolean;
}

export type RegionNodeType = Node<RegionData, "region">;
export type LayerNodeType = Node<LayerData, "layer">;
export type FlowNode = RegionNodeType | LayerNodeType;

export interface JourneyEdgeData extends Record<string, unknown> {
  tone: Tone;
  state: "idle" | "active" | "muted";
  dashed?: boolean;
  label?: string;
}
export type JourneyEdgeType = Edge<JourneyEdgeData, "journey">;

const PAD = 16;
const LABEL_H = 32;

interface RegionSpec {
  id: string;
  label: string;
  from: NodeId;
  to: NodeId;
}

const REGIONS: RegionSpec[] = [
  { id: "r-prepare", label: "Prepare", from: "input", to: "l0" },
  { id: "r-collect", label: "Collect evidence", from: "l1", to: "l5" },
  { id: "r-decide", label: "Decide", from: "scorer", to: "gate" },
  { id: "r-routes", label: "", from: "auto", to: "user" },
  { id: "r-improve", label: "Improve", from: "remember", to: "output" },
];

export function regionNodes(): RegionNodeType[] {
  return REGIONS.map((r) => {
    const a = POS[r.from];
    const b = POS[r.to];
    const x0 = Math.min(a.x, b.x) - PAD;
    const x1 = Math.max(a.x, b.x) + NODE_W + PAD;
    const y0 = Math.min(a.y, b.y) - (r.label ? LABEL_H : PAD);
    const y1 = Math.max(a.y, b.y) + NODE_H + PAD;
    return {
      id: r.id,
      type: "region",
      position: { x: x0, y: y0 },
      data: { label: r.label, width: x1 - x0, height: y1 - y0 },
      draggable: false,
      selectable: false,
      focusable: false,
      zIndex: -1,
    };
  });
}

export function layerNodes(selected: NodeId | null, journey: Set<NodeId>, lit: Set<NodeId>, dimming: boolean): LayerNodeType[] {
  return NODES.map((c) => ({
    id: c.id,
    type: "layer",
    position: POS[c.id],
    data: {
      content: c,
      selected: selected === c.id,
      dim: dimming && !journey.has(c.id) && !lit.has(c.id),
      lit: lit.has(c.id),
    },
    draggable: false,
    width: NODE_W,
    height: NODE_H,
  }));
}

interface EdgeSpec {
  id: string;
  source: NodeId;
  target: NodeId;
  tone: Tone;
  sourceHandle: "out" | "out-bottom";
  targetHandle: "in" | "in-top";
  dashed?: boolean;
  label?: string;
}

export const EDGE_SPECS: EdgeSpec[] = [
  { id: "e-input-l0", source: "input", target: "l0", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-l0-l1", source: "l0", target: "l1", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-l1-l2", source: "l1", target: "l2", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-l2-l3", source: "l2", target: "l3", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-l3-l4", source: "l3", target: "l4", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-l4-l5", source: "l4", target: "l5", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-l5-scorer", source: "l5", target: "scorer", tone: "neutral", sourceHandle: "out-bottom", targetHandle: "in-top", label: "all evidence" },
  { id: "e-scorer-resolver", source: "scorer", target: "resolver", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-resolver-gate", source: "resolver", target: "gate", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
  { id: "e-gate-auto", source: "gate", target: "auto", tone: "auto", sourceHandle: "out", targetHandle: "in" },
  { id: "e-gate-ai", source: "gate", target: "ai", tone: "assisted", sourceHandle: "out-bottom", targetHandle: "in" },
  { id: "e-gate-user", source: "gate", target: "user", tone: "review", sourceHandle: "out-bottom", targetHandle: "in" },
  { id: "e-ai-scorer", source: "ai", target: "scorer", tone: "assisted", sourceHandle: "out-bottom", targetHandle: "in", dashed: true, label: "new evidence returns to the scorer" },
  { id: "e-auto-remember", source: "auto", target: "remember", tone: "auto", sourceHandle: "out", targetHandle: "in" },
  { id: "e-user-remember", source: "user", target: "remember", tone: "review", sourceHandle: "out", targetHandle: "in" },
  { id: "e-remember-output", source: "remember", target: "output", tone: "neutral", sourceHandle: "out", targetHandle: "in" },
];

const EDGE_BY_PAIR = new Map(EDGE_SPECS.map((e) => [`${e.source}>${e.target}`, e.id]));

const CHAIN: NodeId[] = ["input", "l0", "l1", "l2", "l3", "l4", "l5", "scorer", "resolver", "gate"];
const CHAIN_EDGES = ["e-input-l0", "e-l0-l1", "e-l1-l2", "e-l2-l3", "e-l3-l4", "e-l4-l5", "e-l5-scorer", "e-scorer-resolver", "e-resolver-gate"];

export interface Highlight {
  nodes: Set<NodeId>;
  edges: Set<string>;
  lit: Set<NodeId>;
}

/** Nodes and edges that form the story path leading to (and through) the selected node. */
export function journeyFor(id: NodeId | null): Highlight {
  const nodes = new Set<NodeId>();
  const edges = new Set<string>();
  const lit = new Set<NodeId>();
  if (!id) return { nodes, edges, lit };

  const i = CHAIN.indexOf(id);
  if (i >= 0) {
    CHAIN.slice(0, i + 1).forEach((n) => nodes.add(n));
    CHAIN_EDGES.slice(0, i).forEach((e) => edges.add(e));
    if (id === "gate") {
      (["auto", "ai", "user"] as const).forEach((o) => {
        lit.add(o);
        edges.add(`e-gate-${o}`);
      });
    }
    return { nodes, edges, lit };
  }

  CHAIN.forEach((n) => nodes.add(n));
  CHAIN_EDGES.forEach((e) => edges.add(e));

  if (id === "auto" || id === "ai" || id === "user") {
    nodes.add(id);
    edges.add(`e-gate-${id}`);
    if (id === "ai") edges.add("e-ai-scorer");
    return { nodes, edges, lit };
  }

  (["auto", "user"] as const).forEach((o) => {
    nodes.add(o);
    edges.add(`e-gate-${o}`);
    edges.add(`e-${o}-remember`);
  });
  nodes.add("ai");
  edges.add("e-gate-ai");
  edges.add("e-ai-scorer");
  nodes.add("remember");
  if (id === "output") {
    nodes.add("output");
    edges.add("e-remember-output");
  }
  return { nodes, edges, lit };
}

/** Highlight for a scenario: the nodes on its path and the edges between consecutive ones. */
export function scenarioHighlight(path: NodeId[]): Highlight {
  const nodes = new Set<NodeId>(path);
  const edges = new Set<string>();
  for (let i = 1; i < path.length; i++) {
    const direct = EDGE_BY_PAIR.get(`${path[i - 1]}>${path[i]}`);
    if (direct) {
      edges.add(direct);
      continue;
    }
    // Skipped layers: light the chain edges in between so the path still reads as connected.
    const a = CHAIN.indexOf(path[i - 1]);
    const b = CHAIN.indexOf(path[i]);
    if (a >= 0 && b > a) CHAIN_EDGES.slice(a, b).forEach((e) => edges.add(e));
  }
  return { nodes, edges, lit: new Set() };
}

const TONE_COLOR: Record<Tone, string> = {
  auto: "#0e8f82",
  assisted: "#b9740a",
  review: "#4f55e0",
  neutral: "#8b93a3",
};

export const EDGE_IDLE = "#c9ced8";
export const EDGE_MUTED = "#e8eaef";

export function toneColor(tone: Tone) {
  return TONE_COLOR[tone];
}

export function journeyEdges(active: Set<string>, dimming: boolean): JourneyEdgeType[] {
  return EDGE_SPECS.map((s) => {
    const state: JourneyEdgeData["state"] = !dimming ? "idle" : active.has(s.id) ? "active" : "muted";
    return {
      id: s.id,
      type: "journey",
      source: s.source,
      target: s.target,
      sourceHandle: s.sourceHandle,
      targetHandle: s.targetHandle,
      data: { tone: s.tone, state, dashed: s.dashed, label: s.label },
      focusable: false,
      selectable: false,
    };
  });
}

export function neighbourhood(id: NodeId): NodeId[] {
  if (id === "scorer") return ["scorer", "resolver", "gate"];
  if (id === "l5") return ["l4", "l5"];
  const i = CHAIN.indexOf(id);
  if (i >= 0) {
    const out: NodeId[] = [id];
    if (i > 0) out.push(CHAIN[i - 1]);
    if (i < CHAIN.length - 1) out.push(CHAIN[i + 1]);
    if (id === "gate") out.push("auto", "ai", "user");
    return out;
  }
  if (id === "auto" || id === "ai" || id === "user") return ["gate", "auto", "ai", "user", "remember"];
  return ["auto", "user", "remember", "output"];
}
