"use client";

import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import type { RegionNodeType } from "@/lib/graph";

function RegionNodeInner({ data }: NodeProps<RegionNodeType>) {
  return (
    <div className="pointer-events-none rounded-xl bg-strong/45" style={{ width: data.width, height: data.height }}>
      {data.label && <span className="absolute left-4 top-2 text-[12px] font-medium text-ink-3">{data.label}</span>}
    </div>
  );
}

export const RegionNode = memo(RegionNodeInner);
