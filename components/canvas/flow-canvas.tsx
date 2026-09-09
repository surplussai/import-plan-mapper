"use client";

import { Background, BackgroundVariant, ReactFlow, useReactFlow, type NodeMouseHandler } from "@xyflow/react";
import { Maximize2, Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import type { NodeId } from "@/lib/content";
import type { Scenario } from "@/lib/scenarios";
import { journeyEdges, journeyFor, layerNodes, neighbourhood, regionNodes, scenarioHighlight, type FlowNode, type JourneyEdgeType } from "@/lib/graph";
import { LayerNode } from "./layer-node";
import { RegionNode } from "./region-node";
import { JourneyEdge } from "./journey-edge";

const nodeTypes = { layer: LayerNode, region: RegionNode };
const edgeTypes = { journey: JourneyEdge };

export function FlowCanvas({
  selected,
  scenario,
  onSelect,
  panelOpen,
}: {
  selected: NodeId | null;
  scenario: Scenario | null;
  onSelect: (id: NodeId | null) => void;
  panelOpen: boolean;
}) {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const regions = useMemo(() => regionNodes(), []);

  const highlight = useMemo(() => (scenario ? scenarioHighlight(scenario.path) : journeyFor(selected)), [scenario, selected]);
  const dimming = selected !== null || scenario !== null;

  const nodes: FlowNode[] = useMemo(
    () => [...regions, ...layerNodes(selected, highlight.nodes, highlight.lit, dimming)],
    [regions, selected, highlight, dimming],
  );
  const edges: JourneyEdgeType[] = useMemo(() => journeyEdges(highlight.edges, dimming), [highlight, dimming]);

  const onNodeClick: NodeMouseHandler<FlowNode> = useCallback(
    (_, node) => {
      if (node.type === "layer") onSelect(node.id as NodeId);
    },
    [onSelect],
  );

  // Re-frame after the panel has taken its space. The panel resizes synchronously, so one
  // frame is enough; a second pass covers late layout without a visible jump.
  useEffect(() => {
    const frame = () => {
      if (selected) {
        fitView({ nodes: neighbourhood(selected).map((id) => ({ id })), padding: 0.3, duration: 500, maxZoom: 1, minZoom: 0.45 });
      } else if (scenario) {
        fitView({ nodes: scenario.path.map((id) => ({ id })), padding: 0.08, duration: 500 });
      }
    };
    if (!selected && !scenario) return;
    const t1 = window.setTimeout(frame, 40);
    const t2 = window.setTimeout(frame, 420);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [selected, scenario, panelOpen, fitView]);

  return (
    <div className="relative h-full w-full">
      <ReactFlow<FlowNode, JourneyEdgeType>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={() => onSelect(null)}
        fitView
        fitViewOptions={{ padding: 0.06 }}
        minZoom={0.35}
        maxZoom={1.6}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={26} size={1.2} color="#d9dde5" />
      </ReactFlow>

      <div className="absolute right-3 top-3 flex flex-col gap-1.5">
        {[
          { label: "Fit view", icon: Maximize2, onClick: () => fitView({ padding: 0.06, duration: 400 }) },
          { label: "Zoom in", icon: Plus, onClick: () => zoomIn({ duration: 250 }) },
          { label: "Zoom out", icon: Minus, onClick: () => zoomOut({ duration: 250 }) },
        ].map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-elevated text-ink-2 shadow-[0_1px_2px_rgba(20,23,31,.06)] hover:text-ink"
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  );
}
