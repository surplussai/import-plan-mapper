"use client";

import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import { memo } from "react";
import { EDGE_IDLE, EDGE_MUTED, toneColor, type JourneyEdgeType } from "@/lib/graph";

function JourneyEdgeInner({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<JourneyEdgeType>) {
  const [path, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 8 });
  const state = data?.state ?? "idle";
  const tone = data?.tone ?? "neutral";
  const dashed = data?.dashed ?? false;

  const color = state === "active" ? toneColor(tone) : state === "muted" ? EDGE_MUTED : EDGE_IDLE;
  const width = state === "active" ? 2 : 1.5;

  return (
    <>
      {state === "active" && !dashed && <path d={path} fill="none" stroke={color} strokeOpacity={0.12} strokeWidth={8} strokeLinecap="round" />}
      <BaseEdge
        id={id}
        path={path}
        className={state === "active" && !dashed ? "edge-active-dash" : undefined}
        style={{ stroke: color, strokeWidth: width, strokeDasharray: dashed ? "5 5" : undefined }}
      />
      {data?.label && state !== "muted" && (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-none absolute rounded-md border border-line bg-elevated px-2 py-0.5 text-[10.5px] text-ink-3"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`, opacity: state === "active" ? 1 : 0.85 }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export const JourneyEdge = memo(JourneyEdgeInner);
