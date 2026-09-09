"use client";

import { ReactFlowProvider, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SEQUENCE, type NodeId } from "@/lib/content";
import { SCENARIOS } from "@/lib/scenarios";
import { SiteHeader } from "./site-header";
import { CanvasHeading } from "./canvas-heading";
import { FlowCanvas } from "./canvas/flow-canvas";
import { DetailPanel } from "./detail-panel";

function ExplainerInner() {
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const { fitView } = useReactFlow();

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? null;
  const index = selected ? SEQUENCE.indexOf(selected) : -1;
  const panelOpen = selected !== null || scenario !== null;

  const select = useCallback((id: NodeId | null) => {
    setScenarioId(null);
    setSelected(id);
  }, []);

  const pickScenario = useCallback((id: string | null) => {
    setSelected(null);
    setScenarioId(id);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setScenarioId(null);
    setSelected((cur) => {
      const i = cur ? SEQUENCE.indexOf(cur) : -1;
      if (i < 0) return dir === 1 ? SEQUENCE[0] : SEQUENCE[SEQUENCE.length - 1];
      return SEQUENCE[Math.min(SEQUENCE.length - 1, Math.max(0, i + dir))];
    });
  }, []);

  const reset = useCallback(() => {
    setSelected(null);
    setScenarioId(null);
    window.setTimeout(() => fitView({ padding: 0.06, duration: 500 }), 40);
  }, [fitView]);

  const startWalkthrough = useCallback(() => {
    setSelected(null);
    setScenarioId(null);
    fitView({ padding: 0.06, duration: 450 });
    window.setTimeout(() => setSelected("l0"), 520);
  }, [fitView]);

  // Full screen: the browser API when available (Esc exits natively), otherwise a fixed overlay.
  const enterFullscreen = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    let native = false;
    try {
      const p = el.requestFullscreen?.();
      if (p && typeof p.then === "function") {
        native = true;
        p.catch(() => setFullscreen(true));
      }
    } catch {
      native = false;
    }
    if (!native) setFullscreen(true);
    // Some embedded browsers neither resolve nor reject; fall back to the overlay if nothing happened.
    window.setTimeout(() => {
      if (!document.fullscreenElement) setFullscreen(true);
    }, 400);
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
    setFullscreen(false);
  }, []);

  useEffect(() => {
    const onChange = () => {
      setFullscreen(document.fullscreenElement === stageRef.current);
      window.setTimeout(() => fitView({ padding: 0.06, duration: 400 }), 80);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [fitView]);

  // Refit when the fallback overlay toggles (the native API refits via fullscreenchange). Skip the initial mount.
  const wasFullscreen = useRef(false);
  useEffect(() => {
    if (wasFullscreen.current !== fullscreen && !document.fullscreenElement) {
      window.setTimeout(() => fitView({ padding: 0.06, duration: 400 }), 80);
    }
    wasFullscreen.current = fullscreen;
  }, [fullscreen, fitView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Escape") {
        if (document.fullscreenElement) return; // the browser leaves full screen itself
        if (fullscreen) {
          setFullscreen(false);
          return;
        }
        setSelected(null);
        setScenarioId(null);
      } else if (e.key === "r" || e.key === "R") {
        reset();
      } else if (e.key === "f" || e.key === "F") {
        if (fullscreen || document.fullscreenElement) exitFullscreen();
        else enterFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, reset, fullscreen, enterFullscreen, exitFullscreen]);

  return (
    <div className="flex h-dvh min-h-[640px] flex-col">
      <SiteHeader onStart={startWalkthrough} onReset={reset} />
      <div
        ref={stageRef}
        className={`mx-auto flex w-full min-h-0 flex-1 flex-col bg-page ${fullscreen ? "fixed inset-0 z-50 max-w-none px-6 pb-5 pt-4" : "max-w-[1880px] px-5 pb-4 pt-3 md:px-6"}`}
      >
        <CanvasHeading scenarioId={scenarioId} onScenario={pickScenario} fullscreen={fullscreen} onFullscreen={fullscreen ? exitFullscreen : enterFullscreen} />
        <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-canvas">
          <div className="relative min-w-0 flex-1">
            <FlowCanvas selected={selected} scenario={scenario} onSelect={select} panelOpen={panelOpen} />
          </div>
          <DetailPanel
            selected={selected}
            scenario={scenario}
            index={index}
            last={SEQUENCE.length - 1}
            onClose={() => {
              setSelected(null);
              setScenarioId(null);
            }}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        </div>
      </div>
    </div>
  );
}

export function Explainer() {
  return (
    <ReactFlowProvider>
      <ExplainerInner />
    </ReactFlowProvider>
  );
}
